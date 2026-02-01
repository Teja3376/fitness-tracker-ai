'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CyberCard } from './cyber-card'

interface CyberStatProps {
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'neutral'
  trendValue?: string
  variant?: 'default' | 'red'
  className?: string
}

export function CyberStat({ label, value, unit, trend, trendValue, variant = 'default', className }: CyberStatProps) {
  const trendColors = {
    up: 'text-green-400',
    down: 'text-secondary',
    neutral: 'text-muted-foreground',
  }

  const trendIcons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  }

  return (
    <CyberCard variant={variant === 'red' ? 'red' : 'default'} className={cn('p-5', className)}>
      <p className="text-xs font-mono font-semibold text-foreground/70 uppercase tracking-widest mb-3">
        {label}
      </p>
      <div className="flex items-baseline gap-1">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            'text-3xl font-mono font-bold',
            variant === 'red' ? 'text-secondary' : 'text-primary'
          )}
          style={{ textShadow: variant === 'red' ? '0 0 12px var(--cyber-red)' : '0 0 12px var(--cyber-yellow)' }}
        >
          {value}
        </motion.span>
        {unit && (
          <span className="text-sm font-mono text-foreground/60">{unit}</span>
        )}
      </div>
      {trend && trendValue && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={cn('flex items-center gap-1 mt-3 text-sm font-mono font-semibold', trendColors[trend])}
        >
          <span>{trendIcons[trend]}</span>
          <span>{trendValue}</span>
        </motion.div>
      )}
    </CyberCard>
  )
}
