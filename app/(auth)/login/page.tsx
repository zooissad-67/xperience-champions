'use client'

import { useState } from 'react'
import { login } from '@/app/actions/auth'
import Link from 'next/link'
import Image from 'next/image'

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

      {/* Panel izquierdo — marca */}
      <div className="hidden lg:flex lg:w-5/12 bg-red-600 flex-col justify-between p-10">
        <div className="bg-white p-6">
          <Image
            src="/logo-xc.svg"
            alt="Xperience Champion"
            width={220}
            height={222}
            className="w-full h-auto max-w-[220px]"
            priority
          />
        </div>

        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
          Programa de formación para vendedores MediaMarkt Saturn FY26/27
        </p>

        <Image
          src="/logo-mediamarkt-saturn.svg"
          alt="MediaMarkt Saturn"
          width={180}
          height={36}
        />
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex flex-col bg-white">

        {/* Logo móvil — centrado arriba */}
        <div className="lg:hidden flex justify-center pt-10 pb-6 px-8">
          <Image src="/logo-xc.svg" alt="Xperience Champion" width={160} height={162} priority />
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-sm">

            <h2 className="font-headline text-3xl uppercase text-gray-900 mb-1">Iniciar sesión</h2>
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
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
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

        {/* Logo MediaMarkt móvil — anclado abajo */}
        <div className="lg:hidden flex justify-center pb-8 px-8">
          <Image src="/logo-mediamarkt-saturn.svg" alt="MediaMarkt Saturn" width={160} height={32} />
        </div>

      </div>
    </div>
  )
}
