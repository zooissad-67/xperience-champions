'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { useState } from 'react'

export default function ToggleMission({ id, activa }: { id: string; activa: boolean }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function toggle() {
    setLoading(true)
    const supabase = createClient()
    await supabase.from('missions').update({ activa: !activa }).eq('id', id)
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors flex-shrink-0 ${
        activa ? 'bg-red-600' : 'bg-gray-200'
      } ${loading ? 'opacity-50' : ''}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        activa ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  )
}
