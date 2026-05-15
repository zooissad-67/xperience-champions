import { createClient } from '@/lib/supabase-server'
import RankingTable from '@/app/components/RankingTable'

export default async function AdminRankingsPage() {
  const supabase = await createClient()

  const [{ data: sellers }, { data: stores }, { data: attempts }] = await Promise.all([
    supabase.from('users').select('id, nombre, store_id').eq('role', 'seller'),
    supabase.from('stores').select('id, nombre, ciudad'),
    supabase.from('attempts').select('user_id, correcto'),
  ])

  const attemptsByUser = new Map<string, { correctas: number; total: number }>()
  for (const a of attempts ?? []) {
    const cur = attemptsByUser.get(a.user_id) ?? { correctas: 0, total: 0 }
    attemptsByUser.set(a.user_id, {
      correctas: cur.correctas + (a.correcto ? 1 : 0),
      total: cur.total + 1,
    })
  }

  const storeMap = new Map(stores?.map((s) => [s.id, s]) ?? [])

  const sellerRows = (sellers ?? [])
    .map((s) => {
      const stats = attemptsByUser.get(s.id) ?? { correctas: 0, total: 0 }
      return { nombre: s.nombre, sub: storeMap.get(s.store_id)?.nombre, ...stats }
    })
    .sort((a, b) => b.correctas - a.correctas || b.total - a.total)

  const attemptsByStore = new Map<string, { correctas: number; total: number }>()
  for (const seller of sellers ?? []) {
    const stats = attemptsByUser.get(seller.id) ?? { correctas: 0, total: 0 }
    const cur = attemptsByStore.get(seller.store_id) ?? { correctas: 0, total: 0 }
    attemptsByStore.set(seller.store_id, {
      correctas: cur.correctas + stats.correctas,
      total: cur.total + stats.total,
    })
  }

  const storeRows = (stores ?? [])
    .map((s) => {
      const stats = attemptsByStore.get(s.id) ?? { correctas: 0, total: 0 }
      return { nombre: s.nombre, sub: s.ciudad, ...stats }
    })
    .sort((a, b) => b.correctas - a.correctas || b.total - a.total)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-headline text-3xl uppercase text-gray-900">Rankings</h1>
        <p className="text-gray-500 text-sm mt-1">Clasificación global del programa</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Ranking de vendedores</h2>
        <RankingTable rows={sellerRows} emptyMessage="No hay vendedores con actividad todavía." />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Ranking de tiendas</h2>
        <RankingTable rows={storeRows} emptyMessage="No hay tiendas con actividad todavía." />
      </div>
    </div>
  )
}
