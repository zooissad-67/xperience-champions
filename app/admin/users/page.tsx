import { createClient } from '@/lib/supabase-server'

const roleLabel: Record<string, string> = {
  admin: 'Admin',
  manager: 'Responsable',
  seller: 'Vendedor',
}

const roleBadge: Record<string, string> = {
  admin: 'bg-purple-100 text-purple-700',
  manager: 'bg-blue-100 text-blue-700',
  seller: 'bg-gray-100 text-gray-600',
}

export default async function AdminUsersPage() {
  const supabase = await createClient()

  const { data: users } = await supabase
    .from('users')
    .select('id, nombre, email, role, store_id, stores(nombre)')
    .order('role')
    .order('nombre')

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl uppercase text-gray-900">Usuarios</h1>
        <p className="text-gray-500 text-sm mt-1">{users?.length ?? 0} usuarios registrados</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Nombre</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Email</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Tienda</th>
              <th className="text-left px-6 py-3 text-gray-500 font-medium">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users && users.length > 0 ? users.map((u) => (
              <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{u.nombre}</td>
                <td className="px-6 py-4 text-gray-600">{u.email}</td>
                <td className="px-6 py-4 text-gray-600">
                  {(u.stores as unknown as { nombre: string } | null)?.nombre ?? '—'}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${roleBadge[u.role] ?? 'bg-gray-100 text-gray-600'}`}>
                    {roleLabel[u.role] ?? u.role}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
