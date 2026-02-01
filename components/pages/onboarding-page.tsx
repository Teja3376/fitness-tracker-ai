'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CyberButton, CyberInput, CyberCard, GlitchText, ScanlineOverlay } from '@/components/cyber'
import { useRouter } from 'next/navigation'

type Step = 'basics' | 'body' | 'goals' | 'experience' | 'complete'

const goals = [
  { id: 'lose', label: 'Lose Weight', icon: '↓', desc: 'Burn fat, get lean' },
  { id: 'gain', label: 'Build Muscle', icon: '↑', desc: 'Gain mass, get strong' },
  { id: 'maintain', label: 'Stay Fit', icon: '↔', desc: 'Maintain physique' },
  { id: 'endurance', label: 'Endurance', icon: '∞', desc: 'Improve stamina' },
]

const experienceLevels = [
  { id: 'beginner', label: 'Beginner', desc: 'New to fitness' },
  { id: 'intermediate', label: 'Intermediate', desc: '1-3 years training' },
  { id: 'advanced', label: 'Advanced', desc: '3+ years training' },
]

const activityLevels = [
  { id: 'sedentary', label: 'Sedentary', desc: 'Desk job, little exercise' },
  { id: 'light', label: 'Light', desc: 'Light exercise 1-3 days/week' },
  { id: 'moderate', label: 'Moderate', desc: 'Moderate exercise 3-5 days/week' },
  { id: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
]

export function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('basics')
  const [formData, setFormData] = useState({
    displayName: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
    goal: '',
    experience: '',
    activityLevel: '',
  })

  const steps: Step[] = ['basics', 'body', 'goals', 'experience', 'complete']
  const currentIndex = steps.indexOf(step)
  const progress = ((currentIndex) / (steps.length - 1)) * 100

  const nextStep = () => {
    const nextIndex = currentIndex + 1
    if (nextIndex < steps.length) {
      setStep(steps[nextIndex])
    }
  }

  const prevStep = () => {
    const prevIndex = currentIndex - 1
    if (prevIndex >= 0) {
      setStep(steps[prevIndex])
    }
  }

  const handleComplete = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background cyber-grid-bg flex items-center justify-center p-4">
      <ScanlineOverlay />
      
      <div className="w-full max-w-lg relative z-10">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-xs font-mono text-muted-foreground mb-2">
            <span>INITIALIZATION</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.slice(0, -1).map((s, i) => (
              <motion.div
                key={s}
                className={`w-3 h-3 rounded-full border-2 ${
                  i <= currentIndex ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}
                animate={{ scale: i === currentIndex ? 1.2 : 1 }}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Basics */}
          {step === 'basics' && (
            <motion.div
              key="basics"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <CyberCard className="p-6">
                <GlitchText text="IDENTIFY YOURSELF" as="h2" className="text-2xl mb-2" />
                <p className="text-muted-foreground text-sm mb-6">Let's start with the basics, runner.</p>
                
                <div className="space-y-4">
                  <CyberInput
                    label="Display Name"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="V_Runner"
                  />
                  
                  <CyberInput
                    label="Age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="25"
                  />
                  
                  <div>
                    <label className="block mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      Gender
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Male', 'Female', 'Other'].map((g) => (
                        <motion.button
                          key={g}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setFormData({ ...formData, gender: g.toLowerCase() })}
                          className={`py-3 px-4 font-mono text-sm cyber-clip-sm transition-all ${
                            formData.gender === g.toLowerCase()
                              ? 'bg-primary/20 border-2 border-primary text-primary'
                              : 'bg-muted/30 border-2 border-transparent text-foreground/70 hover:border-primary/50'
                          }`}
                        >
                          {g}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <CyberButton onClick={nextStep} disabled={!formData.displayName || !formData.age}>
                    Continue
                  </CyberButton>
                </div>
              </CyberCard>
            </motion.div>
          )}

          {/* Step 2: Body Metrics */}
          {step === 'body' && (
            <motion.div
              key="body"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <CyberCard className="p-6">
                <GlitchText text="BODY METRICS" as="h2" className="text-2xl mb-2" />
                <p className="text-muted-foreground text-sm mb-6">Calibrating your biological data.</p>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <CyberInput
                      label="Height (cm)"
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                      placeholder="175"
                    />
                    <CyberInput
                      label="Weight (kg)"
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      placeholder="70"
                    />
                  </div>
                  
                  <CyberInput
                    label="Target Weight (kg)"
                    type="number"
                    variant="red"
                    value={formData.targetWeight}
                    onChange={(e) => setFormData({ ...formData, targetWeight: e.target.value })}
                    placeholder="65"
                  />
                  
                  {formData.weight && formData.height && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-muted/30 cyber-clip-sm"
                    >
                      <p className="text-xs font-mono text-muted-foreground mb-1">BMI CALCULATION</p>
                      <p className="text-2xl font-bold text-primary">
                        {(Number(formData.weight) / Math.pow(Number(formData.height) / 100, 2)).toFixed(1)}
                      </p>
                    </motion.div>
                  )}
                </div>

                <div className="mt-8 flex justify-between">
                  <CyberButton variant="ghost" onClick={prevStep}>Back</CyberButton>
                  <CyberButton onClick={nextStep} disabled={!formData.height || !formData.weight}>
                    Continue
                  </CyberButton>
                </div>
              </CyberCard>
            </motion.div>
          )}

          {/* Step 3: Goals */}
          {step === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <CyberCard className="p-6">
                <GlitchText text="SELECT OBJECTIVE" as="h2" className="text-2xl mb-2" />
                <p className="text-muted-foreground text-sm mb-6">What's your primary mission?</p>
                
                <div className="grid grid-cols-2 gap-3">
                  {goals.map((goal) => (
                    <motion.button
                      key={goal.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, goal: goal.id })}
                      className={`p-4 text-left cyber-clip-sm transition-all ${
                        formData.goal === goal.id
                          ? 'bg-primary/20 border-2 border-primary'
                          : 'bg-muted/30 border-2 border-transparent hover:border-primary/50'
                      }`}
                    >
                      <span className="text-2xl">{goal.icon}</span>
                      <p className="font-mono text-sm font-semibold mt-2">{goal.label}</p>
                      <p className="text-xs text-muted-foreground">{goal.desc}</p>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <CyberButton variant="ghost" onClick={prevStep}>Back</CyberButton>
                  <CyberButton onClick={nextStep} disabled={!formData.goal}>
                    Continue
                  </CyberButton>
                </div>
              </CyberCard>
            </motion.div>
          )}

          {/* Step 4: Experience */}
          {step === 'experience' && (
            <motion.div
              key="experience"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <CyberCard className="p-6">
                <GlitchText text="EXPERIENCE LEVEL" as="h2" className="text-2xl mb-2" />
                <p className="text-muted-foreground text-sm mb-6">How enhanced are you?</p>
                
                <div className="space-y-3 mb-6">
                  {experienceLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, experience: level.id })}
                      className={`w-full p-4 text-left cyber-clip-sm transition-all flex justify-between items-center ${
                        formData.experience === level.id
                          ? 'bg-primary/20 border-2 border-primary'
                          : 'bg-muted/30 border-2 border-transparent hover:border-primary/50'
                      }`}
                    >
                      <div>
                        <p className="font-mono text-sm font-semibold">{level.label}</p>
                        <p className="text-xs text-muted-foreground">{level.desc}</p>
                      </div>
                      {formData.experience === level.id && (
                        <motion.div layoutId="check" className="w-4 h-4 bg-primary rounded-full" />
                      )}
                    </motion.button>
                  ))}
                </div>

                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-3">Activity Level</p>
                <div className="space-y-2">
                  {activityLevels.map((level) => (
                    <motion.button
                      key={level.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setFormData({ ...formData, activityLevel: level.id })}
                      className={`w-full p-3 text-left cyber-clip-sm transition-all text-sm ${
                        formData.activityLevel === level.id
                          ? 'bg-secondary/20 border-2 border-secondary text-secondary'
                          : 'bg-muted/30 border-2 border-transparent hover:border-secondary/50'
                      }`}
                    >
                      <span className="font-mono font-semibold">{level.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{level.desc}</span>
                    </motion.button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <CyberButton variant="ghost" onClick={prevStep}>Back</CyberButton>
                  <CyberButton onClick={nextStep} disabled={!formData.experience || !formData.activityLevel}>
                    Complete Setup
                  </CyberButton>
                </div>
              </CyberCard>
            </motion.div>
          )}

          {/* Step 5: Complete */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <CyberCard className="p-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center border-2 border-primary"
                >
                  <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                
                <GlitchText text="INITIALIZATION COMPLETE" as="h2" className="text-2xl mb-2" />
                <p className="text-muted-foreground mb-8">
                  Welcome, <span className="text-primary font-semibold">{formData.displayName}</span>. 
                  Your cyber-body profile is ready.
                </p>
                
                <div className="grid grid-cols-2 gap-4 text-left mb-8">
                  <div className="p-3 bg-muted/30 cyber-clip-sm">
                    <p className="text-xs text-muted-foreground">Goal</p>
                    <p className="font-mono font-semibold text-primary capitalize">{formData.goal?.replace('-', ' ')}</p>
                  </div>
                  <div className="p-3 bg-muted/30 cyber-clip-sm">
                    <p className="text-xs text-muted-foreground">Level</p>
                    <p className="font-mono font-semibold text-secondary capitalize">{formData.experience}</p>
                  </div>
                </div>

                <CyberButton size="lg" className="w-full" onClick={handleComplete}>
                  Enter Dashboard
                </CyberButton>
              </CyberCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
