'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { HomeIcon, WorkoutIcon, DietIcon, ProgressIcon, UserIcon } from '@/components/cyber'

interface MobileNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: 'home', label: 'Home', icon: HomeIcon },
  { id: 'workout', label: 'Workout', icon: WorkoutIcon },
  { id: 'diet', label: 'Meals', icon: DietIcon },
  { id: 'progress', label: 'Progress', icon: ProgressIcon },
  { id: 'profile', label: 'Profile', icon: UserIcon },
]

export function MobileNav({ activeTab, onTabChange }: MobileNavProps) {
  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border"
    >
      <div className="flex items-center justify-around px-2 py-2 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'relative flex flex-col items-center justify-center px-4 py-2 min-w-[64px]',
                'transition-colors duration-200'
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-lg cyber-border"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <Icon 
                className={cn(
                  'w-6 h-6 relative z-10 transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )} 
              />
              <span 
                className={cn(
                  'text-[10px] mt-1 font-mono uppercase tracking-wider relative z-10',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </motion.button>
          )
        })}
      </div>
    </motion.nav>
  )
}
