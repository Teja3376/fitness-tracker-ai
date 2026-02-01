'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { TabId } from '@/lib/types'
import { ScanlineOverlay } from '@/components/cyber'
import { Header } from '@/components/navigation/header'
import { BottomNav } from '@/components/navigation/bottom-nav'
import { WorkoutModule } from '@/components/modules/workout'
import { DietModule } from '@/components/modules/diet'
import { ProgressModule } from '@/components/modules/progress'
import { RemindersModule } from '@/components/modules/reminders'

const modules = {
  workout: WorkoutModule,
  diet: DietModule,
  progress: ProgressModule,
  reminders: RemindersModule,
}

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>('workout')

  const ActiveModule = modules[activeTab]

  return (
    <div className="min-h-screen bg-background cyber-grid-bg relative overflow-hidden">
      <ScanlineOverlay />
      
      <Header />
      
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <ActiveModule />
          </motion.div>
        </AnimatePresence>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}
