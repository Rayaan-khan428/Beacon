'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'

export default function SolutionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      number: '01',
      title: 'Type Your Question',
      description: 'Ask anything - weather forecasts, medical advice, survival tips, or navigation help.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Beacon Compresses',
      description: 'Our AI optimizes your message for satellite transmission, saving 40-60% characters.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Send via Satellite',
      description: 'Text our number through your satellite messenger or iPhone Emergency SOS.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Get AI Guidance',
      description: 'Receive compressed, actionable intelligence from OpenAI GPT-4 in seconds.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden" ref={containerRef}>
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient opacity-10"></div>
      <div className="absolute inset-0 grid-pattern opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            How <span className="gradient-text">Beacon Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Four simple steps between you and life-saving intelligence
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform -translate-y-1/2 opacity-30"></div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="glass rounded-2xl p-6 border border-white/10 hover-glow group h-full flex flex-col">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-purple-500/50">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <motion.svg
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-8 h-8 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Example Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid md:grid-cols-2 gap-8"
        >
          {/* Before */}
          <div className="glass rounded-2xl p-6 border border-red-500/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">Before Compression</h4>
              <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-mono">
                160 chars
              </span>
            </div>
            <p className="font-mono text-sm text-gray-300 leading-relaxed">
              "I am experiencing severe hypothermia symptoms including uncontrollable shivering, confusion, and slurred speech. What are the immediate steps I should take?"
            </p>
          </div>

          {/* After */}
          <div className="glass rounded-2xl p-6 border border-green-500/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white">After Compression</h4>
              <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-mono">
                64 chars
              </span>
            </div>
            <p className="font-mono text-sm text-gray-300 leading-relaxed">
              "Severe hypothermia: shivering, confusion, slurred speech. Steps?"
            </p>
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                60% saved
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
