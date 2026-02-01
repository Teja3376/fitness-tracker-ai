'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlitchTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

export function GlitchText({ text, className, as: Component = 'span' }: GlitchTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative inline-block"
    >
      <Component 
        className={cn('relative font-mono uppercase tracking-wider cyber-text-glow', className)}
      >
        {text}
      </Component>
      <Component
        className={cn(
          'absolute top-0 left-0 font-mono uppercase tracking-wider text-secondary opacity-70',
          className
        )}
        style={{
          clipPath: 'inset(0 0 50% 0)',
          transform: 'translate(-2px, 0)',
        }}
        aria-hidden="true"
      >
        {text}
      </Component>
      <Component
        className={cn(
          'absolute top-0 left-0 font-mono uppercase tracking-wider text-primary opacity-70',
          className
        )}
        style={{
          clipPath: 'inset(50% 0 0 0)',
          transform: 'translate(2px, 0)',
        }}
        aria-hidden="true"
      >
        {text}
      </Component>
    </motion.div>
  )
}
