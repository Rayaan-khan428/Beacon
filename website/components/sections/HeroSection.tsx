'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Satellite, Zap, Shield, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

export default function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image with Parallax */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070)',
            filter: 'brightness(0.4) contrast(1.1)',
          }}
        />
        <div className="absolute inset-0 bg-hero-image"></div>
      </motion.div>

      {/* Floating Background Images */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
        className="absolute top-20 right-10 w-64 h-64 opacity-10"
      >
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400" alt="" className="w-full h-full object-cover" style={{ borderRadius: '2px 32px 2px 32px' }} />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 badge-active" style={{ borderRadius: '2px' }}>
            <span className="status-dot status-online"></span>
            <span className="text-sm font-semibold">System Operational • 99.7% Uptime</span>
          </div>

          {/* Main Headline */}
          <h1 className="heading-xl mb-6 max-w-5xl mx-auto">
            Your AI Lifeline When
            <br />
            <span className="text-beacon-600">Cellular Networks Fail</span>
          </h1>

          {/* Subtitle */}
          <p className="subheading mx-auto mb-12">
            Beacon delivers AI-powered weather intelligence, wildfire alerts, and emergency guidance 
            optimized for satellite messaging. Stay informed and safe, even when you're off the grid.
          </p>

          {/* Demo Box with Image Background */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative bg-white p-8 shadow-large border-2 border-beacon-100" style={{ borderRadius: '2px 16px 2px 16px' }}>
              {/* Small background image */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-5 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?q=80&w=400" alt="" className="w-full h-full object-cover" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-beacon-100 flex items-center justify-center text-beacon-600" style={{ borderRadius: '2px' }}>
                      <Satellite className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900">Intelligent Message Compression</h3>
                      <p className="text-sm text-gray-600">Optimized for satellite bandwidth constraints</p>
                    </div>
                  </div>
                  <div className="badge-info" style={{ borderRadius: '2px' }}>
                    <span className="text-lg font-bold">62% smaller</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Original Message */}
                  <div className="text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="metric-label text-gray-700">Standard Message</span>
                      <span className="text-sm font-mono text-gray-500">148 characters</span>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 font-mono text-sm text-gray-700" style={{ borderRadius: '2px' }}>
                      What should I do for a severe snake bite emergency?
                    </div>
                  </div>

                  {/* Arrow with icon */}
                  <div className="flex items-center justify-center py-2">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-beacon-200 to-beacon-300"></div>
                    <div className="mx-4 p-2 bg-beacon-600 text-white" style={{ borderRadius: '2px' }}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-beacon-300 via-beacon-200 to-transparent"></div>
                  </div>

                  {/* Compressed Message */}
                  <div className="text-left">
                    <div className="flex justify-between items-center mb-2">
                      <span className="metric-label text-emerald-700">Satellite-Optimized</span>
                      <span className="text-sm font-mono text-emerald-600 font-semibold">56 characters</span>
                    </div>
                    <div className="bg-emerald-50 border-2 border-emerald-200 p-4 font-mono text-sm text-emerald-800" style={{ borderRadius: '2px' }}>
                      severe snake bite emerg protocol?
                    </div>
                  </div>
                </div>

                {/* Efficiency Bar */}
                <div className="mt-6 pt-6 border-t border-beacon-100">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">Compression Efficiency</span>
                    <span className="text-xl font-bold text-beacon-600">62%</span>
                  </div>
                  <div className="h-2 bg-gray-200 overflow-hidden" style={{ borderRadius: '2px' }}>
                    <div 
                      className="h-full bg-beacon-600 transition-all duration-1000"
                      style={{ width: '62%', borderRadius: '2px' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="btn-primary group">
              <Shield className="w-5 h-5" />
              Get Started with Beacon
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="btn-secondary">
              View Technical Specs
            </button>
          </div>

          {/* Key Metrics with Images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card card-sharp text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=200" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="metric-large text-beacon-600 mb-2">&lt;2.8s</div>
                <div className="metric-label">Response Time</div>
              </div>
            </div>
            <div className="card card-mixed text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=200" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="metric-large text-beacon-600 mb-2">99.7%</div>
                <div className="metric-label">Uptime SLA</div>
              </div>
            </div>
            <div className="card card-rounded text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                <img src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200" alt="" className="w-full h-full object-cover" />
              </div>
              <div className="relative z-10">
                <div className="metric-large text-beacon-600 mb-2">24/7</div>
                <div className="metric-label">Global Coverage</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}