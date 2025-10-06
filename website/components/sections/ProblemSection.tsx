'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AlertTriangle, DollarSign, MessageSquare, XCircle } from 'lucide-react'
import { useRef } from 'react'

export default function ProblemSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  return (
    <section ref={sectionRef} className="section-gray py-24 relative overflow-hidden">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ y, opacity: 0.08 }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1530979412150-6e4f59d4e01a?q=80&w=2070" 
          alt="" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 badge-alert" style={{ borderRadius: '2px' }}>
            <AlertTriangle className="w-4 h-4" />
            <span className="font-semibold">Critical Gap Identified</span>
          </div>

          <h2 className="heading-lg mb-6">
            The Satellite Communication
            <br />
            <span className="text-orange-600">Crisis</span>
          </h2>

          <p className="subheading mx-auto">
            When cellular infrastructure fails, traditional satellite devices leave users with inadequate,
            pre-programmed responses that fail in real emergency scenarios.
          </p>
        </motion.div>

        {/* Critical Stats Grid with Large Images */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="card card-sharp group hover:border-orange-200 relative overflow-hidden"
          >
            {/* Large Background Image */}
            <div className="absolute inset-0 opacity-8">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/50"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-orange-100 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform" style={{ borderRadius: '2px' }}>
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">15%</div>
              <div className="metric-label mb-3">Communication Failures</div>
              <div className="text-gray-600 leading-relaxed">
                Backcountry emergencies compromised by inability to access critical survival intelligence
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card card-mixed group hover:border-orange-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-8">
              <img 
                src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=600" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/50"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-orange-100 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform" style={{ borderRadius: '2px' }}>
                <DollarSign className="w-7 h-7" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">$0.50</div>
              <div className="metric-label mb-3">Per Message Cost</div>
              <div className="text-gray-600 leading-relaxed">
                Premium satellite transmission rates make every single character economically critical
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card card-rounded group hover:border-orange-200 relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-8">
              <img 
                src="https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?q=80&w=600" 
                alt="" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/50"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-14 h-14 bg-orange-100 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform" style={{ borderRadius: '2px' }}>
                <MessageSquare className="w-7 h-7" />
              </div>
              <div className="text-5xl font-bold text-gray-900 mb-2">160</div>
              <div className="metric-label mb-3">Character Constraint</div>
              <div className="text-gray-600 leading-relaxed">
                SMS-length limitation insufficient for transmitting detailed emergency protocol data
              </div>
            </div>
          </motion.div>
        </div>

        {/* Critical Failure Analysis with Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white p-10 border-2 border-orange-100 relative overflow-hidden"
          style={{ borderRadius: '2px 32px 2px 32px' }}
        >
          {/* Hero Background Image */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-orange-500 flex items-center justify-center shadow-lg" style={{ borderRadius: '2px' }}>
                <XCircle className="w-9 h-9 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Legacy Hardware: Mission Inadequate
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Garmin inReach, SPOT, and Zoleo devices provide only pre-programmed message templates.
                Zero real-time weather analysis. Zero wildfire proximity alerts. Zero adaptive AI guidance.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-5 border border-gray-200" style={{ borderRadius: '2px' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-900">
                      No Dynamic Intelligence
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Static responses cannot adapt to evolving emergency situations
                  </p>
                </div>
                <div className="bg-gray-50 p-5 border border-gray-200" style={{ borderRadius: '2px' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <span className="font-semibold text-gray-900">
                      No Environmental Data
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Critical weather and fire data inaccessible when decisions matter most
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