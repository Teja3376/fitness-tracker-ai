'use client'

import React from "react"
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CyberButton, CyberInput, GlitchText, ScanlineOverlay } from '@/components/cyber'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/onboarding')
  }

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background cyber-grid-bg relative flex items-center justify-center px-6 py-12">
      <ScanlineOverlay />
      
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
      
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md order-2 lg:order-1"
        >
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-6">
            <Link href="/">
              <GlitchText text="CYBERFIT" as="h1" className="text-3xl font-bold" />
            </Link>
          </div>
          
          <motion.div 
            className="bg-card/80 backdrop-blur-sm cyber-border cyber-clip p-8"
            whileHover={{ boxShadow: '0 0 30px rgba(252,233,79,0.15)' }}
          >
            <div className="text-center mb-6">
              <h2 className="font-mono text-xl uppercase tracking-wider text-primary mb-2">
                Create Account
              </h2>
              <p className="text-sm text-muted-foreground">
                Build your cyber-body profile
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <CyberInput
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => updateField('fullName', e.target.value)}
              />
              
              <CyberInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              
              <CyberInput
                label="Password"
                type="password"
                variant="red"
                value={formData.password}
                onChange={(e) => updateField('password', e.target.value)}
              />
              
              <CyberInput
                label="Confirm Password"
                type="password"
                variant="red"
                value={formData.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
              />
              
              <CyberButton type="submit" size="lg" className="w-full mt-6">
                Create Account
              </CyberButton>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">
                Already registered?{' '}
              </span>
              <Link 
                href="/login" 
                className="text-sm text-secondary hover:text-secondary/80 transition-colors font-mono"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Right side - Image (desktop only) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-1 flex-col items-center order-1 lg:order-2"
        >
          <Link href="/" className="mb-8">
            <GlitchText text="CYBERFIT" as="h1" className="text-4xl font-bold" />
          </Link>
          
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-gradient-radial from-secondary/30 via-transparent to-transparent blur-3xl" />
            <div className="relative cyber-clip overflow-hidden border-2 border-secondary/40">
              <Image
                src="/images/cyber-signup-bg.jpg"
                alt="Cyberpunk fitness stats"
                width={400}
                height={400}
                className="w-full h-[350px] object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay" />
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-foreground/70 mt-6 max-w-xs"
          >
            Join thousands upgrading their biological hardware with precision fitness protocols
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
