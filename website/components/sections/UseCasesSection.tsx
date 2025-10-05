'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function UseCasesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const useCases = [
    {
      title: 'Backcountry Hiking',
      description: 'Get weather updates and trail guidance when you\'re miles from civilization. Know when storms are approaching and receive survival tips.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      stats: ['50mi+ range', 'Real-time weather', 'Trail status'],
    },
    {
      title: 'Maritime Emergencies',
      description: 'Storm warnings and medical guidance when offshore. Critical information can mean the difference between life and death at sea.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      stats: ['Wave forecasts', 'Medical advice', 'Coordinates'],
    },
    {
      title: 'Wildfire Evacuation',
      description: 'Real-time fire movement and safe evacuation routes. Know which direction to go when every second counts.',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2070',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      stats: ['NASA FIRMS data', '50km radius', 'Live updates'],
    },
    {
      title: 'Disaster Response',
      description: 'Stay connected when infrastructure fails. Essential for first responders and humanitarian missions in crisis zones.',
      image: 'https://images.unsplash.com/photo-1591951425328-48c6eae3dd30?q=80&w=2070',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      stats: ['99.9% uptime', 'Multi-user', 'Instant sync'],
    },
  ]

  return (
    <section className="relative py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-beacon-dark via-slate-900 to-beacon-dark"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Built for <span className="gradient-text">Real Emergencies</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From mountain peaks to open oceans, Beacon keeps you connected when it matters most
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative overflow-hidden rounded-2xl glass border border-white/10 hover-glow"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${useCase.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-beacon-dark via-beacon-dark/80 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[400px]">
                <div className="mb-4 text-blue-400 group-hover:text-blue-300 transition-colors">
                  {useCase.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {useCase.title}
                </h3>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Stats */}
                <div className="flex flex-wrap gap-2">
                  {useCase.stats.map((stat, statIndex) => (
                    <span
                      key={statIndex}
                      className="px-3 py-1 rounded-full glass border border-white/20 text-xs text-gray-300"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
