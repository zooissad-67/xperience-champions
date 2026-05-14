'use server'

import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const storeId = formData.get('store_id') as string

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: 'Email o contraseña incorrectos' }
  }

  const { data: userData } = await supabase
    .from('users')
    .select('store_id, role')
    .eq('email', email)
    .single()

  if (!userData) {
    await supabase.auth.signOut()
    return { error: 'Usuario no encontrado en el sistema' }
  }

  if (userData.store_id !== storeId) {
    await supabase.auth.signOut()
    return { error: 'ID de tienda incorrecto' }
  }

  redirect('/dashboard')
}

export async function register(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const nombre = formData.get('nombre') as string
  const storeId = formData.get('store_id') as string

  const supabase = await createClient()

  const { data: store } = await supabase
    .from('stores')
    .select('id')
    .eq('id', storeId)
    .single()

  if (!store) {
    return { error: 'ID de tienda no válido. Pídelo a tu responsable.' }
  }

  const { data: authData, error: signUpError } = await supabase.auth.signUp({ email, password })

  if (signUpError || !authData.user) {
    return { error: signUpError?.message ?? 'Error al crear la cuenta' }
  }

  const { error: insertError } = await supabase.from('users').insert({
    id: authData.user.id,
    email,
    nombre,
    role: 'seller',
    store_id: storeId,
  })

  if (insertError) {
    return { error: 'Error al guardar el perfil. Contacta con soporte.' }
  }

  redirect('/dashboard')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
