'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      title: 'Weather Intelligence',
      description: 'Get real-time weather forecasts by coordinates. Storm warnings, temperature, wind conditions - all optimized for satellite transmission.',
      icon: (
        <svg className="w-10 h-10 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      className: 'md:col-span-2',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/20 backdrop-blur-sm p-4">
          <div className="text-sm text-gray-300 font-mono">
            <div className="mb-2 text-blue-300">→ weather 37.7749,-122.4194</div>
            <div className="text-gray-400">← SF: Sunny 68°F feels 65°F. Humid 62%. Wind 8mph</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Wildfire Alerts',
      description: 'Track active fires from NASA FIRMS database. Get real-time alerts and evacuation guidance for your location.',
      icon: (
        <svg className="w-10 h-10 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
      className: 'md:col-span-1',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 backdrop-blur-sm p-4 relative overflow-hidden">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-2 right-2"
          >
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </motion.div>
          <div className="text-xs text-gray-300 font-mono">
            <div className="text-orange-300 font-semibold">⚠️ ACTIVE FIRE</div>
            <div className="text-gray-400 mt-1">18mi NW</div>
          </div>
        </div>
      ),
    },
    {
      title: 'AI Emergency Guidance',
      description: 'Powered by OpenAI GPT-4. Get instant medical advice, survival tips, and navigation help when you need it most.',
      icon: (
        <svg className="w-10 h-10 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      className: 'md:col-span-1',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 backdrop-blur-sm p-4">
          <div className="text-xs text-gray-300 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-purple-300">AI analyzing...</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Smart Compression',
      description: '40-60% character savings through intelligent abbreviation. Every byte counts when you're paying per message.',
      icon: (
        <svg className="w-10 h-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      className: 'md:col-span-2',
      header: (
        <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20 backdrop-blur-sm p-4">
          <div className="w-full">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Original</span>
              <span className="font-mono text-red-400">148 chars</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full mb-3">
              <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full" style={{ width: '100%' }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Compressed</span>
              <span className="font-mono text-green-400">61 chars</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '41%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              ></motion.div>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-beacon-dark via-slate-900 to-beacon-dark"></div>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Everything you need to stay safe and informed in the backcountry
          </p>
        </motion.div>

        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <BentoGridItem
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}
