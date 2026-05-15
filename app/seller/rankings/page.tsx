import { createClient } from '@/lib/supabase-server'
import RankingTable from '@/app/components/RankingTable'

export default async function SellerRankingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, store_id')
    .eq('id', user!.id)
    .single()

  const [{ data: storeRanking }, { data: storesRanking }, { data: store }] = await Promise.all([
    supabase.rpc('get_store_seller_ranking'),
    supabase.rpc('get_stores_ranking'),
    supabase.from('stores').select('nombre').eq('id', userData!.store_id).single(),
  ])

  const sellerRows = (storeRanking ?? []).map((r: { user_id: string; nombre: string; correctas: number; total: number }) => ({
    nombre: r.nombre,
    correctas: Number(r.correctas),
    total: Number(r.total),
    highlight: r.user_id === user!.id,
  }))

  const storeRows = (storesRanking ?? []).map((r: { store_id: string; store_nombre: string; ciudad: string; correctas: number; total: number }) => ({
    nombre: r.store_nombre,
    sub: r.ciudad,
    correctas: Number(r.correctas),
    total: Number(r.total),
    highlight: r.store_id === userData?.store_id,
  }))

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="font-headline text-3xl uppercase text-gray-900">Rankings</h1>
        <p className="text-gray-500 text-sm mt-1">{store?.nombre}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Tu tienda</h2>
        <RankingTable rows={sellerRows} emptyMessage="No hay actividad en tu tienda todavía." />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Ranking de tiendas</h2>
        <RankingTable rows={storeRows} emptyMessage="No hay tiendas con actividad todavía." />
      </div>
    </div>
  )
}
