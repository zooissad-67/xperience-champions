import { createClient } from '@/lib/supabase-server'
import NewStoreForm from './NewStoreForm'

export default async function AdminStoresPage() {
  const supabase = await createClient()

  const { data: stores } = await supabase
    .from('stores')
    .select('id, nombre, ciudad')
    .order('ciudad')

  const { data: sellerCounts } = await supabase
    .from('users')
    .select('store_id')
    .eq('role', 'seller')

  const countByStore = (sellerCounts ?? []).reduce<Record<string, number>>((acc, u) => {
    if (u.store_id) acc[u.store_id] = (acc[u.store_id] ?? 0) + 1
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-headline text-3xl uppercase text-gray-900">Tiendas</h1>
          <p className="text-gray-500 text-sm mt-1">{stores?.length ?? 0} tiendas registradas</p>
        </div>
        <NewStoreForm />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Tienda</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Ciudad</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">ID de tienda</th>
              <th className="text-right px-6 py-3 text-gray-500 font-medium">Vendedores</th>
            </tr>
          </thead>
          <tbody>
            {stores && stores.length > 0 ? stores.map((store) => (
              <tr key={store.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{store.nombre}</td>
                <td className="px-6 py-4 text-gray-600">{store.ciudad}</td>
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{store.id}</td>
                <td className="px-6 py-4 text-right text-gray-900 font-semibold">
                  {countByStore[store.id] ?? 0}
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  No hay tiendas registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
