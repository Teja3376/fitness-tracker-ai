'use client'

import { motion } from 'framer-motion'
import { userStats } from '@/lib/data'
import { FireIcon } from '@/components/cyber'

export function Header() {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
  
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              System Online
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg font-mono font-bold text-primary cyber-text-glow"
          >
            CYBERFIT
          </motion.h1>
        </div>

        <div className="flex items-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 px-2 py-1 bg-secondary/20 cyber-clip-sm"
          >
            <FireIcon className="w-4 h-4 text-secondary" />
            <span className="text-sm font-mono font-bold text-secondary">
              {userStats.currentStreak}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-right"
          >
            <p className="text-sm font-mono text-primary tabular-nums">{currentTime}</p>
            <p className="text-[10px] font-mono text-muted-foreground">{currentDate}</p>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
