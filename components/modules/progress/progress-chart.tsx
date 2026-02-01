'use client'

import { motion } from 'framer-motion'
import type { ProgressEntry } from '@/lib/types'
import { CyberCard } from '@/components/cyber'

interface ProgressChartProps {
  data: ProgressEntry[]
  dataKey: keyof ProgressEntry
  label: string
  color: 'yellow' | 'red'
}

export function ProgressChart({ data, dataKey, label, color }: ProgressChartProps) {
  const values = data.map(d => d[dataKey] as number)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  const colors = {
    yellow: { stroke: 'var(--primary)', fill: 'var(--primary)' },
    red: { stroke: 'var(--secondary)', fill: 'var(--secondary)' },
  }

  return (
    <CyberCard className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-lg font-mono font-bold" style={{ color: colors[color].stroke }}>
          {values[values.length - 1]}
        </p>
      </div>

      <div className="relative h-24">
        <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="0"
              y1={i * 26.67}
              x2="300"
              y2={i * 26.67}
              stroke="var(--border)"
              strokeWidth="0.5"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <motion.path
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            d={`
              M 0 80
              ${values.map((v, i) => {
                const x = (i / (values.length - 1)) * 300
                const y = 80 - ((v - min) / range) * 70
                return `L ${x} ${y}`
              }).join(' ')}
              L 300 80
              Z
            `}
            fill={colors[color].fill}
          />

          {/* Line */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            d={values.map((v, i) => {
              const x = (i / (values.length - 1)) * 300
              const y = 80 - ((v - min) / range) * 70
              return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
            }).join(' ')}
            fill="none"
            stroke={colors[color].stroke}
            strokeWidth="2"
            style={{
              filter: `drop-shadow(0 0 4px ${colors[color].stroke})`,
            }}
          />

          {/* Data points */}
          {values.map((v, i) => {
            const x = (i / (values.length - 1)) * 300
            const y = 80 - ((v - min) / range) * 70
            return (
              <motion.circle
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                cx={x}
                cy={y}
                r="4"
                fill="var(--background)"
                stroke={colors[color].stroke}
                strokeWidth="2"
              />
            )
          })}
        </svg>
      </div>

      <div className="flex justify-between text-[9px] font-mono text-muted-foreground">
        {data.slice(-7).map((d, i) => (
          <span key={d.date}>{new Date(d.date).toLocaleDateString('en', { weekday: 'short' })}</span>
        ))}
      </div>
    </CyberCard>
  )
}
