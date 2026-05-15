'use client'

import { useState } from 'react'
import { register } from '@/app/actions/auth'
import Link from 'next/link'

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const result = await register(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-5/12 bg-black flex-col justify-between p-10">
        <div>
          <svg width="64" height="64" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="22" cy="20" rx="22" ry="20" fill="#CC0000" />
            <polygon points="14,38 22,30 30,38" fill="#CC0000" />
            <text x="22" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">XC</text>
          </svg>
        </div>

        <div>
          <div className="w-10 h-1 bg-red-600 mb-6" />
          <h1 className="font-headline text-white text-5xl uppercase leading-none mb-4">
            Únete al<br />programa
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mt-4">
            Regístrate para acceder a las misiones de formación Xperience Champions y demostrar tu nivel.
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold text-sm tracking-tight">Media</span>
          <span className="text-red-600 font-bold text-sm">Markt</span>
          <span className="text-gray-600 text-sm mx-1">|</span>
          <span className="text-gray-400 font-bold text-sm tracking-tight">SATURN</span>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">

          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">XC</span>
            </div>
            <span className="font-headline text-xl uppercase text-gray-900">Xperience Champions</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Crear cuenta</h2>
          <p className="text-gray-400 text-sm mb-8">Solo para vendedores MediaMarkt Saturn</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Nombre completo
              </label>
              <input
                name="nombre"
                type="text"
                required
                placeholder="Tu nombre"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-gray-50 placeholder-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-gray-50 placeholder-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                ID de tienda
              </label>
              <input
                name="store_id"
                type="text"
                required
                placeholder="Pregúntalo a tu responsable"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-gray-50 placeholder-gray-300"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent bg-gray-50 placeholder-gray-300"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wide mt-2"
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-red-600 font-semibold hover:underline">
              Iniciar sesión
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
