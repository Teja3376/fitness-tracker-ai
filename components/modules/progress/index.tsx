'use client'

import { motion } from 'framer-motion'
import { progressData, userStats } from '@/lib/data'
import { GlitchText, CyberCard, CyberStat, CyberProgress, FireIcon } from '@/components/cyber'
import { ProgressChart } from './progress-chart'

export function ProgressModule() {
  return (
    <div className="p-4 pb-24 space-y-4">
      <div className="mb-6">
        <GlitchText text="Progress Matrix" className="text-xl font-bold text-primary" />
        <p className="text-xs text-muted-foreground mt-1">
          Bio-metric enhancement tracking
        </p>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-4 gap-2"
      >
        <CyberCard className="col-span-1">
          <CyberStat 
            label="Streak" 
            value={userStats.currentStreak} 
            unit="days"
          />
        </CyberCard>
        <CyberCard className="col-span-1">
          <CyberStat 
            label="Workouts" 
            value={userStats.totalWorkouts}
          />
        </CyberCard>
        <CyberCard className="col-span-1">
          <CyberStat 
            label="Burned" 
            value={`${(userStats.totalCaloriesBurned / 1000).toFixed(1)}k`}
          />
        </CyberCard>
        <CyberCard className="col-span-1">
          <CyberStat 
            label="Weight" 
            value={userStats.weightChange > 0 ? `+${userStats.weightChange}` : userStats.weightChange}
            unit="kg"
            trend={userStats.weightChange < 0 ? 'up' : 'down'}
          />
        </CyberCard>
      </motion.div>

      {/* Weekly Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CyberCard variant="glow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FireIcon className="w-5 h-5 text-secondary" />
              <span className="text-sm font-mono font-semibold text-foreground">Weekly Goal</span>
            </div>
            <span className="text-sm font-mono text-primary">
              {userStats.weeklyProgress}/{userStats.weeklyGoal} workouts
            </span>
          </div>
          <CyberProgress 
            value={userStats.weeklyProgress} 
            max={userStats.weeklyGoal}
            variant="red"
          />
          <div className="flex justify-between mt-3">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <motion.div
                key={`${day}-${i}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className={`w-8 h-8 flex items-center justify-center text-xs font-mono cyber-clip-sm ${
                  i < userStats.weeklyProgress 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {day}
              </motion.div>
            ))}
          </div>
        </CyberCard>
      </motion.div>

      {/* Charts */}
      <div className="space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ProgressChart 
            data={progressData} 
            dataKey="weight" 
            label="Weight Trend" 
            color="yellow"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <ProgressChart 
            data={progressData} 
            dataKey="caloriesBurned" 
            label="Calories Burned" 
            color="red"
          />
        </motion.div>
      </div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <CyberCard>
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-3">
            Recent Activity Log
          </p>
          <div className="space-y-2">
            {progressData.slice(-5).reverse().map((entry, i) => (
              <motion.div
                key={entry.date}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center justify-between py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="text-xs font-mono text-foreground">
                    {new Date(entry.date).toLocaleDateString('en', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {entry.caloriesBurned > 0 ? `${entry.caloriesBurned} cal burned` : 'Rest day'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono text-primary">{entry.weight} kg</p>
                  {entry.bodyFat && (
                    <p className="text-[10px] text-muted-foreground">{entry.bodyFat}% BF</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </CyberCard>
      </motion.div>
    </div>
  )
}
