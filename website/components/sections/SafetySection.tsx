'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AlertTriangle } from 'lucide-react'

export default function SafetySection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="section-white py-20" ref={ref}>
      <div className="section-container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-10 border-2 border-orange-200"
        >
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Important Safety Notice
              </h3>
              
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="font-semibold text-lg text-gray-900">
                  Beacon is an information tool, not an emergency service.
                </p>

                <p className="font-medium">
                  For immediate life-threatening emergencies:
                </p>

                <ul className="space-y-3 ml-6 list-disc marker:text-orange-500">
                  <li>Use <strong className="text-gray-900">iPhone Emergency SOS</strong> (iPhone 14+) to contact emergency services</li>
                  <li>Call <strong className="text-gray-900">911</strong> or your local emergency number if cellular service is available</li>
                  <li>Press the <strong className="text-gray-900">SOS button</strong> on your Garmin/SPOT device if equipped</li>
                </ul>

                <div className="pt-4 border-t-2 border-orange-200 mt-6">
                  <p className="text-sm text-gray-600">
                    Beacon provides weather, fire tracking, and AI-generated advice for planning and decision-making. 
                    Always exercise judgment and seek professional help when possible. AI responses are guidance only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}