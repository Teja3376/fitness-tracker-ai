'use client'

import { motion } from 'framer-motion'
import type { Reminder } from '@/lib/types'
import { CyberCard } from '@/components/cyber'
import { cn } from '@/lib/utils'

interface ReminderItemProps {
  reminder: Reminder
  index: number
  onToggle: (id: string) => void
}

const typeIcons = {
  workout: 'W',
  meal: 'M',
  water: 'H',
  sleep: 'S',
}

const typeColors = {
  workout: 'bg-secondary text-secondary-foreground',
  meal: 'bg-primary text-primary-foreground',
  water: 'bg-blue-500 text-white',
  sleep: 'bg-purple-500 text-white',
}

export function ReminderItem({ reminder, index, onToggle }: ReminderItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <CyberCard 
        variant={reminder.enabled ? 'default' : 'default'}
        className={cn(!reminder.enabled && 'opacity-50')}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            'w-10 h-10 flex items-center justify-center text-sm font-mono font-bold cyber-clip-sm',
            typeColors[reminder.type]
          )}>
            {typeIcons[reminder.type]}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-mono font-semibold text-foreground truncate">
              {reminder.title}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-mono text-primary">{reminder.time}</span>
              <span className="text-xs text-muted-foreground">
                {reminder.days.length === 7 ? 'Daily' : reminder.days.join(', ')}
              </span>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onToggle(reminder.id)}
            className={cn(
              'relative w-12 h-6 rounded-full transition-colors',
              reminder.enabled ? 'bg-primary' : 'bg-muted'
            )}
          >
            <motion.div
              animate={{ x: reminder.enabled ? 24 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-background"
            />
          </motion.button>
        </div>
      </CyberCard>
    </motion.div>
  )
}
