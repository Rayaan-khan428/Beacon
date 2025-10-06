'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { CloudRain, Flame, Brain, Minimize2, Check } from 'lucide-react'
import { useRef } from 'react'

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const features = [
    {
      icon: <CloudRain className="w-6 h-6" />,
      title: 'Weather Intelligence',
      description: 'Real-time meteorological analysis for your exact coordinates',
      features: [
        'Temperature, wind speed, and precipitation data',
        'Storm system warnings and severe weather alerts',
        'Satellite-optimized payload compression',
        'OpenWeatherMap API integration'
      ],
      stat: '<2.8s',
      statLabel: 'Response Time',
      image: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=600',
      cornerStyle: 'card-sharp'
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: 'Wildfire Detection',
      description: 'Active fire proximity monitoring and threat assessment',
      features: [
        'NASA FIRMS satellite thermal detection',
        '50km radius real-time monitoring zone',
        'Distance and bearing calculations',
        'Automated alerts every 3 hours'
      ],
      stat: '50km',
      statLabel: 'Detection Radius',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=600',
      cornerStyle: 'card-mixed'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Emergency Assistant',
      description: 'Intelligent survival guidance and medical support',
      features: [
        'GPT-4 powered decision support',
        'Emergency-optimized responses',
        'Concise, actionable survival protocols',
        'Sub-3-second intelligence delivery'
      ],
      stat: '∞',
      statLabel: 'Query Capacity',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=600',
      cornerStyle: 'card-rounded'
    },
    {
      icon: <Minimize2 className="w-6 h-6" />,
      title: 'Message Optimization',
      description: 'Intelligent compression for bandwidth efficiency',
      features: [
        '40-60% character payload reduction',
        'Context-aware abbreviation algorithms',
        '100% critical data integrity',
        'Zero-configuration automatic optimization'
      ],
      stat: '60%',
      statLabel: 'Avg Compression',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600',
      cornerStyle: 'card-sharp'
    },
  ]

  return (
    <section ref={sectionRef} className="section-white py-24 relative">
      {/* Parallax Background Image */}
      <motion.div 
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']),
          opacity: 0.03
        }}
        className="absolute inset-0 bg-cover bg-center"
      >
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070" alt="" className="w-full h-full object-cover" />
      </motion.div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Powerful Features for
            <br />
            <span className="text-beacon-600">Emergency Situations</span>
          </h2>

          <p className="subheading mx-auto">
            Production-hardened systems engineered for mission-critical emergency response scenarios
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card ${feature.cornerStyle} group hover:border-beacon-200 relative overflow-hidden`}
            >
              {/* Background Image */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-5 overflow-hidden">
                <img src={feature.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="icon-wrapper group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>

                <ul className="feature-list mb-6">
                  {feature.features.map((item, i) => (
                    <li key={i} className="feature-list-item">
                      <Check className="feature-check" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="metric-label">{feature.statLabel}</span>
                  <span className="text-3xl font-bold text-beacon-600">{feature.stat}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specifications Panel with Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="card-highlight card-mixed relative overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 opacity-3">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000" alt="" className="w-full h-full object-cover" />
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="heading-sm mb-3">
                System Specifications
              </h3>
              <p className="text-gray-600">Infrastructure performance metrics and operational parameters</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="metric-large text-beacon-600 mb-2">99.7%</div>
                <div className="metric-label">Uptime SLA</div>
                <div className="text-sm text-gray-500 mt-1">Lambda Redundancy</div>
              </div>
              <div className="text-center">
                <div className="metric-large text-beacon-600 mb-2">&lt;2.8s</div>
                <div className="metric-label">Latency P95</div>
                <div className="text-sm text-gray-500 mt-1">End-to-End</div>
              </div>
              <div className="text-center">
                <div className="metric-large text-beacon-600 mb-2">256</div>
                <div className="metric-label">Max Payload</div>
                <div className="text-sm text-gray-500 mt-1">Character Limit</div>
              </div>
              <div className="text-center">
                <div className="metric-large text-beacon-600 mb-2">∞</div>
                <div className="metric-label">Scale</div>
                <div className="text-sm text-gray-500 mt-1">Concurrent Users</div>
              </div>
            </div>

            <div className="pt-8 border-t border-beacon-100">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="metric-label mb-2">Infrastructure</div>
                  <div className="text-base font-semibold text-gray-900">AWS Lambda + API Gateway</div>
                </div>
                <div>
                  <div className="metric-label mb-2">AI Model</div>
                  <div className="text-base font-semibold text-gray-900">OpenAI GPT-4 Turbo</div>
                </div>
                <div>
                  <div className="metric-label mb-2">Data Sources</div>
                  <div className="text-base font-semibold text-gray-900">OpenWeather + NASA FIRMS</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}