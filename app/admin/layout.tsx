import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import Sidebar from '@/app/components/Sidebar'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Tiendas', href: '/admin/stores' },
  { label: 'Usuarios', href: '/admin/users' },
  { label: 'Misiones', href: '/admin/missions' },
  { label: 'Rankings', href: '/admin/rankings' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: userData } = await supabase
    .from('users')
    .select('nombre, role')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'admin') redirect('/dashboard')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar nombre={userData.nombre} role="admin" items={navItems} />
      <main className="flex-1 p-4 pt-18 lg:p-8 lg:pt-8 min-w-0">{children}</main>
    </div>
  )
}
