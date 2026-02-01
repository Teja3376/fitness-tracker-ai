'use client'

import React from "react"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { CyberButton, CyberInput, GlitchText, ScanlineOverlay } from '@/components/cyber'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center px-6 py-12 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cyber-login-bg.jpg"
          alt="Cyberpunk gym background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
      </div>
      
      <ScanlineOverlay />
      
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
      
      {/* Desktop: Two column layout */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center gap-12">
        {/* Left side - Branding (desktop only) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-1 flex-col"
        >
          <Link href="/" className="mb-8">
            <GlitchText text="CYBERFIT" as="h1" className="text-4xl font-bold" />
          </Link>
          <p className="text-muted-foreground text-lg mb-6">
            Access your neural enhancement dashboard. Track progress, 
            optimize routines, achieve peak performance.
          </p>
          <div className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Real-time biometric sync</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span>AI-powered recommendations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span>Encrypted data protocols</span>
            </div>
          </div>
        </motion.div>
        
        {/* Right side - Login form */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Mobile header */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/">
              <GlitchText text="CYBERFIT" as="h1" className="text-3xl font-bold" />
            </Link>
          </div>
          
          <motion.div 
            className="bg-card/80 backdrop-blur-sm cyber-border cyber-clip p-8"
            whileHover={{ boxShadow: '0 0 30px rgba(252,233,79,0.15)' }}
          >
            <div className="text-center mb-8">
              <h2 className="font-mono text-xl uppercase tracking-wider text-primary mb-2">
                System Login
              </h2>
              <p className="text-sm text-muted-foreground">
                Enter credentials to access dashboard
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <CyberInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <CyberInput
                label="Password"
                type="password"
                variant="red"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <div className="flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              
              <CyberButton type="submit" size="lg" className="w-full">
                Login
              </CyberButton>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-sm text-muted-foreground">
                No account?{' '}
              </span>
              <Link 
                href="/signup" 
                className="text-sm text-secondary hover:text-secondary/80 transition-colors font-mono"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
