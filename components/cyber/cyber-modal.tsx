'use client'

import React from "react"

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { CyberButton } from './cyber-button'

interface CyberModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function CyberModal({ isOpen, onClose, title, children, className }: CyberModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg z-50"
          >
            <div className={cn(
              'bg-card/95 cyber-border cyber-clip p-6 max-h-[80vh] overflow-y-auto no-scrollbar',
              className
            )}>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-mono text-xl font-bold text-primary uppercase tracking-wider">
                  {title}
                </h2>
                <CyberButton 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClose}
                  className="!p-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </CyberButton>
              </div>
              
              {/* Content */}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
