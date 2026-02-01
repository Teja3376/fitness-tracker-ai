'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberModal } from '@/components/cyber/cyber-modal'
import { CyberButton } from '@/components/cyber/cyber-button'
import { CyberCard } from '@/components/cyber/cyber-card'

interface NotificationSetting {
  id: string
  label: string
  description: string
  enabled: boolean
}

interface NotificationsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [settings, setSettings] = useState<NotificationSetting[]>([
    { id: 'workout', label: 'Workout Reminders', description: 'Get notified when its time to workout', enabled: true },
    { id: 'meal', label: 'Meal Reminders', description: 'Reminders to log your meals', enabled: true },
    { id: 'water', label: 'Hydration Alerts', description: 'Stay hydrated with water reminders', enabled: false },
    { id: 'progress', label: 'Weekly Progress', description: 'Weekly summary of your progress', enabled: true },
    { id: 'achievements', label: 'Achievement Unlocked', description: 'Notifications for new achievements', enabled: true },
    { id: 'tips', label: 'Health Tips', description: 'Daily health and fitness tips', enabled: false },
    { id: 'social', label: 'Community Updates', description: 'Updates from the CyberFit community', enabled: false },
  ])

  const [quietHours, setQuietHours] = useState({ enabled: false, start: '22:00', end: '07:00' })
  const [saved, setSaved] = useState(false)

  const toggleSetting = (id: string) => {
    setSettings(prev => prev.map(s => s.id === id ? { ...s, enabled: !s.enabled } : s))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1500)
  }

  return (
    <CyberModal isOpen={isOpen} onClose={onClose} title="Notifications">
      <div className="space-y-6">
        {/* Notification Toggles */}
        <div className="space-y-3">
          {settings.map((setting, index) => (
            <motion.div
              key={setting.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CyberCard className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <p className="font-mono text-sm font-semibold text-foreground">{setting.label}</p>
                    <p className="text-xs text-foreground/60">{setting.description}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSetting(setting.id)}
                    className={`relative w-14 h-7 rounded-sm transition-colors duration-300 ${
                      setting.enabled ? 'bg-primary/30' : 'bg-muted'
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{ x: setting.enabled ? 28 : 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`absolute top-1 w-5 h-5 rounded-sm transition-colors ${
                        setting.enabled ? 'bg-primary shadow-[0_0_10px_var(--cyber-yellow)]' : 'bg-muted-foreground'
                      }`}
                    />
                  </motion.button>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>

        {/* Quiet Hours */}
        <div className="pt-2">
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">
            Quiet Hours
          </h4>
          <CyberCard variant={quietHours.enabled ? 'glow' : 'default'} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-sm font-semibold text-foreground">Enable Quiet Hours</p>
                <p className="text-xs text-foreground/60">Pause all notifications during set hours</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuietHours(prev => ({ ...prev, enabled: !prev.enabled }))}
                className={`relative w-14 h-7 rounded-sm transition-colors duration-300 ${
                  quietHours.enabled ? 'bg-primary/30' : 'bg-muted'
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{ x: quietHours.enabled ? 28 : 4 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`absolute top-1 w-5 h-5 rounded-sm transition-colors ${
                    quietHours.enabled ? 'bg-primary shadow-[0_0_10px_var(--cyber-yellow)]' : 'bg-muted-foreground'
                  }`}
                />
              </motion.button>
            </div>
            
            {quietHours.enabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-2 gap-4 pt-4 border-t border-border"
              >
                <div>
                  <label className="text-xs text-foreground/60 font-mono uppercase mb-2 block">Start Time</label>
                  <input
                    type="time"
                    value={quietHours.start}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full bg-muted/50 border border-border px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs text-foreground/60 font-mono uppercase mb-2 block">End Time</label>
                  <input
                    type="time"
                    value={quietHours.end}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full bg-muted/50 border border-border px-3 py-2 font-mono text-sm rounded-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </motion.div>
            )}
          </CyberCard>
        </div>

        {/* Save Button */}
        <CyberButton onClick={handleSave} className="w-full">
          {saved ? 'Saved!' : 'Save Preferences'}
        </CyberButton>
      </div>
    </CyberModal>
  )
}
