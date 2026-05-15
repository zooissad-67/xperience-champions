import Link from 'next/link'
import Image from 'next/image'
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
    <aside className="w-64 min-h-screen bg-black flex flex-col">

      {/* Logo en contenedor blanco */}
      <div className="bg-white p-5">
        <Image
          src="/logo-xc.svg"
          alt="Xperience Champion"
          width={200}
          height={202}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 pt-5 space-y-0.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors group"
          >
            <span className="w-1 h-4 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User + logout */}
      <div className="p-5 border-t border-white/10">
        <div className="mb-3">
          <p className="text-white text-sm font-semibold truncate">{nombre}</p>
          <p className="text-gray-500 text-xs mt-0.5">{roleLabel[role] ?? role}</p>
        </div>
        <LogoutButton />
      </div>

      {/* MediaMarkt Saturn logo */}
      <div className="px-5 pb-5">
        <Image
          src="/logo-mediamarkt-saturn.svg"
          alt="MediaMarkt Saturn"
          width={160}
          height={32}
          className="w-full h-auto opacity-70"
        />
      </div>

    </aside>
  )
}
