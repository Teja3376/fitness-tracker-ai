'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberModal, CyberInput, CyberButton } from '@/components/cyber'

interface AddMealModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (meal: CustomMeal) => void
}

export interface CustomMeal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fats: number
  ingredients: string[]
}

export function AddMealModal({ isOpen, onClose, onAdd }: AddMealModalProps) {
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [calories, setCalories] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fats, setFats] = useState('')
  const [ingredients, setIngredients] = useState('')

  const handleSubmit = () => {
    if (!name || !calories) return
    
    const meal: CustomMeal = {
      id: `custom-meal-${Date.now()}`,
      name,
      time: time || '12:00',
      calories: parseInt(calories) || 0,
      protein: parseInt(protein) || 0,
      carbs: parseInt(carbs) || 0,
      fats: parseInt(fats) || 0,
      ingredients: ingredients.split(',').map(i => i.trim()).filter(Boolean),
    }
    
    onAdd(meal)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setName('')
    setTime('')
    setCalories('')
    setProtein('')
    setCarbs('')
    setFats('')
    setIngredients('')
  }

  const mealTimes = ['07:00', '10:00', '13:00', '16:00', '19:00', '21:00']

  return (
    <CyberModal isOpen={isOpen} onClose={onClose} title="Log Custom Meal">
      <div className="space-y-5">
        <CyberInput
          label="Meal Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Protein Bowl"
        />
        
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Meal Time
          </label>
          <div className="flex flex-wrap gap-2">
            {mealTimes.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setTime(t)}
                className={`py-2 px-3 font-mono text-xs rounded-sm transition-all ${
                  time === t
                    ? 'bg-primary text-primary-foreground cyber-border' 
                    : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <CyberInput
            label="Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            type="number"
            placeholder="500"
            variant="red"
          />
          <CyberInput
            label="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            type="number"
            placeholder="30"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <CyberInput
            label="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            type="number"
            placeholder="50"
            variant="red"
          />
          <CyberInput
            label="Fats (g)"
            value={fats}
            onChange={(e) => setFats(e.target.value)}
            type="number"
            placeholder="20"
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            Ingredients (comma separated)
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Chicken, Rice, Broccoli..."
            className="w-full bg-card/80 border-2 border-secondary/60 focus:border-secondary px-3 py-3 font-sans text-foreground text-base cyber-clip-sm outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,0,60,0.4)] min-h-[80px] resize-none"
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
            variant="secondary"
            onClick={handleSubmit}
            disabled={!name || !calories}
            className="flex-1"
          >
            Log Meal
          </CyberButton>
        </div>
      </div>
    </CyberModal>
  )
}
