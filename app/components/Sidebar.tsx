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

function XCLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="22" cy="20" rx="22" ry="20" fill="#CC0000" />
      <polygon points="14,38 22,30 30,38" fill="#CC0000" />
      <text x="22" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">XC</text>
    </svg>
  )
}

export default function Sidebar({ nombre, role, items }: Props) {
  return (
    <aside className="w-64 min-h-screen bg-black flex flex-col">

      {/* Brand header */}
      <div className="p-6 pb-5">
        <div className="flex items-center gap-3 mb-5">
          <XCLogo />
          <div>
            <p className="font-headline text-white text-base uppercase leading-tight tracking-wide">
              Xperience<br />Champions
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-500 italic leading-snug">
          My customer, my responsibility
        </p>
      </div>

      <div className="h-px bg-red-600 mx-6" />

      {/* Nav */}
      <nav className="flex-1 p-4 pt-5 space-y-0.5">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-md transition-colors group"
          >
            <span className="w-1 h-4 rounded-full bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold text-xs tracking-tight">Media</span>
          <span className="text-red-600 font-bold text-xs">Markt</span>
          <span className="text-gray-600 text-xs mx-1">|</span>
          <span className="text-gray-400 font-bold text-xs tracking-tight">SATURN</span>
        </div>
      </div>

    </aside>
  )
}
