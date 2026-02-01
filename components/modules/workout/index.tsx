'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { WorkoutPlan } from '@/lib/types'
import { workoutPlans } from '@/lib/data'
import { GlitchText, CyberButton, PlusIcon } from '@/components/cyber'
import { WorkoutCard } from './workout-card'
import { WorkoutDetail } from './workout-detail'

export function WorkoutModule() {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null)

  return (
    <div className="p-4 pb-24">
      <AnimatePresence mode="wait">
        {selectedPlan ? (
          <WorkoutDetail 
            key="detail"
            plan={selectedPlan} 
            onBack={() => setSelectedPlan(null)} 
          />
        ) : (
          <div key="list" className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <GlitchText text="Workout Plans" className="text-xl font-bold text-primary" />
                <p className="text-xs text-muted-foreground mt-1">
                  Select protocol to initiate
                </p>
              </div>
              <CyberButton size="sm" variant="ghost">
                <PlusIcon className="w-4 h-4 mr-1" />
                Custom
              </CyberButton>
            </div>

            <div className="space-y-3">
              {workoutPlans.map((plan, index) => (
                <WorkoutCard 
                  key={plan.id} 
                  plan={plan} 
                  index={index}
                  onSelect={setSelectedPlan} 
                />
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
