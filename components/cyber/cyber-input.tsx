'use client'

import React from "react"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface CyberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  variant?: 'yellow' | 'red'
}

export function CyberInput({ 
  label, 
  variant = 'yellow', 
  className, 
  type = 'text',
  value,
  ...props 
}: CyberInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  
  const borderColor = variant === 'yellow' 
    ? 'border-primary/50 focus-within:border-primary' 
    : 'border-secondary/50 focus-within:border-secondary'
  
  const glowColor = variant === 'yellow'
    ? 'shadow-[0_0_20px_rgba(252,233,79,0.3)]'
    : 'shadow-[0_0_20px_rgba(255,0,60,0.3)]'

  const labelColor = variant === 'yellow'
    ? 'text-primary'
    : 'text-secondary'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="relative"
    >
      {/* Label always positioned above */}
      <label
        className={cn(
          'block mb-2 font-mono text-xs uppercase tracking-widest',
          isFocused ? labelColor : 'text-muted-foreground'
        )}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'w-full bg-card/80 border-2 px-4 py-3 font-sans text-foreground text-base',
            'cyber-clip-sm outline-none transition-all duration-300',
            borderColor,
            isFocused && glowColor,
            className
          )}
          {...props}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isFocused ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'absolute bottom-0 left-0 right-0 h-[2px] origin-left',
            variant === 'yellow' ? 'bg-primary' : 'bg-secondary'
          )}
        />
      </div>
    </motion.div>
  )
}
