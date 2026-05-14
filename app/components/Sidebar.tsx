import Link from 'next/link'
import LogoutButton from './LogoutButton'

type NavItem = { label: string; href: string }

type Props = {
  nombre: string
  role: string
  items: NavItem[]
}

const roleLabel: Record<string, string> = {
  admin: 'Administrador',
  manager: 'Responsable de tienda',
  seller: 'Vendedor',
}

export default function Sidebar({ nombre, role, items }: Props) {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">XC</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm leading-tight">{nombre}</p>
            <p className="text-gray-400 text-xs">{roleLabel[role] ?? role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-gray-800">
        <LogoutButton />
      </div>
    </aside>
  )
}
