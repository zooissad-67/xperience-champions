'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
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

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="3" width="20" height="2" rx="1" fill="currentColor" />
      <rect y="9" width="20" height="2" rx="1" fill="currentColor" />
      <rect y="15" width="20" height="2" rx="1" fill="currentColor" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function Sidebar({ nombre, role, items }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      {/* Barra superior móvil */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-black flex items-center justify-between px-4">
        <button
          onClick={() => setOpen(true)}
          className="text-white p-1"
          aria-label="Abrir menú"
        >
          <HamburgerIcon />
        </button>
        <Image
          src="/logo-xc.svg"
          alt="Xperience Champion"
          width={32}
          height={32}
          className="h-8 w-auto"
        />
        <div className="w-8" />
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 min-h-screen bg-black flex flex-col
        transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

        {/* Botón cerrar (solo móvil) */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          aria-label="Cerrar menú"
        >
          <CloseIcon />
        </button>

        {/* Logo */}
        <div className="bg-white p-6 w-fit">
          <Image
            src="/logo-xc.svg"
            alt="Xperience Champion"
            width={220}
            height={222}
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

        {/* Usuario + logout */}
        <div className="p-5 border-t border-white/10">
          <div className="mb-3">
            <p className="text-white text-sm font-semibold truncate">{nombre}</p>
            <p className="text-gray-500 text-xs mt-0.5">{roleLabel[role] ?? role}</p>
          </div>
          <LogoutButton />
        </div>

        {/* Logo MediaMarkt */}
        <div className="px-5 pb-5">
          <Image
            src="/logo-mediamarkt-saturn.svg"
            alt="MediaMarkt Saturn"
            width={200}
            height={40}
            className="w-full h-auto opacity-70"
          />
        </div>

      </aside>
    </>
  )
}
