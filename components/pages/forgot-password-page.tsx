'use client'

import React from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { CyberButton, CyberInput, GlitchText, ScanlineOverlay } from '@/components/cyber'
import Link from 'next/link'
import Image from 'next/image'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    setIsSubmitted(true)
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
      <div className="absolute inset-0 bg-gradient-radial from-secondary/10 via-transparent to-transparent" />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/">
            <GlitchText text="CYBERFIT" as="h1" className="text-3xl font-bold" />
          </Link>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card/80 backdrop-blur-sm cyber-border-red cyber-clip p-8"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-sm bg-secondary/20 border border-secondary/40 flex items-center justify-center">
                    <svg className="w-8 h-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                  </div>
                </div>
                
                <div className="text-center mb-8">
                  <h2 className="font-mono text-xl uppercase tracking-wider text-secondary mb-2">
                    Password Recovery
                  </h2>
                  <p className="text-sm text-foreground/70">
                    Enter your email to receive a secure reset link
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <CyberInput
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="red"
                  />
                  
                  <CyberButton 
                    type="submit" 
                    variant="secondary" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-secondary-foreground border-t-transparent rounded-full"
                        />
                        Processing...
                      </span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </CyberButton>
                </form>
                
                <div className="mt-6 text-center">
                  <Link 
                    href="/login" 
                    className="text-sm text-foreground/70 hover:text-primary transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Login
                  </Link>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                {/* Success Icon */}
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.5 }}
                  className="flex justify-center mb-6"
                >
                  <div className="w-20 h-20 rounded-sm bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <motion.svg 
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-10 h-10 text-primary" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <motion.path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      />
                    </motion.svg>
                  </div>
                </motion.div>
                
                <h2 className="font-mono text-xl uppercase tracking-wider text-primary mb-3">
                  Link Transmitted
                </h2>
                <p className="text-foreground/70 mb-2">
                  Recovery protocol initiated for:
                </p>
                <p className="text-primary font-mono text-sm mb-6 break-all">
                  {email}
                </p>
                <p className="text-foreground/60 text-sm mb-8">
                  Check your inbox for the secure reset link. The link expires in 15 minutes.
                </p>
                
                <div className="space-y-3">
                  <CyberButton 
                    onClick={() => setIsSubmitted(false)}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                  >
                    Send Again
                  </CyberButton>
                  
                  <Link href="/login" className="block">
                    <CyberButton 
                      size="lg"
                      className="w-full"
                    >
                      Return to Login
                    </CyberButton>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Security notice */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-foreground/50 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Secure 256-bit encrypted transmission
          </p>
        </motion.div>
      </div>
    </div>
  )
}
