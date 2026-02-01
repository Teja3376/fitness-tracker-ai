'use client'

import { motion } from 'framer-motion'
import { CyberCard, CyberProgress, GlitchText, FireIcon, WaterIcon, WorkoutIcon, DietIcon } from '@/components/cyber'
import { userStats, workoutPlans, dietPlans } from '@/lib/data'

interface HomeViewProps {
  onNavigate: (tab: string, id?: string) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
  const todayWorkout = workoutPlans[0]
  const todayMeals = dietPlans[0]

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

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Welcome */}
      <motion.div variants={item}>
        <GlitchText text="Good Morning, V" as="h2" className="text-2xl lg:text-3xl font-bold" />
        <p className="text-muted-foreground text-sm mt-1">
          Day {userStats.currentStreak} of your enhancement protocol
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CyberCard className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-primary/30 rounded-sm border border-primary/40">
              <FireIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Calories</p>
              <p className="text-2xl font-mono font-bold text-primary cyber-text-glow">1,842</p>
            </div>
          </div>
          <CyberProgress value={75} max={100} />
        </CyberCard>

        <CyberCard variant="red" className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-secondary/30 rounded-sm border border-secondary/40">
              <WorkoutIcon className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Burned</p>
              <p className="text-2xl font-mono font-bold text-secondary" style={{ textShadow: '0 0 10px var(--cyber-red)' }}>485</p>
            </div>
          </div>
          <CyberProgress value={485} max={600} variant="red" />
        </CyberCard>

        <CyberCard className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-primary/30 rounded-sm border border-primary/40">
              <WaterIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Water</p>
              <p className="text-2xl font-mono font-bold text-primary cyber-text-glow">6/8</p>
            </div>
          </div>
          <CyberProgress value={6} max={8} />
        </CyberCard>

        <CyberCard variant="red" className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-secondary/30 rounded-sm border border-secondary/40">
              <DietIcon className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">Meals</p>
              <p className="text-2xl font-mono font-bold text-secondary" style={{ textShadow: '0 0 10px var(--cyber-red)' }}>3/4</p>
            </div>
          </div>
          <CyberProgress value={3} max={4} variant="red" />
        </CyberCard>
      </motion.div>

      {/* Today's Workout */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Today&apos;s Workout
        </h3>
        <CyberCard 
          className="p-5 cursor-pointer"
          onClick={() => onNavigate('workout-detail', todayWorkout.id)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-mono font-bold text-primary">
                {todayWorkout.name}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {todayWorkout.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <span className="px-3 py-1 bg-muted text-xs font-mono uppercase">
                  {todayWorkout.duration}
                </span>
                <span className="px-3 py-1 bg-muted text-xs font-mono uppercase">
                  {todayWorkout.calories} kcal
                </span>
                <span className="px-3 py-1 bg-secondary/20 text-secondary text-xs font-mono uppercase">
                  {todayWorkout.difficulty}
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center justify-center w-16 h-16 bg-primary/10 rounded-sm">
              <WorkoutIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </CyberCard>
      </motion.div>

      {/* Meals Overview */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Meal Schedule
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {todayMeals.meals.slice(0, 4).map((meal, index) => (
            <CyberCard 
              key={meal.id}
              variant={index % 2 === 0 ? 'default' : 'red'}
              className="p-4 cursor-pointer"
              onClick={() => onNavigate('meal-detail', meal.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-mono">{meal.time}</p>
                  <h4 className="font-mono font-semibold mt-1">{meal.name}</h4>
                </div>
                <div className="text-right">
                  <p className="text-lg font-mono font-bold text-primary">{meal.calories}</p>
                  <p className="text-xs text-muted-foreground">kcal</p>
                </div>
              </div>
            </CyberCard>
          ))}
        </div>
      </motion.div>

      {/* Weekly Progress */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Weekly Goal Progress
        </h3>
        <CyberCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-sm">
              {userStats.weeklyProgress}/{userStats.weeklyGoal} Workouts
            </span>
            <span className="text-primary font-mono font-bold">
              {Math.round((userStats.weeklyProgress / userStats.weeklyGoal) * 100)}%
            </span>
          </div>
          <CyberProgress 
            value={userStats.weeklyProgress} 
            max={userStats.weeklyGoal} 
            showLabel={false}
          />
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div className="flex justify-between mt-2">
            {[true, true, true, true, false, false, false].map((done, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                  done ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {done ? '✓' : '-'}
              </motion.div>
            ))}
          </div>
        </CyberCard>
      </motion.div>
    </motion.div>
  )
}
