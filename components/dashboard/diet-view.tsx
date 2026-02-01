'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberCard, CyberButton, CyberProgress, GlitchText, PlusIcon, ChevronIcon } from '@/components/cyber'
import { dietPlans } from '@/lib/data'
import { AddMealModal, type CustomMeal } from '@/components/modals/add-meal-modal'

interface DietViewProps {
  onSelectMeal: (id: string) => void
}

export function DietView({ onSelectMeal }: DietViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [customMeals, setCustomMeals] = useState<CustomMeal[]>([])

  const handleAddMeal = (meal: CustomMeal) => {
    setCustomMeals(prev => [...prev, meal])
  }

  const activePlan = dietPlans[0]
  const totalCalories = activePlan.meals.reduce((sum, m) => sum + m.calories, 0)
  const totalProtein = activePlan.meals.reduce((sum, m) => sum + m.protein, 0)
  const totalCarbs = activePlan.meals.reduce((sum, m) => sum + m.carbs, 0)
  const totalFats = activePlan.meals.reduce((sum, m) => sum + m.fats, 0)

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="flex items-center justify-between">
        <div>
          <GlitchText text="Nutrition Protocols" as="h2" className="text-2xl lg:text-3xl font-bold" />
          <p className="text-muted-foreground text-sm mt-1">
            Optimize your fuel intake
          </p>
        </div>
        <CyberButton size="sm" variant="secondary" className="hidden sm:flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <PlusIcon className="w-4 h-4" />
          Add Meal
        </CyberButton>
      </motion.div>

      {/* Active Plan */}
      <motion.div variants={item}>
        <CyberCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Active Protocol</p>
              <h3 className="font-mono text-xl font-bold text-primary">{activePlan.name}</h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Target</p>
              <p className="font-mono text-lg font-bold">{activePlan.targetCalories} kcal</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{activePlan.description}</p>
          <CyberProgress value={totalCalories} max={activePlan.targetCalories} />
          <p className="text-xs text-muted-foreground mt-2 text-right">
            {totalCalories} / {activePlan.targetCalories} kcal consumed
          </p>
        </CyberCard>
      </motion.div>

      {/* Macro Breakdown */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Macro Distribution
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <CyberCard className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-2 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--muted)" strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="15" fill="none" 
                  stroke="var(--cyber-yellow)" 
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  initial={{ strokeDashoffset: 94.2 }}
                  animate={{ strokeDashoffset: 94.2 - (94.2 * 0.4) }}
                  transition={{ delay: 0.5, duration: 1 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold">
                40%
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-primary">{totalProtein}g</p>
            <p className="text-xs text-muted-foreground uppercase">Protein</p>
          </CyberCard>

          <CyberCard variant="red" className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-2 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--muted)" strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="15" fill="none" 
                  stroke="var(--cyber-red)" 
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  initial={{ strokeDashoffset: 94.2 }}
                  animate={{ strokeDashoffset: 94.2 - (94.2 * 0.35) }}
                  transition={{ delay: 0.6, duration: 1 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold">
                35%
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-secondary">{totalCarbs}g</p>
            <p className="text-xs text-muted-foreground uppercase">Carbs</p>
          </CyberCard>

          <CyberCard className="p-4 text-center">
            <div className="w-16 h-16 mx-auto mb-2 relative">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--muted)" strokeWidth="3" />
                <motion.circle 
                  cx="18" cy="18" r="15" fill="none" 
                  stroke="var(--cyber-yellow)" 
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  initial={{ strokeDashoffset: 94.2 }}
                  animate={{ strokeDashoffset: 94.2 - (94.2 * 0.25) }}
                  transition={{ delay: 0.7, duration: 1 }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold">
                25%
              </span>
            </div>
            <p className="font-mono text-lg font-bold text-primary">{totalFats}g</p>
            <p className="text-xs text-muted-foreground uppercase">Fats</p>
          </CyberCard>
        </div>
      </motion.div>

      {/* Meal Schedule */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Today&apos;s Meal Schedule
        </h3>
        <div className="space-y-3">
          {[...activePlan.meals, ...customMeals].map((meal, index) => (
            <motion.div
              key={meal.id}
              variants={item}
              custom={index}
            >
              <CyberCard 
                variant={index % 2 === 0 ? 'default' : 'red'}
                className="p-4 cursor-pointer group"
                onClick={() => onSelectMeal(meal.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted/50 rounded-sm flex items-center justify-center">
                      <span className="font-mono text-xs text-muted-foreground">{meal.time}</span>
                    </div>
                    <div>
                      <h4 className="font-mono font-semibold">{meal.name}</h4>
                      <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                        <span>P: {meal.protein}g</span>
                        <span>C: {meal.carbs}g</span>
                        <span>F: {meal.fats}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-mono font-bold text-primary">{meal.calories}</p>
                      <p className="text-xs text-muted-foreground">kcal</p>
                    </div>
                    <ChevronIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Mobile Add Meal Button */}
      <motion.div variants={item} className="sm:hidden">
        <CyberButton 
          variant="secondary" 
          size="lg" 
          className="w-full flex items-center justify-center gap-2" 
          onClick={() => setIsModalOpen(true)}
        >
          <PlusIcon className="w-5 h-5" />
          Add Custom Meal
        </CyberButton>
      </motion.div>

      <AddMealModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddMeal} 
      />
    </motion.div>
  )
}
