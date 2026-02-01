'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberModal, CyberInput, CyberButton } from '@/components/cyber'

interface AddWorkoutModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (workout: CustomWorkout) => void
}

export interface CustomWorkout {
  id: string
  name: string
  duration: string
  calories: number
  difficulty: string
  exercises: string[]
}

export function AddWorkoutModal({ isOpen, onClose, onAdd }: AddWorkoutModalProps) {
  const [name, setName] = useState('')
  const [duration, setDuration] = useState('')
  const [calories, setCalories] = useState('')
  const [difficulty, setDifficulty] = useState('Beginner')
  const [exercises, setExercises] = useState('')

  const handleSubmit = () => {
    if (!name || !duration) return
    
    const workout: CustomWorkout = {
      id: `custom-${Date.now()}`,
      name,
      duration: `${duration} min`,
      calories: parseInt(calories) || 0,
      difficulty,
      exercises: exercises.split(',').map(e => e.trim()).filter(Boolean),
    }
    
    onAdd(workout)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName('')
    setDuration('')
    setCalories('')
    setDifficulty('Beginner')
    setExercises('')
  }

  const difficulties = ['Beginner', 'Intermediate', 'Advanced']

  return (
    <CyberModal isOpen={isOpen} onClose={onClose} title="Create Protocol">
      <div className="space-y-5">
        <CyberInput
          label="Protocol Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Morning Burn"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <CyberInput
            label="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            type="number"
            placeholder="30"
          />
          <CyberInput
            label="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            type="number"
            placeholder="200"
            variant="red"
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Difficulty Level
          </label>
          <div className="flex gap-2">
            {difficulties.map((diff) => (
              <motion.button
                key={diff}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDifficulty(diff)}
                className={`flex-1 py-2.5 px-3 font-mono text-xs uppercase tracking-wider rounded-sm transition-all ${
                  difficulty === diff
                    ? diff === 'Advanced' 
                      ? 'bg-secondary text-secondary-foreground cyber-border-red' 
                      : 'bg-primary text-primary-foreground cyber-border'
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {diff}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Exercises (comma separated)
          </label>
          <textarea
            value={exercises}
            onChange={(e) => setExercises(e.target.value)}
            placeholder="Push-ups, Squats, Lunges..."
            className="w-full bg-card/80 border-2 border-primary/60 focus:border-primary px-3 py-3 font-sans text-foreground text-base cyber-clip-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(252,233,79,0.4)] min-h-[80px] resize-none"
          />
        </div>
        
        <div className="flex gap-3 pt-4">
          <CyberButton 
            variant="ghost" 
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </CyberButton>
          <CyberButton 
            onClick={handleSubmit}
            disabled={!name || !duration}
            className="flex-1"
          >
            Create Protocol
          </CyberButton>
        </div>
      </div>
    </CyberModal>
  )
}
