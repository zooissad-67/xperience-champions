import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'

const navItems = [
  { label: 'Mis misiones', href: '/seller' },
  { label: 'Mis resultados', href: '/seller/results' },
  { label: 'Ranking de tienda', href: '/seller/rankings' },
]

export default async function SellerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, role')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'seller') redirect('/dashboard')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar nombre={userData.nombre} role="seller" items={navItems} />
      <main className="flex-1 p-4 pt-18 lg:p-8 lg:pt-8 min-w-0">{children}</main>
    </div>
  )
}
