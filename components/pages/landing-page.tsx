'use client'

import { motion } from 'framer-motion'
import { CyberButton, GlitchText, ScanlineOverlay } from '@/components/cyber'
import Link from 'next/link'
import Image from 'next/image'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background cyber-grid-bg relative overflow-hidden">
      <ScanlineOverlay />
      
      {/* Background accents - enhanced */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-secondary/15 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center px-6 py-12 lg:py-0">
        {/* Left content - Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 max-w-xl text-center lg:text-left lg:pr-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
              Neural Enhancement Protocol v2.077
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <GlitchText text="Upgrade Your Body." as="span" className="block text-primary" />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="block text-foreground mt-2"
            >
              Level Up Your Life.
            </motion.span>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-foreground/80 text-lg mb-8 max-w-md mx-auto lg:mx-0"
          >
            Transform your meatware with cutting-edge fitness protocols and 
            optimized nutrition data. No chrome required.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link href="/signup">
              <CyberButton size="lg" className="w-full sm:w-auto min-w-[160px]">
                Get Started
              </CyberButton>
            </Link>
            <Link href="/login">
              <CyberButton variant="secondary" size="lg" className="w-full sm:w-auto min-w-[160px]">
                Login
              </CyberButton>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="mt-12 flex gap-8 justify-center lg:justify-start"
          >
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '2M+', label: 'Workouts Done' },
              { value: '99%', label: 'Uptime' },
            ].map((stat, i) => (
              <div key={stat.label} className="text-center lg:text-left">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, type: 'spring' }}
                  className="text-2xl font-mono font-bold text-primary"
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Right content - Hero Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex-1 max-w-lg w-full mt-12 lg:mt-0 hidden md:block"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent blur-3xl" />
            <div className="relative cyber-clip overflow-hidden border-2 border-primary/40">
              <Image
                src="/images/cyber-fitness-hero.jpg"
                alt="Cyberpunk fitness athlete"
                width={500}
                height={600}
                className="w-full h-[400px] lg:h-[500px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom decoration */}
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </div>
  )
}
