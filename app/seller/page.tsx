import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export default async function SellerPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, store_id')
    .eq('id', user!.id)
    .single()

  const [{ data: store }, { data: missions }, { data: attempts }] = await Promise.all([
    supabase.from('stores').select('nombre').eq('id', userData!.store_id).single(),
    supabase.from('missions').select('id, nombre, descripcion, orden').eq('activa', true).order('orden'),
    supabase.from('attempts').select('question_id, correcto').eq('user_id', user!.id),
  ])

  const missionIds = missions?.map((m) => m.id) ?? []
  const { data: missionQuestions } = missionIds.length > 0
    ? await supabase.from('questions').select('id, mission_id').in('mission_id', missionIds)
    : { data: [] as { id: string; mission_id: string }[] }

  const attemptedIds = new Set((attempts ?? []).map((a) => a.question_id))
  const totalAnswered = attempts?.length ?? 0
  const totalCorrect = attempts?.filter((a) => a.correcto).length ?? 0
  const score = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  const missionsWithProgress = (missions ?? []).map((m) => {
    const qs = (missionQuestions ?? []).filter((q) => q.mission_id === m.id)
    const answered = qs.filter((q) => attemptedIds.has(q.id)).length
    const total = qs.length
    const completed = total > 0 && answered === total
    const inProgress = answered > 0 && !completed
    return { ...m, answered, total, completed, inProgress }
  })

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl uppercase text-gray-900">Bienvenido, {userData?.nombre}</h1>
        <p className="text-gray-500 text-sm mt-1">{store?.nombre} · Xperience Champions FY26/27</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Respuestas</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalAnswered}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Correctas</p>
          <p className="text-3xl font-bold text-green-600 mt-1">{totalCorrect}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Precisión</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{score}%</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Misiones disponibles</h2>
        {missionsWithProgress.length > 0 ? (
          <div className="space-y-3">
            {missionsWithProgress.map((m) => (
              <Link
                key={m.id}
                href={`/seller/missions/${m.id}`}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="text-sm font-medium text-gray-900">{m.nombre}</p>
                  {m.descripcion && (
                    <p className="text-xs text-gray-500 mt-0.5">{m.descripcion}</p>
                  )}
                  {m.total > 0 && m.inProgress && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1">
                        <div
                          className="bg-red-400 h-1 rounded-full"
                          style={{ width: `${Math.round((m.answered / m.total) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 shrink-0">{m.answered}/{m.total}</span>
                    </div>
                  )}
                </div>
                {m.completed ? (
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full shrink-0">
                    Completada
                  </span>
                ) : m.inProgress ? (
                  <span className="text-xs font-medium text-orange-700 bg-orange-100 px-2.5 py-1 rounded-full shrink-0">
                    En progreso
                  </span>
                ) : (
                  <span className="text-xs font-medium text-red-600 bg-red-100 px-2.5 py-1 rounded-full shrink-0">
                    Disponible
                  </span>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No hay misiones activas en este momento.</p>
        )}
      </div>
    </div>
  )
}
