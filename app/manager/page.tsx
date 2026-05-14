import { createClient } from '@/lib/supabase-server'

export default async function ManagerPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, store_id')
    .eq('id', user!.id)
    .single()

  const [
    { data: store },
    { data: sellers },
    { count: totalAttempts },
  ] = await Promise.all([
    supabase.from('stores').select('nombre, ciudad').eq('id', userData!.store_id).single(),
    supabase.from('users').select('id, nombre').eq('store_id', userData!.store_id).eq('role', 'seller'),
    supabase.from('attempts')
      .select('*', { count: 'exact', head: true })
      .in(
        'user_id',
        // subquery workaround: fetch ids first
        (await supabase.from('users').select('id').eq('store_id', userData!.store_id).eq('role', 'seller'))
          .data?.map((u) => u.id) ?? []
      ),
  ])

  const sellerCount = sellers?.length ?? 0
  const participation = sellerCount > 0 && totalAttempts
    ? Math.round((totalAttempts / sellerCount) * 10) / 10
    : 0

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{store?.nombre ?? 'Mi tienda'}</h1>
        <p className="text-gray-500 text-sm mt-1">{store?.ciudad} · Responsable de tienda</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Vendedores</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{sellerCount}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Respuestas totales</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalAttempts ?? 0}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <p className="text-sm text-gray-500">Media por vendedor</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{participation}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Vendedores de la tienda</h2>
        {sellers && sellers.length > 0 ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 text-gray-500 font-medium">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((s) => (
                <tr key={s.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 text-gray-900">{s.nombre}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400 text-sm">Aún no hay vendedores registrados en esta tienda.</p>
        )}
      </div>
    </div>
  )
}
