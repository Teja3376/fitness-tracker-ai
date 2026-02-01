'use client'

import { motion } from 'framer-motion'

export function HologramFigure({ className }: { className?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={className}
    >
      <svg viewBox="0 0 200 400" className="w-full h-full">
        <defs>
          <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cyber-yellow)" stopOpacity="1" />
            <stop offset="50%" stopColor="var(--cyber-red)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--cyber-yellow)" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="muscleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cyber-yellow)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--cyber-red)" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Grid lines behind figure */}
        <g opacity="0.2">
          {[...Array(20)].map((_, i) => (
            <motion.line
              key={`h-${i}`}
              x1="0" y1={i * 20} x2="200" y2={i * 20}
              stroke="var(--cyber-yellow)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <motion.line
              key={`v-${i}`}
              x1={i * 20} y1="0" x2={i * 20} y2="400"
              stroke="var(--cyber-yellow)"
              strokeWidth="0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.4, 0.1] }}
              transition={{ duration: 2, delay: i * 0.08, repeat: Infinity }}
            />
          ))}
        </g>

        {/* Athletic figure doing workout pose */}
        <motion.g 
          filter="url(#glow)"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Head */}
          <motion.circle
            cx="100" cy="45" r="22"
            fill="none"
            stroke="url(#bodyGradient)"
            strokeWidth="2.5"
            animate={{ strokeDashoffset: [0, 140] }}
            strokeDasharray="8 4"
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Face visor/HUD */}
          <motion.path
            d="M85 42 L115 42"
            stroke="var(--cyber-yellow)"
            strokeWidth="2"
            opacity="0.8"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Neck */}
          <line x1="100" y1="67" x2="100" y2="85" stroke="url(#bodyGradient)" strokeWidth="2.5"/>
          
          {/* Torso - muscular shape */}
          <motion.path
            d="M70 85 L65 95 L60 130 L65 180 L80 200 L100 205 L120 200 L135 180 L140 130 L135 95 L130 85 Z"
            fill="none"
            stroke="url(#bodyGradient)"
            strokeWidth="2.5"
            strokeDasharray="12 4"
            animate={{ strokeDashoffset: [0, -160] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Chest muscles */}
          <motion.path
            d="M75 100 Q90 115 100 105 Q110 115 125 100"
            fill="none"
            stroke="var(--cyber-yellow)"
            strokeWidth="1.5"
            opacity="0.6"
          />
          
          {/* Abs indicator lines */}
          {[130, 150, 170].map((y, i) => (
            <motion.line
              key={`ab-${y}`}
              x1="85" y1={y} x2="115" y2={y}
              stroke="var(--cyber-yellow)"
              strokeWidth="1"
              opacity="0.5"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
          
          {/* Left arm - flexing pose */}
          <motion.path
            d="M70 85 L55 100 L40 85 L35 70"
            fill="none"
            stroke="url(#bodyGradient)"
            strokeWidth="2.5"
            animate={{ d: [
              "M70 85 L55 100 L40 85 L35 70",
              "M70 85 L55 100 L42 88 L38 75",
              "M70 85 L55 100 L40 85 L35 70"
            ]}}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Bicep bulge */}
          <motion.ellipse
            cx="45" cy="85" rx="8" ry="5"
            fill="none"
            stroke="url(#muscleGlow)"
            strokeWidth="1.5"
            animate={{ rx: [7, 9, 7], ry: [4, 6, 4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Right arm - holding dumbbell */}
          <motion.path
            d="M130 85 L145 110 L160 140 L165 160"
            fill="none"
            stroke="url(#bodyGradient)"
            strokeWidth="2.5"
          />
          
          {/* Dumbbell */}
          <motion.g
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <rect x="155" y="155" width="20" height="6" fill="var(--cyber-red)" rx="1" />
            <rect x="152" y="152" width="6" height="12" fill="var(--cyber-yellow)" rx="1" />
            <rect x="172" y="152" width="6" height="12" fill="var(--cyber-yellow)" rx="1" />
          </motion.g>
          
          {/* Left leg */}
          <motion.path
            d="M80 200 L75 260 L70 320 L65 380"
            fill="none"
            stroke="url(#bodyGradient)"
            strokeWidth="2.5"
          />
          
          {/* Right leg */}
          <motion.path
            d="M120 200 L125 260 L130 320 L135 380"
            fill="none"
            stroke="url(#bodyGradient)"
            strokeWidth="2.5"
          />
          
          {/* Thigh muscles */}
          <motion.ellipse
            cx="78" cy="230" rx="8" ry="20"
            fill="none"
            stroke="var(--cyber-yellow)"
            strokeWidth="1"
            opacity="0.4"
          />
          <motion.ellipse
            cx="122" cy="230" rx="8" ry="20"
            fill="none"
            stroke="var(--cyber-yellow)"
            strokeWidth="1"
            opacity="0.4"
          />
          
          {/* Heart rate indicator on chest */}
          <motion.circle 
            cx="95" cy="110" r="6" 
            fill="var(--cyber-red)" 
            opacity="0.9"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          
          {/* Data readout nodes */}
          <motion.circle cx="110" cy="140" r="3" fill="var(--cyber-yellow)" opacity="0.7"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
          />
          <motion.circle cx="85" cy="160" r="3" fill="var(--cyber-yellow)" opacity="0.7"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
          />
          
          {/* Energy bars */}
          {[...Array(5)].map((_, i) => (
            <motion.rect
              key={`energy-${i}`}
              x={155}
              y={80 + i * 12}
              width="30"
              height="8"
              fill="var(--cyber-yellow)"
              opacity="0.7"
              rx="1"
              animate={{ 
                width: [20, 30, 25, 30, 20],
                opacity: [0.4, 0.9, 0.6, 0.9, 0.4]
              }}
              transition={{ duration: 2, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
          
          {/* Stats label */}
          <text x="155" y="75" fill="var(--cyber-yellow)" fontSize="8" fontFamily="monospace" opacity="0.8">
            POWER
          </text>
        </motion.g>
        
        {/* Scan line effect */}
        <motion.rect
          x="0" y="0" width="200" height="3"
          fill="var(--cyber-yellow)"
          opacity="0.4"
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Corner accents */}
        <path d="M10 10 L30 10 L30 15 L15 15 L15 30 L10 30 Z" fill="var(--cyber-yellow)" opacity="0.5" />
        <path d="M190 10 L170 10 L170 15 L185 15 L185 30 L190 30 Z" fill="var(--cyber-yellow)" opacity="0.5" />
        <path d="M10 390 L30 390 L30 385 L15 385 L15 370 L10 370 Z" fill="var(--cyber-red)" opacity="0.5" />
        <path d="M190 390 L170 390 L170 385 L185 385 L185 370 L190 370 Z" fill="var(--cyber-red)" opacity="0.5" />
      </svg>
    </motion.div>
  )
}
