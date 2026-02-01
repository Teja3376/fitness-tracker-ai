'use client'

import { motion } from 'framer-motion'
import type { WorkoutPlan } from '@/lib/types'
import { CyberCard, CyberButton, FireIcon, ChevronIcon } from '@/components/cyber'
import { cn } from '@/lib/utils'

interface WorkoutCardProps {
  plan: WorkoutPlan
  onSelect: (plan: WorkoutPlan) => void
  index: number
}

export function WorkoutCard({ plan, onSelect, index }: WorkoutCardProps) {
  const difficultyColors = {
    Beginner: 'text-green-400',
    Intermediate: 'text-primary',
    Advanced: 'text-secondary',
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <CyberCard 
        variant={plan.difficulty === 'Advanced' ? 'red' : 'default'}
        className="cursor-pointer group"
        onClick={() => onSelect(plan)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('text-[10px] font-mono uppercase tracking-wider', difficultyColors[plan.difficulty])}>
                {plan.difficulty}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground">
                {plan.duration}
              </span>
            </div>
            <h3 className="text-lg font-mono font-bold text-foreground truncate cyber-text-glow">
              {plan.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {plan.description}
            </p>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-secondary">
                <FireIcon className="w-4 h-4" />
                <span className="text-xs font-mono">{plan.calories} cal</span>
              </div>
              <span className="text-xs font-mono text-muted-foreground">
                {plan.exercises.length} exercises
              </span>
            </div>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            className="text-primary group-hover:text-secondary transition-colors"
          >
            <ChevronIcon className="w-6 h-6" />
          </motion.div>
        </div>
      </CyberCard>
    </motion.div>
  )
}
