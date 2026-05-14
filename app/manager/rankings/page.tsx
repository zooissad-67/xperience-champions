import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import RankingTable from '@/app/components/RankingTable'

export default async function ManagerRankingsPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('store_id')
    .eq('id', user.id)
    .single()

  const [{ data: sellers }, { data: attempts }, { data: store }] = await Promise.all([
    supabase.from('users').select('id, nombre').eq('role', 'seller').eq('store_id', userData!.store_id),
    supabase.from('attempts').select('user_id, correcto'),
    supabase.from('stores').select('nombre').eq('id', userData!.store_id).single(),
  ])

  const attemptsByUser = new Map<string, { correctas: number; total: number }>()
  for (const a of attempts ?? []) {
    const cur = attemptsByUser.get(a.user_id) ?? { correctas: 0, total: 0 }
    attemptsByUser.set(a.user_id, {
      correctas: cur.correctas + (a.correcto ? 1 : 0),
      total: cur.total + 1,
    })
  }

  const rows = (sellers ?? [])
    .map((s) => {
      const stats = attemptsByUser.get(s.id) ?? { correctas: 0, total: 0 }
      return { nombre: s.nombre, ...stats }
    })
    .sort((a, b) => b.correctas - a.correctas || b.total - a.total)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ranking de vendedores</h1>
        <p className="text-gray-500 text-sm mt-1">{store?.nombre}</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <RankingTable rows={rows} emptyMessage="No hay vendedores con actividad todavía." />
      </div>
    </div>
  )
}
