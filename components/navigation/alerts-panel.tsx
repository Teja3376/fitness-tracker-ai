'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CyberCard, CyberButton, GlitchText, AlertIcon, CloseIcon, TrashIcon, CheckIcon } from '@/components/cyber'
import { cn } from '@/lib/utils'

export interface Alert {
  id: string
  type: 'workout' | 'meal' | 'hydration' | 'achievement' | 'system'
  title: string
  message: string
  time: string
  read: boolean
}

const initialAlerts: Alert[] = [
  {
    id: '1',
    type: 'workout',
    title: 'Workout Reminder',
    message: 'Time for your Neural Strength Protocol session',
    time: '5 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'hydration',
    title: 'Hydration Alert',
    message: 'Drink water to maintain optimal performance',
    time: '15 min ago',
    read: false,
  },
  {
    id: '3',
    type: 'achievement',
    title: 'Achievement Unlocked',
    message: 'You completed 7-day streak! +500 XP earned',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '4',
    type: 'meal',
    title: 'Meal Time',
    message: 'Lunch scheduled: Power Protein Bowl',
    time: '2 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'system',
    title: 'System Update',
    message: 'New workout protocols available in the database',
    time: '1 day ago',
    read: true,
  },
]

interface AlertsPanelProps {
  isOpen: boolean
  onClose: () => void
  isMobile?: boolean
}

export function AlertsPanel({ isOpen, onClose, isMobile = false }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts)

  const unreadCount = alerts.filter(a => !a.read).length

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a))
  }

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })))
  }

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  const clearAll = () => {
    setAlerts([])
  }

  const getTypeColor = (type: Alert['type']) => {
    switch (type) {
      case 'workout': return 'bg-primary/20 text-primary border-primary/40'
      case 'meal': return 'bg-green-500/20 text-green-400 border-green-500/40'
      case 'hydration': return 'bg-blue-500/20 text-blue-400 border-blue-500/40'
      case 'achievement': return 'bg-secondary/20 text-secondary border-secondary/40'
      case 'system': return 'bg-muted text-muted-foreground border-border'
    }
  }

  const getTypeLabel = (type: Alert['type']) => {
    switch (type) {
      case 'workout': return 'WRK'
      case 'meal': return 'MEAL'
      case 'hydration': return 'H2O'
      case 'achievement': return 'ACH'
      case 'system': return 'SYS'
    }
  }

  const panelVariants = {
    hidden: isMobile 
      ? { y: '100%', opacity: 0 }
      : { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', damping: 25, stiffness: 300 }
    },
    exit: isMobile 
      ? { y: '100%', opacity: 0, transition: { duration: 0.2 } }
      : { x: '100%', opacity: 0, transition: { duration: 0.2 } }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              'fixed z-50 bg-card border-border overflow-hidden flex flex-col',
              isMobile 
                ? 'inset-x-0 bottom-0 h-[80vh] rounded-t-2xl border-t-2 border-x-0 border-primary/40'
                : 'top-0 right-0 h-full w-full max-w-md border-l-2 border-primary/40'
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <AlertIcon className="w-6 h-6 text-primary" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary text-[10px] font-bold flex items-center justify-center rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </div>
                <GlitchText text="ALERTS" as="h2" className="text-lg font-bold" />
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-sm transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </motion.button>
            </div>

            {alerts.length > 0 && (
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
                <CyberButton size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Mark All Read
                </CyberButton>
                <CyberButton size="sm" variant="secondary" onClick={clearAll}>
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Clear All
                </CyberButton>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {alerts.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-12"
                  >
                    <AlertIcon className="w-16 h-16 text-muted-foreground/30 mb-4" />
                    <p className="font-mono text-sm text-muted-foreground">No alerts</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">You are all caught up</p>
                  </motion.div>
                ) : (
                  alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100, scale: 0.9 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CyberCard 
                        className={cn(
                          'p-4 cursor-pointer transition-all duration-200 relative',
                          !alert.read && 'border-l-4 border-l-primary'
                        )}
                        onClick={() => markAsRead(alert.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'px-2 py-1 text-[10px] font-mono font-bold rounded-sm border',
                            getTypeColor(alert.type)
                          )}>
                            {getTypeLabel(alert.type)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className={cn(
                                'font-mono text-sm truncate',
                                !alert.read ? 'text-foreground font-semibold' : 'text-foreground/70'
                              )}>
                                {alert.title}
                              </h3>
                              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                                {alert.time}
                              </span>
                            </div>
                            <p className={cn(
                              'text-xs mt-1 line-clamp-2',
                              !alert.read ? 'text-foreground/80' : 'text-muted-foreground'
                            )}>
                              {alert.message}
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteAlert(alert.id)
                            }}
                            className="p-1 hover:bg-secondary/20 rounded-sm transition-colors text-muted-foreground hover:text-secondary"
                          >
                            <CloseIcon className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {!alert.read && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"
                          />
                        )}
                      </CyberCard>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="p-4 border-t border-border bg-muted/20">
              <p className="text-[10px] text-center text-muted-foreground font-mono uppercase tracking-wider">
                Neural Link Active - Real-time Sync Enabled
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
