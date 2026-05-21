import { createClient } from '@/lib/supabase-server'
import ToggleMission from './ToggleMission'

export default async function AdminMissionsPage() {
  const supabase = await createClient()

  const { data: missions } = await supabase
    .from('missions')
    .select('id, nombre, descripcion, orden, activa')
    .order('orden')

  const { data: questionCounts } = await supabase
    .from('questions')
    .select('mission_id')

  const countByMission = (questionCounts ?? []).reduce<Record<string, number>>((acc, q) => {
    acc[q.mission_id] = (acc[q.mission_id] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl uppercase text-gray-900">Misiones</h1>
        <p className="text-gray-500 text-sm mt-1">Activa o desactiva misiones para los vendedores</p>
      </div>

      <div className="space-y-3">
        {missions && missions.length > 0 ? missions.map((m) => (
          <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm font-semibold flex items-center justify-center flex-shrink-0">
                {m.orden}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{m.nombre}</p>
                {m.descripcion && (
                  <p className="text-sm text-gray-500 mt-0.5">{m.descripcion}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  {countByMission[m.id] ?? 0} preguntas
                </p>
              </div>
            </div>
            <ToggleMission id={m.id} activa={m.activa} />
          </div>
        )) : (
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-8 text-center text-gray-400">
            No hay misiones configuradas.
          </div>
        )}
      </div>
    </div>
  )
}
