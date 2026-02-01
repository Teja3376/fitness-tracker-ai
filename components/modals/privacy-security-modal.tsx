'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberModal } from '@/components/cyber/cyber-modal'
import { CyberButton } from '@/components/cyber/cyber-button'
import { CyberCard } from '@/components/cyber/cyber-card'

interface PrivacySecurityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PrivacySecurityModal({ isOpen, onClose }: PrivacySecurityModalProps) {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'friends',
    showProgress: true,
    showWorkouts: true,
    shareAnalytics: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    biometric: true,
    sessionTimeout: '30',
    loginAlerts: true,
  })

  const [activeSection, setActiveSection] = useState<'privacy' | 'security' | 'data'>('privacy')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      onClose()
    }, 1500)
  }

  const handleExportData = () => {
    const data = {
      profile: { name: 'V_Runner', email: 'v.runner@nightcity.net' },
      stats: { workouts: 47, caloriesBurned: 23500 },
      exportDate: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'cyberfit-data-export.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const sections = [
    { id: 'privacy' as const, label: 'Privacy' },
    { id: 'security' as const, label: 'Security' },
    { id: 'data' as const, label: 'Data' },
  ]

  return (
    <CyberModal isOpen={isOpen} onClose={onClose} title="Privacy & Security">
      <div className="space-y-6">
        {/* Section Tabs */}
        <div className="flex gap-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveSection(section.id)}
              className={`flex-1 py-2.5 px-3 font-mono text-xs uppercase tracking-wider rounded-sm transition-all ${
                activeSection === section.id
                  ? 'bg-primary text-primary-foreground cyber-border'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {section.label}
            </motion.button>
          ))}
        </div>

        {/* Privacy Section */}
        {activeSection === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Profile Visibility */}
            <CyberCard className="p-4">
              <p className="font-mono text-sm font-semibold text-foreground mb-3">Profile Visibility</p>
              <div className="grid grid-cols-3 gap-2">
                {['public', 'friends', 'private'].map((option) => (
                  <motion.button
                    key={option}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPrivacySettings(prev => ({ ...prev, profileVisibility: option }))}
                    className={`py-2 px-3 font-mono text-xs uppercase rounded-sm transition-all ${
                      privacySettings.profileVisibility === option
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </CyberCard>

            {/* Toggle Settings */}
            {[
              { key: 'showProgress', label: 'Show Progress to Others', desc: 'Allow others to see your fitness progress' },
              { key: 'showWorkouts', label: 'Share Workout Activity', desc: 'Display your workout sessions publicly' },
              { key: 'shareAnalytics', label: 'Share Analytics Data', desc: 'Help improve CyberFit with anonymous data' },
            ].map((item) => (
              <CyberCard key={item.key} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <p className="font-mono text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-xs text-foreground/60">{item.desc}</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPrivacySettings(prev => ({ 
                      ...prev, 
                      [item.key]: !prev[item.key as keyof typeof prev] 
                    }))}
                    className={`relative w-14 h-7 rounded-sm transition-colors duration-300 ${
                      privacySettings[item.key as keyof typeof privacySettings] ? 'bg-primary/30' : 'bg-muted'
                    }`}
                  >
                    <motion.div
                      initial={false}
                      animate={{ x: privacySettings[item.key as keyof typeof privacySettings] ? 28 : 4 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className={`absolute top-1 w-5 h-5 rounded-sm transition-colors ${
                        privacySettings[item.key as keyof typeof privacySettings] 
                          ? 'bg-primary shadow-[0_0_10px_var(--cyber-yellow)]' 
                          : 'bg-muted-foreground'
                      }`}
                    />
                  </motion.button>
                </div>
              </CyberCard>
            ))}
          </motion.div>
        )}

        {/* Security Section */}
        {activeSection === 'security' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Two Factor */}
            <CyberCard variant={securitySettings.twoFactor ? 'glow' : 'default'} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="font-mono text-sm font-semibold text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-foreground/60">Add an extra layer of security</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSecuritySettings(prev => ({ ...prev, twoFactor: !prev.twoFactor }))}
                  className={`relative w-14 h-7 rounded-sm transition-colors duration-300 ${
                    securitySettings.twoFactor ? 'bg-primary/30' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: securitySettings.twoFactor ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-1 w-5 h-5 rounded-sm transition-colors ${
                      securitySettings.twoFactor ? 'bg-primary shadow-[0_0_10px_var(--cyber-yellow)]' : 'bg-muted-foreground'
                    }`}
                  />
                </motion.button>
              </div>
              {securitySettings.twoFactor && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-border"
                >
                  <CyberButton size="sm" className="w-full">
                    Configure 2FA
                  </CyberButton>
                </motion.div>
              )}
            </CyberCard>

            {/* Biometric */}
            <CyberCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="font-mono text-sm font-semibold text-foreground">Biometric Login</p>
                  <p className="text-xs text-foreground/60">Use fingerprint or face recognition</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSecuritySettings(prev => ({ ...prev, biometric: !prev.biometric }))}
                  className={`relative w-14 h-7 rounded-sm transition-colors duration-300 ${
                    securitySettings.biometric ? 'bg-primary/30' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: securitySettings.biometric ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-1 w-5 h-5 rounded-sm transition-colors ${
                      securitySettings.biometric ? 'bg-primary shadow-[0_0_10px_var(--cyber-yellow)]' : 'bg-muted-foreground'
                    }`}
                  />
                </motion.button>
              </div>
            </CyberCard>

            {/* Session Timeout */}
            <CyberCard className="p-4">
              <p className="font-mono text-sm font-semibold text-foreground mb-3">Session Timeout</p>
              <div className="grid grid-cols-4 gap-2">
                {['15', '30', '60', 'never'].map((option) => (
                  <motion.button
                    key={option}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSecuritySettings(prev => ({ ...prev, sessionTimeout: option }))}
                    className={`py-2 px-2 font-mono text-xs rounded-sm transition-all ${
                      securitySettings.sessionTimeout === option
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                    }`}
                  >
                    {option === 'never' ? 'Never' : `${option}m`}
                  </motion.button>
                ))}
              </div>
            </CyberCard>

            {/* Login Alerts */}
            <CyberCard className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 pr-4">
                  <p className="font-mono text-sm font-semibold text-foreground">Login Alerts</p>
                  <p className="text-xs text-foreground/60">Get notified of new login attempts</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSecuritySettings(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                  className={`relative w-14 h-7 rounded-sm transition-colors duration-300 ${
                    securitySettings.loginAlerts ? 'bg-primary/30' : 'bg-muted'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{ x: securitySettings.loginAlerts ? 28 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className={`absolute top-1 w-5 h-5 rounded-sm transition-colors ${
                      securitySettings.loginAlerts ? 'bg-primary shadow-[0_0_10px_var(--cyber-yellow)]' : 'bg-muted-foreground'
                    }`}
                  />
                </motion.button>
              </div>
            </CyberCard>
          </motion.div>
        )}

        {/* Data Section */}
        {activeSection === 'data' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <CyberCard className="p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-2">Export Your Data</h4>
              <p className="text-xs text-foreground/60 mb-4">
                Download a copy of all your CyberFit data including workouts, meals, and progress history.
              </p>
              <CyberButton size="sm" onClick={handleExportData} className="w-full">
                Download Data Export
              </CyberButton>
            </CyberCard>

            <CyberCard className="p-4">
              <h4 className="font-mono text-sm font-semibold text-foreground mb-2">Clear Workout History</h4>
              <p className="text-xs text-foreground/60 mb-4">
                Remove all past workout data while keeping your account and settings.
              </p>
              <CyberButton size="sm" variant="ghost" className="w-full">
                Clear History
              </CyberButton>
            </CyberCard>

            <CyberCard variant="red" className="p-4">
              <h4 className="font-mono text-sm font-semibold text-secondary mb-2">Data Retention</h4>
              <p className="text-xs text-foreground/60">
                Your data is stored securely on Night City servers. We retain your information for as long as your account is active. 
                Deleted data may be kept in backups for up to 30 days.
              </p>
            </CyberCard>
          </motion.div>
        )}

        {/* Save Button */}
        <CyberButton onClick={handleSave} className="w-full">
          {saved ? 'Settings Saved!' : 'Save Settings'}
        </CyberButton>
      </div>
    </CyberModal>
  )
}
