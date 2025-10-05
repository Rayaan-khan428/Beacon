'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

export default function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      value: 15,
      suffix: '%',
      label: 'of backcountry emergencies',
      sublabel: 'involve communication failure',
    },
    {
      value: 0.50,
      prefix: '$',
      suffix: '',
      label: 'per satellite message',
      sublabel: 'every character counts',
      decimals: 2,
    },
    {
      value: 160,
      suffix: ' chars',
      label: 'satellite message limit',
      sublabel: 'your life depends on brevity',
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-beacon-dark via-slate-900 to-beacon-dark"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            The Off-Grid <span className="gradient-text">Communication Gap</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            When you're off the grid, traditional satellite messaging falls short. 
            Pre-programmed messages can't save your life. You need real intelligence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass rounded-2xl p-8 border border-white/10 hover-glow group"
            >
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
                  {stat.prefix}
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      decimals={stat.decimals || 0}
                      delay={index * 0.2}
                    />
                  )}
                  {stat.suffix}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.sublabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call-out Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 glass rounded-2xl p-8 border-2 border-red-500/30 bg-red-500/5"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">The Problem is Real</h3>
              <p className="text-gray-300">
                Every year, hundreds of preventable backcountry deaths occur because adventurers 
                couldn't access critical information. Weather changes. Medical emergencies. Wildlife encounters. 
                Traditional satellite devices only send pre-programmed messages. <span className="text-beacon-orange font-semibold">You deserve better.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
