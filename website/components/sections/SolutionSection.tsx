'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Edit3, Zap, Send, Brain, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function SolutionSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const steps = [
    {
      number: '01',
      title: 'Input Query',
      description: 'Weather, medical, survival, navigation - any emergency intelligence request',
      icon: <Edit3 className="w-6 h-6" />,
    },
    {
      number: '02',
      title: 'AI Compression',
      description: 'Intelligent optimization reduces payload by 40-60% while preserving critical data',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      number: '03',
      title: 'Satellite Transmission',
      description: 'Send via any satellite messenger or iPhone 14+ Emergency SOS',
      icon: <Send className="w-6 h-6" />,
    },
    {
      number: '04',
      title: 'Intelligence Delivery',
      description: 'Compressed, actionable guidance from GPT-4 delivered in sub-3-second response time',
      icon: <Brain className="w-6 h-6" />,
    },
  ]

  return (
    <section className="section-white py-24 relative" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 badge-info">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-semibold">How It Works</span>
          </div>

          <h2 className="heading-lg mb-6">
            Mission Execution
            <br />
            <span className="text-gradient-blue">Protocol</span>
          </h2>

          <p className="subheading mx-auto">
            Four-stage pipeline delivering mission-critical intelligence through satellite infrastructure
          </p>
        </motion.div>

        {/* Protocol Steps */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="card-blue h-full">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-beacon-600 text-white font-bold text-lg mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="mb-4 text-beacon-600">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connection Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-beacon-300" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Live Compression Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-highlight"
        >
          <div className="text-center mb-8">
            <h3 className="heading-sm mb-3">
              Compression Analysis
            </h3>
            <p className="text-gray-600">Real-time optimization preserves critical data while minimizing transmission cost</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="metric-label text-gray-700">Input Payload</span>
                <span className="badge-alert text-xs">160 chars</span>
              </div>
              <div className="code-box text-gray-100">
                $ I am experiencing severe hypothermia symptoms including uncontrollable shivering, confusion, and slurred speech. What are the immediate steps I should take?
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                <span className="font-semibold">Cost:</span>
                <span className="font-semibold text-orange-600">$0.50</span>
              </div>
            </div>

            {/* After */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="metric-label text-gray-700">Optimized Payload</span>
                <span className="badge-active text-xs">64 chars</span>
              </div>
              <div className="bg-emerald-900 rounded-xl p-6 font-mono text-sm text-emerald-100">
                $ Severe hypothermia: shivering, confusion, slurred speech. Steps?
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-semibold">Cost:</span>
                  <span className="font-semibold text-emerald-600">$0.20</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-semibold">Saved:</span>
                  <span className="font-semibold text-emerald-600">60%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency Metrics */}
          <div className="mt-8 pt-8 border-t border-beacon-100 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-1">-60%</div>
              <div className="metric-label">Bytes Reduced</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-beacon-600 mb-1">100%</div>
              <div className="metric-label">Data Integrity</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-1">$0.30</div>
              <div className="metric-label">Cost Savings</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}