'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cloud, Zap, Brain, CloudRain, Flame, Smartphone, Code, MessageSquare } from 'lucide-react'

export default function TechStackSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const technologies = [
    {
      name: 'AWS Lambda',
      description: 'Serverless compute',
      icon: <Zap className="w-7 h-7" />,
      color: 'from-orange-500 to-orange-600',
    },
    {
      name: 'API Gateway',
      description: 'REST endpoints',
      icon: <Cloud className="w-7 h-7" />,
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Twilio',
      description: 'SMS Gateway',
      icon: <MessageSquare className="w-7 h-7" />,
      color: 'from-red-500 to-red-600',
    },
    {
      name: 'OpenAI GPT-4',
      description: 'AI Intelligence',
      icon: <Brain className="w-7 h-7" />,
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      name: 'OpenWeatherMap',
      description: 'Weather data',
      icon: <CloudRain className="w-7 h-7" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      name: 'NASA FIRMS',
      description: 'Fire detection',
      icon: <Flame className="w-7 h-7" />,
      color: 'from-yellow-500 to-orange-600',
    },
    {
      name: 'Swift/SwiftUI',
      description: 'Native iOS',
      icon: <Smartphone className="w-7 h-7" />,
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      name: 'Python',
      description: 'Backend logic',
      icon: <Code className="w-7 h-7" />,
      color: 'from-blue-400 to-blue-600',
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
            Production-Ready <span className="text-gradient-blue">Architecture</span>
          </h2>
          <p className="subheading mx-auto">
            Built on enterprise-grade infrastructure that scales infinitely
          </p>
        </motion.div>

        {/* Architecture Flow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="card-highlight">
            <div className="grid md:grid-cols-3 gap-8 text-center items-center">
              {/* Mobile App */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white mb-4 shadow-blue">
                  <Smartphone className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">iOS App</h3>
                <p className="text-sm text-gray-600">Swift/SwiftUI</p>
              </div>

              {/* Backend */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-orange-200">
                  <Zap className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">AWS Lambda</h3>
                <p className="text-sm text-gray-600">Python 3.13</p>
              </div>

              {/* AI Services */}
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-200">
                  <Brain className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">AI Services</h3>
                <p className="text-sm text-gray-600">GPT-4 + APIs</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
              className="card group hover:border-beacon-200 text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white shadow-soft group-hover:scale-110 transition-transform`}>
                {tech.icon}
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{tech.name}</h3>
              <p className="text-sm text-gray-600">{tech.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div className="card-blue text-center border-beacon-200">
            <h3 className="text-4xl font-bold text-beacon-600 mb-2">99.9%</h3>
            <p className="text-gray-700 font-semibold">Uptime SLA</p>
          </div>
          <div className="card-blue text-center border-purple-200">
            <h3 className="text-4xl font-bold text-purple-600 mb-2">&lt;3s</h3>
            <p className="text-gray-700 font-semibold">Response Time</p>
          </div>
          <div className="card-blue text-center border-emerald-200">
            <h3 className="text-4xl font-bold text-emerald-600 mb-2">∞</h3>
            <p className="text-gray-700 font-semibold">Concurrent Users</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}