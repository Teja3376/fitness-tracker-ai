'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CyberCard, CyberButton, CyberInput, CyberModal, GlitchText, UserIcon, SettingsIcon, ChevronIcon } from '@/components/cyber'
import { userStats } from '@/lib/data'
import Link from 'next/link'
import { AccountSettingsModal } from '@/components/modals/account-settings-modal'
import { NotificationsModal } from '@/components/modals/notifications-modal'
import { PrivacySecurityModal } from '@/components/modals/privacy-security-modal'
import { HelpSupportModal } from '@/components/modals/help-support-modal'

interface UserProfile {
  name: string
  email: string
  height: string
  weight: string
  age: string
  goal: string
}

export function ProfileView() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false)
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false)
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false)
  
  const [profile, setProfile] = useState<UserProfile>({
    name: 'V_Runner',
    email: 'v.runner@nightcity.net',
    height: '180',
    weight: '75',
    age: '28',
    goal: 'Build Muscle'
  })
  const [editForm, setEditForm] = useState<UserProfile>(profile)

  const handleSaveProfile = () => {
    setProfile(editForm)
    setIsEditModalOpen(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const achievements = [
    { id: 1, name: 'First Workout', description: 'Complete your first workout', unlocked: true },
    { id: 2, name: 'Week Warrior', description: 'Complete 7 day streak', unlocked: true },
    { id: 3, name: 'Iron Will', description: 'Complete 30 day streak', unlocked: false },
    { id: 4, name: 'Calorie Crusher', description: 'Burn 10,000 calories', unlocked: true },
    { id: 5, name: 'Meal Master', description: 'Log 100 meals', unlocked: false },
  ]

  const menuItems = [
    { label: 'Account Settings', icon: SettingsIcon, onClick: () => setIsAccountModalOpen(true) },
    { label: 'Notification Preferences', icon: SettingsIcon, onClick: () => setIsNotificationsModalOpen(true) },
    { label: 'Privacy & Security', icon: SettingsIcon, onClick: () => setIsPrivacyModalOpen(true) },
    { label: 'Help & Support', icon: SettingsIcon, onClick: () => setIsHelpModalOpen(true) },
  ]

  const goals = ['Lose Weight', 'Build Muscle', 'Maintain', 'Increase Endurance']

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <GlitchText text="User Profile" as="h2" className="text-2xl lg:text-3xl font-bold" />
        <p className="text-muted-foreground text-sm mt-1">
          Manage your cyber-body settings
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div variants={item}>
        <CyberCard className="p-6">
          <div className="flex items-center gap-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-20 h-20 bg-primary/20 rounded-sm flex items-center justify-center cyber-border"
            >
              <UserIcon className="w-10 h-10 text-primary" />
            </motion.div>
            <div className="flex-1">
              <h3 className="font-mono text-xl font-bold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-mono rounded-sm">
                  Level 12
                </span>
                <span className="px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-mono rounded-sm">
                  Pro Member
                </span>
              </div>
            </div>
            <CyberButton size="sm" variant="ghost" onClick={() => {
              setEditForm(profile)
              setIsEditModalOpen(true)
            }}>Edit</CyberButton>
          </div>
        </CyberCard>
      </motion.div>

      {/* Body Metrics */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Body Metrics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <CyberCard className="p-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">Height</p>
            <p className="text-2xl font-mono font-bold text-primary">{profile.height}<span className="text-sm ml-1">cm</span></p>
          </CyberCard>
          <CyberCard variant="red" className="p-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">Weight</p>
            <p className="text-2xl font-mono font-bold text-secondary">{profile.weight}<span className="text-sm ml-1">kg</span></p>
          </CyberCard>
          <CyberCard className="p-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">Age</p>
            <p className="text-2xl font-mono font-bold text-primary">{profile.age}<span className="text-sm ml-1">yrs</span></p>
          </CyberCard>
          <CyberCard variant="red" className="p-4">
            <p className="text-xs text-muted-foreground uppercase mb-1">Goal</p>
            <p className="text-lg font-mono font-bold text-secondary">{profile.goal}</p>
          </CyberCard>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Lifetime Stats
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <CyberCard className="p-4 text-center">
            <p className="text-2xl font-mono font-bold text-primary">{userStats.totalWorkouts}</p>
            <p className="text-xs text-muted-foreground uppercase mt-1">Workouts</p>
          </CyberCard>
          <CyberCard variant="red" className="p-4 text-center">
            <p className="text-2xl font-mono font-bold text-secondary">{(userStats.totalCaloriesBurned / 1000).toFixed(1)}K</p>
            <p className="text-xs text-muted-foreground uppercase mt-1">Calories Burned</p>
          </CyberCard>
          <CyberCard className="p-4 text-center">
            <p className="text-2xl font-mono font-bold text-primary">{userStats.currentStreak}</p>
            <p className="text-xs text-muted-foreground uppercase mt-1">Day Streak</p>
          </CyberCard>
          <CyberCard variant="red" className="p-4 text-center">
            <p className="text-2xl font-mono font-bold text-secondary">{Math.abs(userStats.weightChange)}kg</p>
            <p className="text-xs text-muted-foreground uppercase mt-1">Weight Lost</p>
          </CyberCard>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Achievements
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <CyberCard 
                variant={achievement.unlocked ? 'glow' : 'default'}
                className={`p-4 text-center ${!achievement.unlocked && 'opacity-50'}`}
              >
                <div className={`w-12 h-12 mx-auto mb-2 rounded-sm flex items-center justify-center ${
                  achievement.unlocked ? 'bg-primary/20' : 'bg-muted'
                }`}>
                  <span className="text-2xl">{achievement.unlocked ? '★' : '?'}</span>
                </div>
                <p className="font-mono text-xs font-semibold truncate">{achievement.name}</p>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Settings Menu */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Settings
        </h3>
        <div className="space-y-2">
          {menuItems.map((menuItem, index) => (
            <motion.div
              key={menuItem.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <CyberCard className="p-4 cursor-pointer group" onClick={menuItem.onClick}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <menuItem.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-mono text-sm group-hover:text-primary transition-colors">{menuItem.label}</span>
                  </div>
                  <ChevronIcon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div variants={item}>
        <Link href="/">
          <CyberButton variant="secondary" size="lg" className="w-full">
            Logout
          </CyberButton>
        </Link>
      </motion.div>

      {/* Edit Profile Modal */}
      <CyberModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title="Edit Profile"
      >
        <div className="space-y-5">
          <CyberInput
            label="Display Name"
            value={editForm.name}
            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
          />
          <CyberInput
            label="Email"
            type="email"
            value={editForm.email}
            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
          />
          <div className="grid grid-cols-3 gap-4">
            <CyberInput
              label="Height (cm)"
              type="number"
              value={editForm.height}
              onChange={(e) => setEditForm(prev => ({ ...prev, height: e.target.value }))}
            />
            <CyberInput
              label="Weight (kg)"
              type="number"
              variant="red"
              value={editForm.weight}
              onChange={(e) => setEditForm(prev => ({ ...prev, weight: e.target.value }))}
            />
            <CyberInput
              label="Age"
              type="number"
              value={editForm.age}
              onChange={(e) => setEditForm(prev => ({ ...prev, age: e.target.value }))}
            />
          </div>
          
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              Fitness Goal
            </label>
            <div className="grid grid-cols-2 gap-2">
              {goals.map((goal) => (
                <motion.button
                  key={goal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEditForm(prev => ({ ...prev, goal }))}
                  className={`py-2.5 px-3 font-mono text-xs uppercase tracking-wider rounded-sm transition-all ${
                    editForm.goal === goal
                      ? 'bg-primary text-primary-foreground cyber-border' 
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {goal}
                </motion.button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <CyberButton 
              variant="ghost" 
              onClick={() => setIsEditModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </CyberButton>
            <CyberButton 
              onClick={handleSaveProfile}
              className="flex-1"
            >
              Save Changes
            </CyberButton>
          </div>
        </div>
      </CyberModal>

      {/* Account Settings Modal */}
      <AccountSettingsModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        currentEmail={profile.email}
        onUpdateEmail={(email) => setProfile(prev => ({ ...prev, email }))}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsModalOpen}
        onClose={() => setIsNotificationsModalOpen(false)}
      />

      {/* Privacy & Security Modal */}
      <PrivacySecurityModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Help & Support Modal */}
      <HelpSupportModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </motion.div>
  )
}
