'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Zap, DollarSign, Shield, CheckCircle2, XCircle } from 'lucide-react'

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
      isBeacon: true,
      values: ['✓', '✓', '✓', '✓', '✓', '$5-15'],
    },
    {
      name: 'Garmin inReach',
      isBeacon: false,
      values: ['✗', 'Limited', '✗', '✗', 'Pre-set only', '$15-65'],
    },
    {
      name: 'SPOT X',
      isBeacon: false,
      values: ['✗', '✗', '✗', '✗', 'Pre-set only', '$12-30'],
    },
    {
      name: 'Emergency SOS',
      isBeacon: false,
      values: ['✗', '✗', '✗', '✗', 'Emergency only', 'Free (limited)'],
    },
  ]

  return (
    <section className="section-gray py-24 relative overflow-hidden" ref={ref}>
      {/* Background Image */}
      <div className="absolute inset-0 opacity-3">
        <img 
          src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=2070" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Competitive
            <br />
            <span className="text-beacon-600">Advantage</span>
          </h2>

          <p className="subheading mx-auto">
            First AI-powered emergency intelligence platform engineered for satellite communication infrastructure
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="overflow-x-auto mb-12"
        >
          <div className="card card-sharp p-0 overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-white border-b-2 border-gray-200">
                  <th className="px-6 py-5 text-left">
                    <span className="metric-label text-gray-700">Capability</span>
                  </th>
                  {competitors.map((competitor, index) => (
                    <th key={index} className="px-6 py-5 text-center">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 font-semibold text-sm ${
                        competitor.isBeacon
                          ? 'bg-beacon-600 text-white shadow-blue'
                          : 'bg-white border-2 border-gray-200 text-gray-700'
                      }`} style={{ borderRadius: '2px' }}>
                        {competitor.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {features.map((feature, featureIndex) => (
                  <motion.tr
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + featureIndex * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-gray-900">
                        {feature}
                      </span>
                    </td>
                    {competitors.map((competitor, compIndex) => (
                      <td key={compIndex} className="px-6 py-4 text-center">
                        {competitor.values[featureIndex] === '✓' ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100" style={{ borderRadius: '2px' }}>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                        ) : competitor.values[featureIndex] === '✗' ? (
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-red-100" style={{ borderRadius: '2px' }}>
                            <XCircle className="w-5 h-5 text-red-600" />
                          </div>
                        ) : (
                          <span className={`font-mono text-sm ${
                            competitor.isBeacon
                              ? 'text-beacon-600 font-bold'
                              : 'text-gray-500'
                          }`}>
                            {competitor.values[featureIndex]}
                          </span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Strategic Advantages with Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="card card-sharp group hover:border-beacon-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <div className="icon-wrapper group-hover:scale-110 transition-transform mb-4">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Adaptive Intelligence
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Dynamic AI-generated responses contextualized to specific emergency scenarios—
                not static pre-programmed message templates.
              </p>
            </div>
          </div>

          <div className="card card-mixed group hover:border-beacon-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <div className="icon-wrapper group-hover:scale-110 transition-transform mb-4">
                <DollarSign className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Cost Optimization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                50% lower operational cost with 10x feature density.
                Software-only solution eliminates expensive proprietary hardware requirements.
              </p>
            </div>
          </div>

          <div className="card card-rounded group hover:border-beacon-200 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10">
              <div className="icon-wrapper group-hover:scale-110 transition-transform mb-4">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Enterprise Infrastructure
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AWS Lambda serverless architecture provides infinite horizontal scaling.
                99.7% uptime SLA with zero performance degradation under load.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}