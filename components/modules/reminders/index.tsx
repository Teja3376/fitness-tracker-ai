'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Reminder } from '@/lib/types'
import { reminders as initialReminders } from '@/lib/data'
import { GlitchText, CyberCard, CyberButton, PlusIcon } from '@/components/cyber'
import { ReminderItem } from './reminder-item'

export function RemindersModule() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders)

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => 
      r.id === id ? { ...r, enabled: !r.enabled } : r
    ))
  }

  const activeCount = reminders.filter(r => r.enabled).length

  const groupedReminders = {
    workout: reminders.filter(r => r.type === 'workout'),
    meal: reminders.filter(r => r.type === 'meal'),
    other: reminders.filter(r => r.type === 'water' || r.type === 'sleep'),
  }

  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <GlitchText text="Reminders" className="text-xl font-bold text-primary" />
          <p className="text-xs text-muted-foreground mt-1">
            Neural notification system
          </p>
        </div>
        <CyberButton size="sm" variant="ghost">
          <PlusIcon className="w-4 h-4 mr-1" />
          Add
        </CyberButton>
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <CyberCard variant="glow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-mono text-muted-foreground uppercase">Active Protocols</p>
              <p className="text-3xl font-mono font-bold text-primary cyber-text-glow">
                {activeCount}
                <span className="text-sm text-muted-foreground ml-1">/ {reminders.length}</span>
              </p>
            </div>
            <div className="flex gap-2">
              {Object.entries({ W: 'workout', M: 'meal', H: 'water', S: 'sleep' }).map(([icon, type]) => {
                const count = reminders.filter(r => r.type === type && r.enabled).length
                return (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.1 }}
                    className={`w-10 h-10 flex flex-col items-center justify-center cyber-clip-sm ${
                      count > 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold">{icon}</span>
                    <span className="text-[9px]">{count}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </CyberCard>
      </motion.div>

      {/* Workout Reminders */}
      {groupedReminders.workout.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-mono text-secondary uppercase tracking-wider px-1">
            Training Protocols
          </p>
          <AnimatePresence>
            {groupedReminders.workout.map((reminder, index) => (
              <ReminderItem 
                key={reminder.id}
                reminder={reminder}
                index={index}
                onToggle={toggleReminder}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Meal Reminders */}
      {groupedReminders.meal.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-mono text-primary uppercase tracking-wider px-1">
            Nutrition Protocols
          </p>
          <AnimatePresence>
            {groupedReminders.meal.map((reminder, index) => (
              <ReminderItem 
                key={reminder.id}
                reminder={reminder}
                index={index}
                onToggle={toggleReminder}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Other Reminders */}
      {groupedReminders.other.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider px-1">
            System Protocols
          </p>
          <AnimatePresence>
            {groupedReminders.other.map((reminder, index) => (
              <ReminderItem 
                key={reminder.id}
                reminder={reminder}
                index={index}
                onToggle={toggleReminder}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-2 pt-4"
      >
        <CyberButton 
          variant="secondary"
          className="w-full"
          onClick={() => setReminders(prev => prev.map(r => ({ ...r, enabled: true })))}
        >
          Enable All
        </CyberButton>
        <CyberButton 
          variant="ghost"
          className="w-full"
          onClick={() => setReminders(prev => prev.map(r => ({ ...r, enabled: false })))}
        >
          Disable All
        </CyberButton>
      </motion.div>
    </div>
  )
}
