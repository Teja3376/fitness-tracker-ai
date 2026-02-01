'use client'

import { motion } from 'framer-motion'

export function ScanlineOverlay() {
  return (
    <>
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '100vh' }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
      </div>
      
      {/* CRT scanlines overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />
      
      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />
    </>
  )
}
