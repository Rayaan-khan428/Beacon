'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { Send, ArrowRight } from 'lucide-react'

export default function CTASection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [testMessage, setTestMessage] = useState('')
  const twilioNumber = '+15794010314'

  const handleSend = () => {
    if (!testMessage.trim()) return
    const sms = `sms:${twilioNumber}&body=${encodeURIComponent(testMessage)}`
    window.location.href = sms
  }

  return (
    <section className="section-blue py-24" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-6">
              Try Beacon Now
            </h2>
            <p className="subheading mx-auto">
              Send a message to our satellite-connected number and receive AI-powered guidance instantly
            </p>
          </div>

          {/* Message Composer */}
          <div className="card-highlight mb-8">
            <div className="mb-6">
              <label className="block font-semibold text-gray-900 mb-3">
                Compose Your Message
              </label>
              <textarea
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                placeholder="e.g., weather 37.7749,-122.4194"
                className="w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-beacon-500 focus:border-transparent resize-none font-mono text-sm transition-all"
                rows={3}
              />
              <div className="flex justify-between mt-3">
                <span className="text-sm text-gray-600">
                  {testMessage.length} characters
                </span>
                <span className="text-sm font-semibold text-gray-700">
                  Est. cost: ${(Math.ceil(testMessage.length / 160) * 0.50).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-gradient-to-r from-beacon-50 to-blue-50 rounded-xl">
              <div className="text-left">
                <p className="text-sm text-gray-600 mb-1">Send to:</p>
                <p className="text-xl font-mono font-bold text-beacon-600">{twilioNumber}</p>
              </div>

              <button
                onClick={handleSend}
                disabled={!testMessage.trim()}
                className="btn-primary group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-soft"
              >
                <Send className="w-5 h-5" />
                Send Message
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Example Queries */}
          <div className="mb-12">
            <p className="text-sm font-semibold text-gray-700 mb-4 text-center">Quick Examples:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                'weather 40.7128,-74.0060',
                'hypothermia symptoms',
                'water purification',
                'snake bite first aid',
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setTestMessage(example)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 hover:border-beacon-300 hover:text-beacon-700 transition-all font-mono shadow-soft"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* App Download */}
          <div className="text-center pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4 font-medium">Or download the iOS app for the full experience</p>
            <button className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all font-semibold shadow-medium hover:shadow-large">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <div className="text-xs opacity-90">Download on the</div>
                <div className="text-base font-bold">App Store</div>
              </div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}