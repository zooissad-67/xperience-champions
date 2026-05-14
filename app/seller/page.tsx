import { createClient } from '@/lib/supabase-server'

export default async function SellerPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, store_id')
    .eq('id', user!.id)
    .single()

  const [
    { data: store },
    { data: missions },
    { data: attempts },
  ] = await Promise.all([
    supabase.from('stores').select('nombre').eq('id', userData!.store_id).single(),
    supabase.from('missions').select('id, nombre, descripcion, orden').eq('activa', true).order('orden'),
    supabase.from('attempts').select('question_id, correcto').eq('user_id', user!.id),
  ])

  const totalAnswered = attempts?.length ?? 0
  const totalCorrect = attempts?.filter((a) => a.correcto).length ?? 0
  const score = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bienvenido, {userData?.nombre}</h1>
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
        {missions && missions.length > 0 ? (
          <div className="space-y-3">
            {missions.map((m) => (
              <div key={m.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-red-50 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-900">{m.nombre}</p>
                  {m.descripcion && (
                    <p className="text-xs text-gray-500 mt-0.5">{m.descripcion}</p>
                  )}
                </div>
                <span className="text-xs font-medium text-red-600 bg-red-100 px-2.5 py-1 rounded-full">
                  Disponible
                </span>
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
