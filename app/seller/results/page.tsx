import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function SellerResultsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: missions }, { data: attempts }] = await Promise.all([
    supabase
      .from('missions')
      .select('id, nombre, orden')
      .eq('activa', true)
      .order('orden'),
    supabase
      .from('attempts')
      .select('question_id, correcto')
      .eq('user_id', user.id),
  ])

  const missionIds = missions?.map((m) => m.id) ?? []
  const { data: questions } = missionIds.length > 0
    ? await supabase.from('questions').select('id, mission_id').in('mission_id', missionIds)
    : { data: [] as { id: string; mission_id: string }[] }

  const attemptMap = new Map((attempts ?? []).map((a) => [a.question_id, a.correcto]))

  const missionResults = (missions ?? []).map((m) => {
    const qs = (questions ?? []).filter((q) => q.mission_id === m.id)
    const total = qs.length
    const answered = qs.filter((q) => attemptMap.has(q.id)).length
    const correct = qs.filter((q) => attemptMap.get(q.id) === true).length
    const completed = total > 0 && answered === total
    const score = answered > 0 ? Math.round((correct / answered) * 100) : null
    return { ...m, total, answered, correct, completed, score }
  })

  const totalAnswered = attempts?.length ?? 0
  const totalCorrect = attempts?.filter((a) => a.correcto).length ?? 0
  const globalScore = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : null
  const completedMissions = missionResults.filter((m) => m.completed).length

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl uppercase text-gray-900">Mis resultados</h1>
        <p className="text-gray-500 text-sm mt-1">Xperience Champions FY26/27</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Misiones completadas</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {completedMissions}<span className="text-lg text-gray-400">/{missionResults.length}</span>
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Respuestas correctas</p>
          <p className="text-3xl font-bold text-green-600 mt-1">
            {totalCorrect}<span className="text-lg text-gray-400">/{totalAnswered}</span>
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Precisión global</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {globalScore !== null ? `${globalScore}%` : '—'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Resultados por misión</h2>
        {missionResults.length > 0 ? (
          <div className="space-y-4">
            {missionResults.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium text-gray-900">{m.nombre}</p>
                  {m.answered > 0 && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-red-500 h-1.5 rounded-full"
                          style={{ width: `${Math.round((m.answered / m.total) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{m.answered}/{m.total}</span>
                    </div>
                  )}
                </div>
                <div className="text-right shrink-0">
                  {m.completed ? (
                    <>
                      <p className="text-lg font-bold text-gray-900">{m.score}%</p>
                      <p className="text-xs text-green-600 font-medium">Completada</p>
                    </>
                  ) : m.answered > 0 ? (
                    <Link
                      href={`/seller/missions/${m.id}`}
                      className="text-xs font-medium text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full"
                    >
                      Continuar
                    </Link>
                  ) : (
                    <Link
                      href={`/seller/missions/${m.id}`}
                      className="text-xs font-medium text-red-600 bg-red-50 px-2.5 py-1 rounded-full"
                    >
                      Empezar
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No hay misiones activas en este momento.</p>
        )}
      </div>
    </div>
  )
}
