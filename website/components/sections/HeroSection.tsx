'use client'

import { motion } from 'framer-motion'
import { SparklesCore } from '@/components/ui/sparkles'
import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [originalText, setOriginalText] = useState('What should I do for a severe snake bite emergency?')
  const [compressedText, setCompressedText] = useState('What shld I do 4 severe snake bite emerg?')

  useEffect(() => {
    // Simulate typing effect
    const timer = setInterval(() => {
      setOriginalText((prev) => {
        const chars = 'What should I do for a severe snake bite emergency?'
        const compressed = 'What shld I do 4 severe snake bite emerg?'
        return chars
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beacon-dark/80 via-beacon-dark/60 to-beacon-dark"></div>
      </div>

      {/* Sparkles Effect */}
      <SparklesCore
        id="hero-sparkles"
        background="transparent"
        minSize={0.4}
        maxSize={1.4}
        particleDensity={80}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/30 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm text-blue-300">Built for Real Emergencies</span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="block text-white">Your AI Lifeline</span>
            <span className="block gradient-text">When Cellular Fails</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Emergency intelligence via satellite. Compressed. Smart. Life-saving.
          </p>

          {/* Compression Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-2xl mx-auto mb-12 glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Original Message</span>
              <span className="text-sm font-mono text-red-400">{originalText.length} chars</span>
            </div>
            <p className="text-left text-gray-200 mb-4 font-mono text-sm">
              {originalText}
            </p>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-beacon-dark px-4 text-beacon-orange flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  60% Compression
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-400">Compressed Message</span>
              <span className="text-sm font-mono text-green-400">{compressedText.length} chars</span>
            </div>
            <p className="text-left text-gray-200 font-mono text-sm">
              {compressedText}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button className="px-8 py-4 bg-beacon-orange hover:bg-orange-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-orange-500/50 group">
              <span className="flex items-center gap-2">
                Try Beacon Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="px-8 py-4 glass border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 group">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
                Watch Demo
              </span>
            </button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex flex-col items-center gap-2"
            >
              <span className="text-sm text-gray-400">Scroll to explore</span>
              <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
