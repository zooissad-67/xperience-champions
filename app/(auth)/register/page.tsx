'use client'

import { useState } from 'react'
import { register } from '@/app/actions/auth'
import Link from 'next/link'
import Image from 'next/image'

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

      {/* Panel izquierdo — marca */}
      <div className="hidden lg:flex lg:w-5/12 bg-red-600 flex-col justify-between p-10">
        <div className="bg-white p-6 w-fit">
          <Image
            src="/logo-xc.svg"
            alt="Xperience Champion"
            width={220}
            height={222}
            priority
          />
        </div>

        <div>
          <p className="font-headline text-white text-4xl uppercase leading-tight">
            Únete al<br />programa
          </p>
          <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
            Regístrate para acceder a las misiones de formación y demostrar tu nivel como Xperience Champion.
          </p>
        </div>

        <Image
          src="/logo-mediamarkt-saturn.svg"
          alt="MediaMarkt Saturn"
          width={220}
          height={44}
          className="opacity-80"
        />
      </div>

      {/* Panel derecho — formulario */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-sm">

          {/* Logo móvil */}
          <div className="lg:hidden mb-8">
            <Image src="/logo-xc.svg" alt="Xperience Champion" width={120} height={121} />
          </div>

          <h2 className="font-headline text-3xl uppercase text-gray-900 mb-1">Crear cuenta</h2>
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
              className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-sm uppercase tracking-wide"
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
