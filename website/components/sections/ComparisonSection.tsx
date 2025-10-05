'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function ComparisonSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    'AI-Powered Responses',
    'Real-time Weather',
    'Wildfire Alerts',
    'Smart Compression',
    'Custom Questions',
    'Monthly Cost',
  ]

  const competitors = [
    {
      name: 'Beacon',
      gradient: 'from-blue-500 to-purple-600',
      values: ['✅', '✅', '✅', '✅', '✅', '$5-15'],
    },
    {
      name: 'Garmin inReach',
      gradient: 'from-gray-600 to-gray-700',
      values: ['❌', 'Limited', '❌', '❌', 'Pre-set only', '$15-65'],
    },
    {
      name: 'SPOT X',
      gradient: 'from-gray-600 to-gray-700',
      values: ['❌', '❌', '❌', '❌', 'Pre-set only', '$12-30'],
    },
    {
      name: 'Emergency SOS',
      gradient: 'from-gray-600 to-gray-700',
      values: ['❌', '❌', '❌', '❌', 'Emergency only', 'Free (limited)'],
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
            Why <span className="gradient-text">Beacon Leads</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We're not just another satellite messenger. We're the first AI-powered emergency intelligence platform.
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="overflow-x-auto"
        >
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden glass rounded-2xl border border-white/10">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                      Feature
                    </th>
                    {competitors.map((competitor, index) => (
                      <th
                        key={index}
                        className={`px-6 py-4 text-center text-sm font-semibold ${
                          index === 0 ? 'text-blue-400' : 'text-gray-400'
                        }`}
                      >
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                          index === 0 ? `bg-gradient-to-r ${competitor.gradient}` : 'bg-gray-700/50'
                        }`}>
                          {competitor.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {features.map((feature, featureIndex) => (
                    <motion.tr
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.1 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">
                        {feature}
                      </td>
                      {competitors.map((competitor, compIndex) => (
                        <td
                          key={compIndex}
                          className={`px-6 py-4 text-sm text-center ${
                            compIndex === 0 ? 'font-semibold text-green-400' : 'text-gray-400'
                          }`}
                        >
                          {competitor.values[featureIndex]}
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Key Differentiators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="glass rounded-xl p-6 border border-blue-500/30">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Real AI Intelligence</h3>
            <p className="text-gray-400 text-sm">
              Not pre-programmed messages. Get actual AI-generated responses tailored to your specific situation.
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-purple-500/30">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Affordable Pricing</h3>
            <p className="text-gray-400 text-sm">
              Half the cost of competitors with 10x the capabilities. No expensive hardware required.
            </p>
          </div>

          <div className="glass rounded-xl p-6 border border-green-500/30">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Production-Ready</h3>
            <p className="text-gray-400 text-sm">
              AWS Lambda infrastructure scales infinitely. No service degradation during peak usage.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
