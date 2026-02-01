'use client'

import React from "react"

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CyberButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function CyberButton({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: CyberButtonProps) {
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 cyber-border',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90 cyber-border-red',
    ghost: 'bg-transparent text-foreground hover:bg-muted border border-border',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--cyber-yellow)' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className={cn(
        'relative font-mono font-semibold uppercase tracking-wider cyber-clip-sm flex items-center gap-2',
        'transition-colors duration-200',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
}
