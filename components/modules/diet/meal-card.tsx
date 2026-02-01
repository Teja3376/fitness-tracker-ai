'use client'

import { motion } from 'framer-motion'
import type { Meal } from '@/lib/types'
import { CyberCard, CyberProgress } from '@/components/cyber'

interface MealCardProps {
  meal: Meal
  index: number
  targetCalories: number
}

export function MealCard({ meal, index, targetCalories }: MealCardProps) {
  const caloriePercentage = (meal.calories / targetCalories) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <CyberCard className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] font-mono text-primary uppercase tracking-wider">
              {meal.time}
            </p>
            <h4 className="text-base font-mono font-bold text-foreground mt-0.5">
              {meal.name}
            </h4>
          </div>
          <div className="text-right">
            <p className="text-lg font-mono font-bold text-primary cyber-text-glow">
              {meal.calories}
            </p>
            <p className="text-[10px] text-muted-foreground">KCAL</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <MacroItem label="Protein" value={meal.protein} unit="g" color="yellow" />
          <MacroItem label="Carbs" value={meal.carbs} unit="g" color="red" />
          <MacroItem label="Fats" value={meal.fats} unit="g" color="neutral" />
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-[10px] font-mono text-muted-foreground uppercase mb-2">
            Contents
          </p>
          <div className="flex flex-wrap gap-1">
            {meal.items.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                className="px-2 py-0.5 text-[10px] font-mono bg-muted text-muted-foreground cyber-clip-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </div>
      </CyberCard>
    </motion.div>
  )
}

interface MacroItemProps {
  label: string
  value: number
  unit: string
  color: 'yellow' | 'red' | 'neutral'
}

function MacroItem({ label, value, unit, color }: MacroItemProps) {
  const colors = {
    yellow: 'text-primary',
    red: 'text-secondary',
    neutral: 'text-muted-foreground',
  }

  return (
    <div className="text-center p-2 bg-muted/50 cyber-clip-sm">
      <p className="text-[9px] font-mono text-muted-foreground uppercase">{label}</p>
      <p className={`text-sm font-mono font-bold ${colors[color]}`}>
        {value}<span className="text-[9px] text-muted-foreground">{unit}</span>
      </p>
    </div>
  )
}
