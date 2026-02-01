'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { WorkoutPlan, Exercise } from '@/lib/types'
import { CyberCard, CyberButton, CyberProgress, CheckIcon } from '@/components/cyber'
import { cn } from '@/lib/utils'

interface WorkoutDetailProps {
  plan: WorkoutPlan
  onBack: () => void
}

export function WorkoutDetail({ plan, onBack }: WorkoutDetailProps) {
  const [completedExercises, setCompletedExercises] = useState<string[]>([])
  
  const toggleExercise = (id: string) => {
    setCompletedExercises(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    )
  }

  const progress = (completedExercises.length / plan.exercises.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4 mb-6">
        <CyberButton variant="ghost" size="sm" onClick={onBack}>
          Back
        </CyberButton>
        <div className="flex-1">
          <h2 className="text-xl font-mono font-bold text-primary cyber-text-glow">
            {plan.name}
          </h2>
          <p className="text-xs text-muted-foreground">{plan.duration} | {plan.calories} cal</p>
        </div>
      </div>

      <CyberProgress 
        value={completedExercises.length} 
        max={plan.exercises.length}
        showLabel
        label="Progress"
      />

      <div className="space-y-3 mt-6">
        <AnimatePresence mode="popLayout">
          {plan.exercises.map((exercise, index) => (
            <ExerciseItem 
              key={exercise.id}
              exercise={exercise}
              index={index}
              completed={completedExercises.includes(exercise.id)}
              onToggle={() => toggleExercise(exercise.id)}
            />
          ))}
        </AnimatePresence>
      </div>

      {progress === 100 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <p className="text-2xl font-mono font-bold text-primary cyber-text-glow">
            WORKOUT COMPLETE
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Neural enhancement protocols fulfilled
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

interface ExerciseItemProps {
  exercise: Exercise
  index: number
  completed: boolean
  onToggle: () => void
}

function ExerciseItem({ exercise, index, completed, onToggle }: ExerciseItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <CyberCard 
        variant={completed ? 'glow' : 'default'}
        className={cn('cursor-pointer', completed && 'opacity-70')}
        onClick={onToggle}
      >
        <div className="flex items-center gap-4">
          <motion.div
            animate={{ 
              scale: completed ? 1 : 0.9,
              backgroundColor: completed ? 'var(--primary)' : 'transparent'
            }}
            className={cn(
              'w-8 h-8 rounded flex items-center justify-center border',
              completed ? 'border-primary' : 'border-muted'
            )}
          >
            {completed && <CheckIcon className="w-5 h-5 text-primary-foreground" />}
          </motion.div>
          
          <div className="flex-1">
            <h4 className={cn(
              'font-mono font-semibold',
              completed ? 'text-primary line-through' : 'text-foreground'
            )}>
              {exercise.name}
            </h4>
            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground font-mono">
              <span>{exercise.sets} sets</span>
              <span>{exercise.reps} reps</span>
              <span>Rest: {exercise.rest}</span>
            </div>
          </div>
          
          <span className="text-[10px] font-mono text-muted-foreground uppercase">
            {exercise.muscleGroup}
          </span>
        </div>
      </CyberCard>
    </motion.div>
  )
}
