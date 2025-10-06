'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Smartphone, MessageSquare, CloudRain, Flame } from 'lucide-react'

export default function ScreenshotsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const screenshots = [
    {
      title: 'Onboarding',
      description: 'Beautiful introduction',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Message Compression',
      description: 'Real-time savings',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Weather Updates',
      description: 'Coordinate forecasts',
      icon: <CloudRain className="w-8 h-8" />,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      title: 'Wildfire Alerts',
      description: 'Live fire tracking',
      icon: <Flame className="w-8 h-8" />,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <section className="section-white py-24" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Beautiful <span className="text-gradient-blue">Interface</span>
          </h2>
          <p className="subheading mx-auto">
            Designed for clarity in critical moments. Every pixel serves a purpose.
          </p>
        </motion.div>

        {/* iPhone Mockup Showcase */}
        <div className="grid md:grid-cols-4 gap-8">
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* iPhone Frame */}
              <div className="relative mx-auto w-full max-w-[250px]">
                <div className="bg-gray-900 rounded-[3rem] p-3 border-8 border-gray-800 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                  {/* Screen */}
                  <div className="bg-gradient-to-br from-gray-100 to-white rounded-[2.5rem] aspect-[9/19.5] flex items-center justify-center overflow-hidden">
                    {/* Placeholder */}
                    <div className="text-center p-6">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br ${screenshot.color} flex items-center justify-center text-white shadow-large`}>
                        {screenshot.icon}
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-gray-200 rounded-full"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-3/4 mx-auto"></div>
                        <div className="h-3 bg-gray-200 rounded-full w-1/2 mx-auto"></div>
                      </div>
                    </div>
                  </div>

                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-full"></div>
                </div>

                {/* Labels */}
                <div className="text-center mt-6">
                  <h3 className="font-bold text-gray-900 mb-1">{screenshot.title}</h3>
                  <p className="text-sm text-gray-600">{screenshot.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* App Store Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all font-semibold shadow-large hover:scale-105 transform duration-300">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <div className="text-left">
              <div className="text-xs opacity-90">Download on the</div>
              <div className="text-lg font-bold">App Store</div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}