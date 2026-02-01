'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { DietPlan } from '@/lib/types'
import { dietPlans } from '@/lib/data'
import { GlitchText, CyberCard, CyberButton, CyberProgress, PlusIcon } from '@/components/cyber'
import { MealCard } from './meal-card'
import { cn } from '@/lib/utils'

export function DietModule() {
  const [selectedPlan, setSelectedPlan] = useState<DietPlan>(dietPlans[0])
  
  const totalConsumed = selectedPlan.meals.reduce((acc, meal) => acc + meal.calories, 0)
  const totalProtein = selectedPlan.meals.reduce((acc, meal) => acc + meal.protein, 0)
  const totalCarbs = selectedPlan.meals.reduce((acc, meal) => acc + meal.carbs, 0)
  const totalFats = selectedPlan.meals.reduce((acc, meal) => acc + meal.fats, 0)

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <GlitchText text="Nutrition Protocol" className="text-xl font-bold text-primary" />
          <p className="text-xs text-muted-foreground mt-1">
            Fuel optimization system
          </p>
        </div>
        <CyberButton size="sm" variant="ghost">
          <PlusIcon className="w-4 h-4 mr-1" />
          Custom
        </CyberButton>
      </div>

      {/* Plan Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {dietPlans.map((plan) => (
          <motion.button
            key={plan.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPlan(plan)}
            className={cn(
              'px-4 py-2 font-mono text-xs uppercase tracking-wider whitespace-nowrap cyber-clip-sm transition-all',
              selectedPlan.id === plan.id
                ? 'bg-primary text-primary-foreground cyber-border'
                : 'bg-muted text-muted-foreground hover:text-foreground'
            )}
          >
            {plan.name}
          </motion.button>
        ))}
      </div>

      {/* Daily Summary */}
      <motion.div
        key={selectedPlan.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CyberCard variant="glow" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Daily Target</p>
              <p className="text-2xl font-mono font-bold text-primary cyber-text-glow">
                {selectedPlan.targetCalories}
                <span className="text-sm text-muted-foreground ml-1">KCAL</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Consumed</p>
              <p className="text-2xl font-mono font-bold text-foreground">
                {totalConsumed}
                <span className="text-sm text-muted-foreground ml-1">KCAL</span>
              </p>
            </div>
          </div>

          <CyberProgress 
            value={totalConsumed} 
            max={selectedPlan.targetCalories}
            variant={totalConsumed > selectedPlan.targetCalories ? 'red' : 'yellow'}
          />

          <div className="grid grid-cols-3 gap-3 pt-2">
            <MacroSummary label="Protein" value={totalProtein} unit="g" />
            <MacroSummary label="Carbs" value={totalCarbs} unit="g" />
            <MacroSummary label="Fats" value={totalFats} unit="g" />
          </div>
        </CyberCard>
      </motion.div>

      {/* Meals */}
      <div className="space-y-3">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          Scheduled Intakes
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPlan.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            {selectedPlan.meals.map((meal, index) => (
              <MealCard 
                key={meal.id} 
                meal={meal} 
                index={index}
                targetCalories={selectedPlan.targetCalories}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

interface MacroSummaryProps {
  label: string
  value: number
  unit: string
}

function MacroSummary({ label, value, unit }: MacroSummaryProps) {
  return (
    <div className="text-center">
      <p className="text-[9px] font-mono text-muted-foreground uppercase">{label}</p>
      <p className="text-lg font-mono font-bold text-foreground">
        {value}<span className="text-[10px] text-muted-foreground">{unit}</span>
      </p>
    </div>
  )
}
