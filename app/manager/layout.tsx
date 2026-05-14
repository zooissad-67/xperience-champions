import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'

const navItems = [
  { label: 'Dashboard', href: '/manager' },
  { label: 'Vendedores', href: '/manager/sellers' },
  { label: 'Misiones', href: '/manager/missions' },
  { label: 'Rankings', href: '/manager/rankings' },
]

export default async function ManagerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, role')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'manager') redirect('/dashboard')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar nombre={userData.nombre} role="manager" items={navItems} />
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
