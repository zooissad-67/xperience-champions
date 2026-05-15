import { createClient } from '@/lib/supabase-server'

type StatCardProps = { label: string; value: number | string; sub?: string }

function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

export default async function AdminPage() {
  const supabase = await createClient()

  const [
    { count: totalStores },
    { count: totalUsers },
    { data: missions },
    { count: totalAttempts },
  ] = await Promise.all([
    supabase.from('stores').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'seller'),
    supabase.from('missions').select('id, nombre, orden, activa').order('orden'),
    supabase.from('attempts').select('*', { count: 'exact', head: true }),
  ])

  const activeMissions = missions?.filter((m) => m.activa).length ?? 0

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl uppercase text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Vista global del programa Xperience Champions</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Tiendas" value={totalStores ?? 0} />
        <StatCard label="Vendedores" value={totalUsers ?? 0} />
        <StatCard label="Misiones activas" value={activeMissions} sub={`de ${missions?.length ?? 0} en total`} />
        <StatCard label="Respuestas totales" value={totalAttempts ?? 0} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Estado de misiones</h2>
        {missions && missions.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Misión</th>
                <th className="text-left py-2 text-gray-500 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-gray-900">{m.nombre}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      m.activa
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {m.activa ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-sm">No hay misiones configuradas.</p>
        )}
      </div>
    </div>
  )
}
