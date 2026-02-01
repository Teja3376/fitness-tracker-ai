'use client'

import { motion } from 'framer-motion'
import { GlitchText, AlertIcon } from '@/components/cyber'
import Link from 'next/link'

interface DashboardHeaderProps {
  title: string
  alertCount?: number
  onAlertsClick?: () => void
}

export function DashboardHeader({ title, alertCount = 0, onAlertsClick }: DashboardHeaderProps) {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="lg:hidden sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border px-4 py-4"
    >
      <div className="flex items-center justify-between">
        <Link href="/">
          <GlitchText text="CYBERFIT" as="h1" className="text-xl font-bold" />
        </Link>
        
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={onAlertsClick}
            className="relative p-2 hover:bg-muted/50 rounded-sm transition-colors"
          >
            <AlertIcon className="w-6 h-6 text-foreground/80" />
            {alertCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-secondary text-[10px] font-bold flex items-center justify-center rounded-full px-1"
              >
                {alertCount > 9 ? '9+' : alertCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-mono text-sm uppercase tracking-wider text-primary mt-2"
      >
        {title}
      </motion.h2>
    </motion.header>
  )
}
