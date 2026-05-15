'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { saveAttempt } from '@/app/actions/attempts'

type Question = {
  id: string
  pregunta: string
  opcion_a: string
  opcion_b: string
  opcion_c: string
  opcion_d: string
  respuesta_correcta: string
  orden: number
}

type Attempt = {
  question_id: string
  respuesta: string
  correcto: boolean
}

type Props = {
  mission: { id: string; nombre: string; descripcion: string | null }
  questions: Question[]
  previousAttempts: Attempt[]
}

function getOptionText(question: Question, option: string): string {
  const map: Record<string, string> = {
    A: question.opcion_a,
    B: question.opcion_b,
    C: question.opcion_c,
    D: question.opcion_d,
  }
  return map[option] ?? ''
}

function ResultsScreen({ missionName, questions, attempts }: {
  missionName: string
  questions: Question[]
  attempts: Attempt[]
}) {
  const attemptMap = new Map(attempts.map((a) => [a.question_id, a]))
  const correct = attempts.filter((a) => a.correcto).length
  const total = questions.length
  const score = total > 0 ? Math.round((correct / total) * 100) : 0

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="font-headline text-3xl uppercase text-gray-900">{missionName}</h1>
        <p className="text-gray-500 text-sm mt-1">Misión completada</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-6 text-center">
        <p className="text-6xl font-bold text-gray-900 mb-2">{score}%</p>
        <p className="text-gray-500 text-sm">{correct} de {total} respuestas correctas</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Resumen</h2>
        <div className="space-y-5">
          {questions.map((q, i) => {
            const attempt = attemptMap.get(q.id)
            const isCorrect = attempt?.correcto ?? false
            return (
              <div key={q.id}>
                <p className="text-sm text-gray-800 mb-2">
                  <span className="font-semibold">{i + 1}.</span> {q.pregunta}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className={`px-2.5 py-1 rounded-full font-medium ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Tu respuesta: {attempt?.respuesta} — {attempt ? getOptionText(q, attempt.respuesta) : '—'}
                  </span>
                  {!isCorrect && (
                    <span className="px-2.5 py-1 rounded-full font-medium bg-green-100 text-green-700">
                      Correcta: {q.respuesta_correcta} — {getOptionText(q, q.respuesta_correcta)}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <Link href="/seller" className="text-sm font-medium text-red-600 hover:text-red-700">
        ← Volver a misiones
      </Link>
    </div>
  )
}

const OPTIONS = ['A', 'B', 'C', 'D'] as const

export default function MissionQuiz({ mission, questions, previousAttempts }: Props) {
  const [localAnswers, setLocalAnswers] = useState<Map<string, { respuesta: string; correcto: boolean }>>(new Map())
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(() => {
    const answeredIds = new Set(previousAttempts.map((a) => a.question_id))
    return questions.find((q) => !answeredIds.has(q.id))?.id ?? questions[0].id
  })
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const allAnsweredMap = new Map<string, { respuesta: string; correcto: boolean }>([
    ...previousAttempts.map((a) => [a.question_id, { respuesta: a.respuesta, correcto: a.correcto }] as const),
    ...localAnswers.entries(),
  ])

  if (questions.every((q) => allAnsweredMap.has(q.id))) {
    const allAttempts = questions.map((q) => ({
      question_id: q.id,
      ...allAnsweredMap.get(q.id)!,
    }))
    return <ResultsScreen missionName={mission.nombre} questions={questions} attempts={allAttempts} />
  }

  const currentQuestion = questions.find((q) => q.id === currentQuestionId)!
  const currentGlobalIndex = questions.indexOf(currentQuestion)
  const answeredCount = allAnsweredMap.size
  const progress = (answeredCount / questions.length) * 100

  const handleAnswer = (option: string) => {
    if (submitted || isPending) return
    const correcto = option === currentQuestion.respuesta_correcta
    setSelectedAnswer(option)
    setSaveError(null)
    startTransition(async () => {
      const { error } = await saveAttempt(currentQuestion.id, option, correcto)
      if (error) {
        setSaveError('No se pudo guardar la respuesta. Por favor, inténtalo de nuevo.')
        setSelectedAnswer(null)
        return
      }
      setLocalAnswers((prev) => new Map(prev).set(currentQuestion.id, { respuesta: option, correcto }))
      setSubmitted(true)
    })
  }

  const handleNext = () => {
    const nextQuestion =
      questions.find((q, i) => i > currentGlobalIndex && !allAnsweredMap.has(q.id) && q.id !== currentQuestion.id) ??
      questions.find((q) => !allAnsweredMap.has(q.id) && q.id !== currentQuestion.id)

    setSelectedAnswer(null)
    setSubmitted(false)
    if (nextQuestion) setCurrentQuestionId(nextQuestion.id)
  }

  const isLastUnanswered = questions.filter((q) => !allAnsweredMap.has(q.id)).length === 1

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-headline text-2xl uppercase text-gray-900">{mission.nombre}</h1>
          <span className="text-sm text-gray-400">{answeredCount} / {questions.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-red-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-4">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
          Pregunta {currentGlobalIndex + 1} de {questions.length}
        </p>
        <p className="text-lg font-medium text-gray-900 mb-6">{currentQuestion.pregunta}</p>

        <div className="space-y-3">
          {OPTIONS.map((opt) => {
            const text = getOptionText(currentQuestion, opt)
            const isSelected = selectedAnswer === opt
            const isCorrectOption = currentQuestion.respuesta_correcta === opt

            let cls = 'w-full text-left px-4 py-3.5 rounded-lg border text-sm transition-all '
            if (!submitted) {
              cls += 'border-gray-200 hover:border-red-300 hover:bg-red-50 cursor-pointer'
            } else if (isCorrectOption) {
              cls += 'border-green-500 bg-green-50 text-green-800 font-medium'
            } else if (isSelected) {
              cls += 'border-red-400 bg-red-50 text-red-800'
            } else {
              cls += 'border-gray-100 text-gray-400'
            }

            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={submitted || isPending}
                className={cls}
              >
                <span className="font-semibold mr-2">{opt}.</span>{text}
              </button>
            )
          })}
        </div>

        {saveError && (
          <div className="mt-5 px-4 py-3 rounded-lg text-sm font-medium bg-yellow-50 text-yellow-800">
            {saveError}
          </div>
        )}

        {submitted && (
          <div className={`mt-5 px-4 py-3 rounded-lg text-sm font-medium ${
            selectedAnswer === currentQuestion.respuesta_correcta
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {selectedAnswer === currentQuestion.respuesta_correcta
              ? '✓ ¡Correcto!'
              : `✗ Incorrecto. La respuesta correcta es ${currentQuestion.respuesta_correcta}.`}
          </div>
        )}
      </div>

      {submitted && (
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            {isLastUnanswered ? 'Ver resultados' : 'Siguiente pregunta →'}
          </button>
        </div>
      )}
    </div>
  )
}
