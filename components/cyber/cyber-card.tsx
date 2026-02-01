'use client'

import React from "react"

import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CyberCardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'red' | 'glow'
  children: React.ReactNode
}

export function CyberCard({ variant = 'default', className, children, ...props }: CyberCardProps) {
  const variants = {
    default: 'cyber-border',
    red: 'cyber-border-red',
    glow: 'cyber-border animate-[neon-pulse_2s_ease-in-out_infinite]',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'relative bg-card backdrop-blur-sm cyber-clip p-4 overflow-hidden',
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
