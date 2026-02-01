'use client'

import { motion } from 'framer-motion'
import { CyberCard, CyberStat, GlitchText } from '@/components/cyber'
import { progressData, userStats } from '@/lib/data'

export function ProgressView() {
  const latestProgress = progressData[progressData.length - 1]
  const earliestProgress = progressData[0]
  const weightChange = latestProgress.weight - earliestProgress.weight

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

  // Calculate max values for chart scaling
  const maxWeight = Math.max(...progressData.map(d => d.weight))
  const minWeight = Math.min(...progressData.map(d => d.weight))
  const maxCalories = Math.max(...progressData.map(d => d.caloriesBurned))

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <GlitchText text="Analytics Hub" as="h2" className="text-2xl lg:text-3xl font-bold" />
        <p className="text-muted-foreground text-sm mt-1">
          Monitor your bio-enhancement progress
        </p>
      </motion.div>

      {/* Key Stats */}
      <motion.div variants={item} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <CyberStat 
          label="Current Weight" 
          value={`${latestProgress.weight}kg`}
          trend={weightChange < 0 ? 'down' : 'up'}
          trendValue={`${Math.abs(weightChange).toFixed(1)}kg`}
        />
        <CyberStat 
          label="Body Fat" 
          value={`${latestProgress.bodyFat}%`}
          trend="down"
          trendValue="1.5%"
          variant="red"
        />
        <CyberStat 
          label="Streak" 
          value={`${userStats.currentStreak} days`}
        />
        <CyberStat 
          label="Total Workouts" 
          value={userStats.totalWorkouts.toString()}
          variant="red"
        />
      </motion.div>

      {/* Weight Chart */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Weight Trend
        </h3>
        <CyberCard className="p-5">
          <div className="h-48 relative">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-muted-foreground font-mono">
              <span>{maxWeight}kg</span>
              <span>{((maxWeight + minWeight) / 2).toFixed(1)}kg</span>
              <span>{minWeight}kg</span>
            </div>
            
            {/* Chart area */}
            <div className="ml-14 h-40 relative">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-full h-px bg-border" />
                ))}
              </div>
              
              {/* Line chart */}
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--cyber-yellow)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--cyber-yellow)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Area fill */}
                <motion.path
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  d={`
                    M 0 ${((maxWeight - progressData[0].weight) / (maxWeight - minWeight)) * 100}%
                    ${progressData.map((d, i) => {
                      const x = (i / (progressData.length - 1)) * 100
                      const y = ((maxWeight - d.weight) / (maxWeight - minWeight)) * 100
                      return `L ${x}% ${y}%`
                    }).join(' ')}
                    L 100% 100%
                    L 0 100%
                    Z
                  `}
                  fill="url(#weightGradient)"
                />
                
                {/* Line */}
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  d={`
                    M 0 ${((maxWeight - progressData[0].weight) / (maxWeight - minWeight)) * 100}%
                    ${progressData.map((d, i) => {
                      const x = (i / (progressData.length - 1)) * 100
                      const y = ((maxWeight - d.weight) / (maxWeight - minWeight)) * 100
                      return `L ${x}% ${y}%`
                    }).join(' ')}
                  `}
                  fill="none"
                  stroke="var(--cyber-yellow)"
                  strokeWidth="2"
                />
                
                {/* Data points */}
                {progressData.map((d, i) => {
                  const x = (i / (progressData.length - 1)) * 100
                  const y = ((maxWeight - d.weight) / (maxWeight - minWeight)) * 100
                  return (
                    <motion.circle
                      key={d.date}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="var(--cyber-yellow)"
                    />
                  )
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
                {progressData.map(d => (
                  <span key={d.date}>{d.date.slice(-2)}</span>
                ))}
              </div>
            </div>
          </div>
        </CyberCard>
      </motion.div>

      {/* Calories Chart */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Calories Burned
        </h3>
        <CyberCard variant="red" className="p-5">
          <div className="h-40">
            <div className="flex items-end justify-between h-32 gap-2">
              {progressData.map((d, i) => (
                <motion.div
                  key={d.date}
                  initial={{ height: 0 }}
                  animate={{ height: `${(d.caloriesBurned / maxCalories) * 100}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-secondary to-secondary/50 rounded-t-sm relative group cursor-pointer"
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card px-2 py-1 rounded text-xs font-mono whitespace-nowrap">
                    {d.caloriesBurned} kcal
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground font-mono">
              {progressData.map(d => (
                <span key={d.date} className="flex-1 text-center">{d.date.slice(-2)}</span>
              ))}
            </div>
          </div>
        </CyberCard>
      </motion.div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3">
          Recent Activity Log
        </h3>
        <div className="space-y-3">
          {progressData.slice().reverse().slice(0, 5).map((entry, index) => (
            <motion.div
              key={entry.date}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <CyberCard variant={index % 2 === 0 ? 'default' : 'red'} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm font-semibold">{entry.date}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {entry.workoutsCompleted} workouts completed
                    </p>
                  </div>
                  <div className="flex gap-4 text-right">
                    <div>
                      <p className="text-xs text-muted-foreground">Weight</p>
                      <p className="font-mono text-sm">{entry.weight}kg</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Burned</p>
                      <p className="font-mono text-sm text-secondary">{entry.caloriesBurned}</p>
                    </div>
                  </div>
                </div>
              </CyberCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
