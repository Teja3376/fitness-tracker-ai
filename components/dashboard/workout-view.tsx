'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberCard, CyberButton, GlitchText, FireIcon, ChevronIcon, PlusIcon } from '@/components/cyber'
import { workoutPlans } from '@/lib/data'
import { AddWorkoutModal, type CustomWorkout } from '@/components/modals/add-workout-modal'

interface WorkoutViewProps {
  onSelectWorkout: (id: string) => void
}

export function WorkoutView({ onSelectWorkout }: WorkoutViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customWorkouts, setCustomWorkouts] = useState<CustomWorkout[]>([])

  const handleAddWorkout = (workout: CustomWorkout) => {
    setCustomWorkouts(prev => [workout, ...prev])
  }

  const allWorkouts = [...customWorkouts.map(w => ({
    ...w,
    description: 'Custom protocol',
    exercises: w.exercises.map((name, i) => ({ id: `ex-${i}`, name, sets: 3, reps: '10', restTime: '60s' }))
  })), ...workoutPlans]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

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
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <GlitchText text="Workout Protocols" as="h2" className="text-2xl lg:text-3xl font-bold" />
          <p className="text-muted-foreground text-sm mt-1">
            Select your enhancement routine
          </p>
        </div>
        <CyberButton size="sm" className="hidden sm:flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-4 h-4" />
          Custom
        </CyberButton>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={item} className="grid grid-cols-3 gap-4">
        <CyberCard className="p-4 text-center">
          <p className="text-2xl font-mono font-bold text-primary">47</p>
          <p className="text-xs text-muted-foreground uppercase">Total Sessions</p>
        </CyberCard>
        <CyberCard variant="red" className="p-4 text-center">
          <p className="text-2xl font-mono font-bold text-secondary">18.5K</p>
          <p className="text-xs text-muted-foreground uppercase">Calories Burned</p>
        </CyberCard>
        <CyberCard className="p-4 text-center">
          <p className="text-2xl font-mono font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground uppercase">Day Streak</p>
        </CyberCard>
      </motion.div>

      {/* Workout List */}
      <motion.div variants={item} className="space-y-4">
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground">
          Available Protocols
        </h3>
        
        {allWorkouts.map((workout, index) => (
          <motion.div
            key={workout.id}
            variants={item}
            custom={index}
          >
            <CyberCard 
              variant={index % 2 === 0 ? 'default' : 'red'}
              className="p-5 cursor-pointer group"
              onClick={() => onSelectWorkout(workout.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-mono font-bold">
                      {workout.name}
                    </h4>
                    <span className={`px-2 py-0.5 text-xs font-mono uppercase rounded-sm ${getDifficultyColor(workout.difficulty)}`}>
                      {workout.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {workout.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Duration:</span>
                      <span className="text-sm font-mono text-foreground">{workout.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FireIcon className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-mono text-foreground">{workout.calories} kcal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Exercises:</span>
                      <span className="text-sm font-mono text-foreground">{workout.exercises.length}</span>
                    </div>
                  </div>
                </div>
                <motion.div 
                  className="ml-4 p-2 bg-muted/50 rounded-sm"
                  whileHover={{ x: 4 }}
                >
                  <ChevronIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </div>
            </CyberCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile Create Button */}
      <motion.div variants={item} className="sm:hidden">
        <CyberButton size="lg" className="w-full flex items-center justify-center gap-2" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-5 h-5" />
          Create Custom Protocol
        </CyberButton>
      </motion.div>

      <AddWorkoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddWorkout} 
      />
    </motion.div>
  )
}
