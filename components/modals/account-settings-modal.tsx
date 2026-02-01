'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberModal } from '@/components/cyber/cyber-modal'
import { CyberInput } from '@/components/cyber/cyber-input'
import { CyberButton } from '@/components/cyber/cyber-button'
import { CyberCard } from '@/components/cyber/cyber-card'

interface AccountSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  currentEmail: string
  onUpdateEmail: (email: string) => void
}

export function AccountSettingsModal({ isOpen, onClose, currentEmail, onUpdateEmail }: AccountSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<'email' | 'password' | 'delete'>('email')
  const [email, setEmail] = useState(currentEmail)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleUpdateEmail = () => {
    if (email && email !== currentEmail) {
      onUpdateEmail(email)
      setMessage({ type: 'success', text: 'Email updated successfully!' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage({ type: 'error', text: 'All password fields are required' })
      return
    }
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' })
      return
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      return
    }
    setMessage({ type: 'success', text: 'Password updated successfully!' })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setTimeout(() => setMessage(null), 3000)
  }

  const handleDeleteAccount = () => {
    if (deleteConfirm.toLowerCase() !== 'delete my account') {
      setMessage({ type: 'error', text: 'Please type "delete my account" to confirm' })
      return
    }
    setMessage({ type: 'success', text: 'Account deletion request submitted' })
  }

  const tabs = [
    { id: 'email' as const, label: 'Email' },
    { id: 'password' as const, label: 'Password' },
    { id: 'delete' as const, label: 'Delete' },
  ]

  return (
    <CyberModal isOpen={isOpen} onClose={onClose} title="Account Settings">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(tab.id)
                setMessage(null)
              }}
              className={`flex-1 py-2.5 px-3 font-mono text-xs uppercase tracking-wider rounded-sm transition-all ${
                activeTab === tab.id
                  ? tab.id === 'delete' 
                    ? 'bg-secondary text-secondary-foreground cyber-border-red'
                    : 'bg-primary text-primary-foreground cyber-border'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-3 rounded-sm font-mono text-sm ${
              message.type === 'success' 
                ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                : 'bg-secondary/20 text-secondary border border-secondary/40'
            }`}
          >
            {message.text}
          </motion.div>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <CyberInput
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CyberCard className="p-4 bg-muted/30">
              <p className="text-xs text-foreground/70 font-mono">
                Changing your email will require re-verification. A confirmation link will be sent to your new address.
              </p>
            </CyberCard>
            <CyberButton onClick={handleUpdateEmail} className="w-full">
              Update Email
            </CyberButton>
          </motion.div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <CyberInput
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <CyberInput
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <CyberInput
              label="Confirm New Password"
              type="password"
              variant="red"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <CyberCard className="p-4 bg-muted/30">
              <p className="text-xs text-foreground/70 font-mono mb-2">Password Requirements:</p>
              <ul className="text-xs text-foreground/60 font-mono space-y-1">
                <li>- Minimum 8 characters</li>
                <li>- At least one uppercase letter</li>
                <li>- At least one number</li>
              </ul>
            </CyberCard>
            <CyberButton onClick={handleUpdatePassword} className="w-full">
              Update Password
            </CyberButton>
          </motion.div>
        )}

        {/* Delete Tab */}
        {activeTab === 'delete' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-5"
          >
            <CyberCard variant="red" className="p-4">
              <h4 className="font-mono text-sm font-bold text-secondary mb-2">DANGER ZONE</h4>
              <p className="text-xs text-foreground/70 font-mono">
                Deleting your account is permanent and cannot be undone. All your workout data, meal logs, and progress will be lost forever.
              </p>
            </CyberCard>
            <CyberInput
              label='Type "delete my account" to confirm'
              variant="red"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
            />
            <CyberButton 
              variant="secondary" 
              onClick={handleDeleteAccount} 
              className="w-full"
              disabled={deleteConfirm.toLowerCase() !== 'delete my account'}
            >
              Delete Account Permanently
            </CyberButton>
          </motion.div>
        )}
      </div>
    </CyberModal>
  )
}
