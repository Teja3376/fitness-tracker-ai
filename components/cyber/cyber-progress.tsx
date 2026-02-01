'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CyberProgressProps {
  value: number
  max?: number
  variant?: 'yellow' | 'red'
  showLabel?: boolean
  label?: string
  className?: string
}

export function CyberProgress({ 
  value, 
  max = 100, 
  variant = 'yellow',
  showLabel = false,
  label,
  className 
}: CyberProgressProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const colors = {
    yellow: 'bg-primary',
    red: 'bg-secondary',
  }

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            {label}
          </span>
          <span className="text-xs font-mono text-primary">
            {value}/{max}
          </span>
        </div>
      )}
      <div className="relative h-2 bg-muted cyber-clip-sm overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full', colors[variant])}
          style={{
            boxShadow: variant === 'yellow' 
              ? '0 0 10px var(--cyber-yellow)' 
              : '0 0 10px var(--cyber-red)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[border-flow_2s_linear_infinite]" />
      </div>
    </div>
  )
}
