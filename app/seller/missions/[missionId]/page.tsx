import { createClient } from '@/lib/supabase-server'
import { notFound, redirect } from 'next/navigation'
import MissionQuiz from './MissionQuiz'

export default async function MissionPage({ params }: { params: Promise<{ missionId: string }> }) {
  const supabase = await createClient()
  const { missionId } = await params

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const [{ data: mission }, { data: questions }, { data: attempts }] = await Promise.all([
    supabase
      .from('missions')
      .select('id, nombre, descripcion')
      .eq('id', missionId)
      .eq('activa', true)
      .single(),
    supabase
      .from('questions')
      .select('id, pregunta, opcion_a, opcion_b, opcion_c, opcion_d, respuesta_correcta, orden')
      .eq('mission_id', missionId)
      .order('orden'),
    supabase
      .from('attempts')
      .select('question_id, respuesta, correcto')
      .eq('user_id', user.id),
  ])

  if (!mission) notFound()

  if (!questions || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{mission.nombre}</h1>
        <p className="text-gray-500 text-sm">Esta misión no tiene preguntas todavía.</p>
      </div>
    )
  }

  const questionIds = new Set(questions.map((q) => q.id))
  const relevantAttempts = (attempts ?? []).filter((a) => questionIds.has(a.question_id))

  return (
    <MissionQuiz
      mission={mission}
      questions={questions}
      previousAttempts={relevantAttempts}
    />
  )
}
