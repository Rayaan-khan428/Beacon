import type { Metadata } from 'next'
import './globals.css'
import './fonts.css'

export const metadata: Metadata = {
  title: 'Beacon - Your AI Lifeline When Cellular Fails',
  description: 'Emergency intelligence via satellite. Compressed. Smart. Life-saving. Get AI-powered weather updates, wildfire alerts, and survival guidance optimized for satellite messaging.',
  keywords: 'satellite messaging, emergency communication, AI assistant, wildfire alerts, weather updates, backcountry safety',
  authors: [{ name: 'Beacon Team' }],
  openGraph: {
    title: 'Beacon - Emergency AI Assistant for Satellite Messaging',
    description: 'Get AI-powered emergency intelligence when cellular networks fail. Weather, wildfire alerts, and survival guidance optimized for satellite.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">{children}</body>
    </html>
  )
}
