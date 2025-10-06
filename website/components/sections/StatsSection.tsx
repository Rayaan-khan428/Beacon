'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { TrendingDown, Zap, DollarSign, Shield } from 'lucide-react'

export default function StatsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    {
      value: 50,
      suffix: '%',
      label: 'Average Compression',
      sublabel: '40-60% character savings',
      icon: <TrendingDown className="w-8 h-8" />,
      color: 'from-beacon-500 to-beacon-600',
    },
    {
      value: 3,
      prefix: '<',
      suffix: 's',
      label: 'Response Time',
      sublabel: 'Sub-3 second AI replies',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      value: 0.20,
      prefix: '$',
      suffix: '',
      label: 'Cost Savings',
      sublabel: 'Average per message',
      icon: <DollarSign className="w-8 h-8" />,
      decimals: 2,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      value: 99.9,
      suffix: '%',
      label: 'Uptime SLA',
      sublabel: 'Enterprise reliability',
      icon: <Shield className="w-8 h-8" />,
      decimals: 1,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <section className="section-gray py-24" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            By the <span className="text-gradient-blue">Numbers</span>
          </h2>
          <p className="subheading mx-auto">
            Real performance metrics that matter in emergencies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="card text-center h-full relative overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-soft`}>
                  {stat.icon}
                </div>

                {/* Value */}
                <div className="text-5xl font-bold mb-3 relative">
                  <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
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
                  </span>
                </div>

                {/* Label */}
                <div className="text-lg font-bold text-gray-900 mb-2">
                  {stat.label}
                </div>

                {/* Sublabel */}
                <div className="text-sm text-gray-600">
                  {stat.sublabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 card-highlight"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-4xl font-bold text-gradient-blue mb-2">∞</h3>
              <p className="font-semibold text-gray-900 mb-1">Concurrent Users</p>
              <p className="text-sm text-gray-600">AWS Lambda scales automatically</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gradient-blue mb-2">24/7</h3>
              <p className="font-semibold text-gray-900 mb-1">Always Available</p>
              <p className="text-sm text-gray-600">No maintenance windows</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-gradient-blue mb-2">Global</h3>
              <p className="font-semibold text-gray-900 mb-1">Worldwide Coverage</p>
              <p className="text-sm text-gray-600">Wherever satellites reach</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}