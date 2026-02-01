'use client'

import { motion } from 'framer-motion'
import type { TabId } from '@/lib/types'
import { WorkoutIcon, DietIcon, ProgressIcon, ReminderIcon } from '@/components/cyber'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

const tabs: { id: TabId; label: string; icon: typeof WorkoutIcon }[] = [
  { id: 'workout', label: 'Train', icon: WorkoutIcon },
  { id: 'diet', label: 'Fuel', icon: DietIcon },
  { id: 'progress', label: 'Stats', icon: ProgressIcon },
  { id: 'reminders', label: 'Alerts', icon: ReminderIcon },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      {/* Glow effect */}
      <div className="absolute inset-x-0 -top-4 h-8 bg-gradient-to-t from-background to-transparent" />
      
      <div className="relative bg-card/95 backdrop-blur-md border-t border-primary/30">
        {/* Animated top border */}
        <motion.div
          className="absolute top-0 h-[2px] bg-primary"
          initial={false}
          animate={{
            left: `${tabs.findIndex(t => t.id === activeTab) * 25}%`,
            width: '25%',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ boxShadow: '0 0 10px var(--cyber-yellow), 0 0 20px var(--cyber-yellow)' }}
        />

        <div className="flex items-center justify-around py-2 px-4 safe-area-bottom">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <motion.button
                key={tab.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  'flex flex-col items-center gap-1 px-4 py-2 rounded transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <motion.div
                  animate={{ 
                    scale: isActive ? 1.2 : 1,
                    y: isActive ? -2 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Icon className={cn(
                    'w-6 h-6 transition-all',
                    isActive && 'drop-shadow-[0_0_8px_var(--cyber-yellow)]'
                  )} />
                </motion.div>
                <span className={cn(
                  'text-[10px] font-mono uppercase tracking-wider',
                  isActive && 'cyber-text-glow'
                )}>
                  {tab.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
