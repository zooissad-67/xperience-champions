'use server'

import { createClient } from '@/lib/supabase-server'

export async function createStore(formData: FormData) {
  const nombre = (formData.get('nombre') as string).trim()
  const ciudad = (formData.get('ciudad') as string).trim()

  if (!nombre || !ciudad) {
    return { error: 'Nombre y ciudad son obligatorios.' }
  }

  const supabase = await createClient()

  const { error } = await supabase
    .from('stores')
    .insert({ nombre, ciudad })

  if (error) {
    return { error: 'Error al crear la tienda. Inténtalo de nuevo.' }
  }
}
