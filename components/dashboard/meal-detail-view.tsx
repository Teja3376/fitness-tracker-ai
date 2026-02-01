'use client'

import { motion } from 'framer-motion'
import { CyberCard, CyberButton, GlitchText, BackIcon, CheckIcon } from '@/components/cyber'
import { dietPlans } from '@/lib/data'

interface MealDetailViewProps {
  mealId: string
  onBack: () => void
}

export function MealDetailView({ mealId, onBack }: MealDetailViewProps) {
  const meal = dietPlans.flatMap(p => p.meals).find(m => m.id === mealId)

  if (!meal) return null

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
          <GlitchText text={meal.name} as="h2" className="text-2xl lg:text-3xl font-bold" />
          <p className="text-muted-foreground text-sm mt-1">Scheduled for {meal.time}</p>
        </div>
      </motion.div>

      {/* Info Chips */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-3"
      >
        <span className="px-4 py-2 bg-primary/20 text-primary text-sm font-mono uppercase cyber-clip-sm">
          {meal.calories} kcal
        </span>
        <span className="px-4 py-2 bg-muted text-sm font-mono uppercase cyber-clip-sm">
          P: {meal.protein}g
        </span>
        <span className="px-4 py-2 bg-secondary/20 text-secondary text-sm font-mono uppercase cyber-clip-sm">
          C: {meal.carbs}g
        </span>
        <span className="px-4 py-2 bg-muted text-sm font-mono uppercase cyber-clip-sm">
          F: {meal.fats}g
        </span>
      </motion.div>

      {/* Macro Visual */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <CyberCard className="p-5">
          <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Macro Breakdown
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Protein</span>
                  <span className="text-xs font-mono">{meal.protein}g</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(meal.protein / (meal.protein + meal.carbs + meal.fats)) * 100}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-full bg-primary"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Carbs</span>
                  <span className="text-xs font-mono">{meal.carbs}g</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(meal.carbs / (meal.protein + meal.carbs + meal.fats)) * 100}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="h-full bg-secondary"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Fats</span>
                  <span className="text-xs font-mono">{meal.fats}g</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(meal.fats / (meal.protein + meal.carbs + meal.fats)) * 100}%` }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="h-full bg-primary/60"
                  />
                </div>
              </div>
            </div>
            <div className="w-24 h-24 relative hidden sm:block">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--muted)" strokeWidth="4" />
                <motion.circle 
                  cx="18" cy="18" r="15" fill="none" 
                  stroke="var(--cyber-yellow)" 
                  strokeWidth="4"
                  strokeDasharray={`${(meal.protein / (meal.protein + meal.carbs + meal.fats)) * 94.2} 94.2`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                />
                <motion.circle 
                  cx="18" cy="18" r="15" fill="none" 
                  stroke="var(--cyber-red)" 
                  strokeWidth="4"
                  strokeDasharray={`${(meal.carbs / (meal.protein + meal.carbs + meal.fats)) * 94.2} 94.2`}
                  strokeDashoffset={-((meal.protein / (meal.protein + meal.carbs + meal.fats)) * 94.2)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                />
              </svg>
            </div>
          </div>
        </CyberCard>
      </motion.div>

      {/* Food Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Food Components
        </h3>
        <div className="space-y-3">
          {meal.items.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <CyberCard 
                variant={index % 2 === 0 ? 'default' : 'red'}
                className="p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted/50 rounded-sm flex items-center justify-center">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="font-mono">{item}</span>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Log Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <CyberButton 
          size="lg" 
          className="w-full flex items-center justify-center gap-2"
          onClick={onBack}
        >
          <CheckIcon className="w-5 h-5" />
          Log Meal
        </CyberButton>
      </motion.div>
    </motion.div>
  )
}
