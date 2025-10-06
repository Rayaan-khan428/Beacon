'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Compass, Waves, Flame, Users } from 'lucide-react'
import { useRef } from 'react'

export default function UseCasesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const useCases = [
    {
      title: 'Backcountry Hiking',
      description: 'Get weather updates and trail guidance when you\'re miles from civilization. Know when storms are approaching and receive survival tips.',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
      icon: <Compass className="w-7 h-7" />,
      stats: ['50mi+ range', 'Real-time weather', 'Trail status'],
      style: 'card-sharp'
    },
    {
      title: 'Maritime Emergencies',
      description: 'Storm warnings and medical guidance when offshore. Critical information can mean the difference between life and death at sea.',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2070',
      icon: <Waves className="w-7 h-7" />,
      stats: ['Wave forecasts', 'Medical advice', 'Coordinates'],
      style: 'card-mixed'
    },
    {
      title: 'Wildfire Evacuation',
      description: 'Real-time fire movement and safe evacuation routes. Know which direction to go when every second counts.',
      image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2070',
      icon: <Flame className="w-7 h-7" />,
      stats: ['NASA FIRMS data', '50km radius', 'Live updates'],
      style: 'card-rounded'
    },
    {
      title: 'Disaster Response',
      description: 'Stay connected when infrastructure fails. Essential for first responders and humanitarian missions in crisis zones.',
      image: 'https://images.unsplash.com/photo-1591951425328-48c6eae3dd30?q=80&w=2070',
      icon: <Users className="w-7 h-7" />,
      stats: ['99.9% uptime', 'Multi-user', 'Instant sync'],
      style: 'card-sharp'
    },
  ]

  return (
    <section ref={sectionRef} className="section-white py-24 relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-6">
            Built for <span className="text-beacon-600">Real Emergencies</span>
          </h2>
          <p className="subheading mx-auto">
            From mountain peaks to open oceans, Beacon keeps you connected when it matters most
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => {
            const cardRef = useRef(null)
            const { scrollYProgress: cardProgress } = useScroll({
              target: cardRef,
              offset: ["start end", "end start"]
            })
            const imageY = useTransform(cardProgress, [0, 1], ['0%', '20%'])
            
            return (
              <motion.div
                key={index}
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group relative overflow-hidden shadow-large hover:shadow-xl transition-all duration-500 ${useCase.style}`}
              >
                {/* Background Image with Parallax */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <motion.div 
                    style={{ y: imageY }}
                    className="w-full h-[120%]"
                  >
                    <img 
                      src={useCase.image} 
                      alt="" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 h-full flex flex-col justify-end min-h-[420px]">
                  <div className="mb-4 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-beacon-600 group-hover:scale-110 transition-all" style={{ borderRadius: '2px' }}>
                    {useCase.icon}
                  </div>

                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-beacon-300 transition-colors">
                    {useCase.title}
                  </h3>

                  <p className="text-gray-200 mb-6 leading-relaxed text-lg">
                    {useCase.description}
                  </p>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-2">
                    {useCase.stats.map((stat, statIndex) => (
                      <span
                        key={statIndex}
                        className="px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white font-medium"
                        style={{ borderRadius: '2px' }}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}