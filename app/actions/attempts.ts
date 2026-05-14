'use server'

import { createClient } from '@/lib/supabase-server'

export async function saveAttempt(questionId: string, respuesta: string, correcto: boolean) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  await supabase.from('attempts').upsert(
    { user_id: user.id, question_id: questionId, respuesta, correcto },
    { onConflict: 'user_id,question_id', ignoreDuplicates: true }
  )
}
