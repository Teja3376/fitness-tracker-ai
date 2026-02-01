'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CyberCard, CyberButton, CyberProgress, GlitchText, BackIcon, FireIcon, CheckIcon } from '@/components/cyber'
import { workoutPlans } from '@/lib/data'
import type { Exercise } from '@/lib/types'

interface WorkoutDetailViewProps {
  workoutId: string
  onBack: () => void
}

export function WorkoutDetailView({ workoutId, onBack }: WorkoutDetailViewProps) {
  const workout = workoutPlans.find(w => w.id === workoutId)
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set())
  const [isStarted, setIsStarted] = useState(false)

  if (!workout) return null

  const toggleExercise = (exerciseId: string) => {
    setCompletedExercises(prev => {
      const newSet = new Set(prev)
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId)
      } else {
        newSet.add(exerciseId)
      }
      return newSet
    })
  }

  const progress = (completedExercises.size / workout.exercises.length) * 100

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20'
      case 'Intermediate': return 'text-primary bg-primary/20'
      case 'Advanced': return 'text-secondary bg-secondary/20'
      default: return 'text-muted-foreground bg-muted'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-start gap-4"
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="p-2 bg-muted/50 rounded-sm hover:bg-muted transition-colors"
        >
          <BackIcon className="w-5 h-5" />
        </motion.button>
        <div className="flex-1">
          <GlitchText text={workout.name} as="h2" className="text-2xl lg:text-3xl font-bold" />
          <p className="text-muted-foreground text-sm mt-1">{workout.description}</p>
        </div>
      </motion.div>

      {/* Info Chips */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        <span className="px-4 py-2 bg-muted text-sm font-mono uppercase cyber-clip-sm">
          {workout.duration}
        </span>
        <span className="px-4 py-2 bg-muted text-sm font-mono uppercase cyber-clip-sm flex items-center gap-2">
          <FireIcon className="w-4 h-4 text-secondary" />
          {workout.calories} kcal
        </span>
        <span className={`px-4 py-2 text-sm font-mono uppercase cyber-clip-sm ${getDifficultyColor(workout.difficulty)}`}>
          {workout.difficulty}
        </span>
        <span className="px-4 py-2 bg-muted text-sm font-mono uppercase cyber-clip-sm">
          {workout.exercises.length} Exercises
        </span>
      </motion.div>

      {/* Progress (when started) */}
      <AnimatePresence>
        {isStarted && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <CyberCard className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm">Workout Progress</span>
                <span className="font-mono text-primary font-bold">{Math.round(progress)}%</span>
              </div>
              <CyberProgress value={progress} max={100} />
            </CyberCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Start Button */}
      {!isStarted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <CyberButton 
            size="lg" 
            className="w-full"
            onClick={() => setIsStarted(true)}
          >
            Start Workout
          </CyberButton>
        </motion.div>
      )}

      {/* Exercise List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Exercise Protocol
        </h3>
        
        {workout.exercises.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            isCompleted={completedExercises.has(exercise.id)}
            isStarted={isStarted}
            onToggle={() => toggleExercise(exercise.id)}
          />
        ))}
      </motion.div>

      {/* Complete Button */}
      {isStarted && completedExercises.size === workout.exercises.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CyberButton 
            variant="secondary"
            size="lg" 
            className="w-full"
            onClick={onBack}
          >
            Complete Workout
          </CyberButton>
        </motion.div>
      )}
    </motion.div>
  )
}

interface ExerciseCardProps {
  exercise: Exercise
  index: number
  isCompleted: boolean
  isStarted: boolean
  onToggle: () => void
}

function ExerciseCard({ exercise, index, isCompleted, isStarted, onToggle }: ExerciseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <CyberCard 
        variant={isCompleted ? 'glow' : (index % 2 === 0 ? 'default' : 'red')}
        className="p-4"
        onClick={isStarted ? onToggle : undefined}
        style={{ cursor: isStarted ? 'pointer' : 'default' }}
      >
        <div className="flex items-center gap-4">
          {isStarted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                isCompleted ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
            >
              {isCompleted && <CheckIcon className="w-5 h-5" />}
            </motion.div>
          )}
          
          <div className="flex-1">
            <h4 className={`font-mono font-semibold ${isCompleted ? 'line-through opacity-60' : ''}`}>
              {exercise.name}
            </h4>
            <div className="flex flex-wrap gap-4 mt-2 text-xs text-muted-foreground">
              <span>{exercise.sets} sets</span>
              <span>{exercise.reps} reps</span>
              <span>Rest: {exercise.rest}</span>
              <span className="text-primary">{exercise.muscleGroup}</span>
            </div>
          </div>
          
          <span className="font-mono text-2xl text-muted-foreground/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </CyberCard>
    </motion.div>
  )
}
