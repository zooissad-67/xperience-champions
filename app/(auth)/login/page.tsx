'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const formData = new FormData(e.currentTarget)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">

      {/* Left panel — brand */}
      <div className="hidden lg:flex lg:w-5/12 bg-red-600 flex-col justify-between p-10">
        <div>
          {/* XC logo */}
          <svg width="64" height="64" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="22" cy="20" rx="22" ry="20" fill="white" fillOpacity="0.15" />
            <ellipse cx="22" cy="20" rx="22" ry="20" stroke="white" strokeWidth="2" />
            <polygon points="14,38 22,30 30,38" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="2" strokeLinejoin="round" />
            <text x="22" y="26" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="1">XC</text>
          </svg>
        </div>

        <div>
          <h1 className="font-headline text-white text-5xl uppercase leading-none mb-4">
            Xperience<br />Champion
          </h1>
          <p className="text-white/80 text-lg font-semibold italic mb-2">
            My customer,<br />my responsibility.
          </p>
          <p className="text-white/50 text-sm mt-6 leading-relaxed max-w-xs">
            Programa de formación para vendedores MediaMarkt Saturn FY26/27
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-white font-bold text-sm tracking-tight">Media</span>
          <span className="text-black font-bold text-sm">Markt</span>
          <span className="text-white/40 text-sm mx-1">|</span>
          <span className="text-white/70 font-bold text-sm tracking-tight">SATURN</span>
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

          <h2 className="text-2xl font-bold text-gray-900 mb-1">Iniciar sesión</h2>
          <p className="text-gray-400 text-sm mb-8">Introduce tus datos para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                placeholder="Proporcionado por tu responsable"
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
                placeholder="••••••••"
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
              {loading ? 'Entrando...' : 'Iniciar sesión'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            ¿No tienes cuenta?{' '}
            <Link href="/register" className="text-red-600 font-semibold hover:underline">
              Regístrate
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}
