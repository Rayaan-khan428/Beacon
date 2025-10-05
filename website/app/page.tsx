'use client'

import HeroSection from '@/components/sections/HeroSection'
import ProblemSection from '@/components/sections/ProblemSection'
import SolutionSection from '@/components/sections/SolutionSection'
import FeaturesSection from '@/components/sections/FeaturesSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import UseCasesSection from '@/components/sections/UseCasesSection'
import TechStackSection from '@/components/sections/TechStackSection'
import ScreenshotsSection from '@/components/sections/ScreenshotsSection'
import StatsSection from '@/components/sections/StatsSection'
import SafetySection from '@/components/sections/SafetySection'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <FeaturesSection />
      <ComparisonSection />
      <UseCasesSection />
      <TechStackSection />
      <ScreenshotsSection />
      <StatsSection />
      <SafetySection />
      <CTASection />
      <Footer />
    </main>
  )
}
