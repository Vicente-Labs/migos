'use client'

import { CTASection } from '@/components/sections/cta-section'
import { FeaturesSection } from '@/components/sections/features-section'
import { OurMissionSection } from '@/components/sections/our-mission-section'
import { PaperworkSection } from '@/components/sections/paperwork-section'

export default function Home() {
  return (
    <main className="font-cooperBlack">
      <CTASection />

      <PaperworkSection />

      <OurMissionSection />

      <FeaturesSection />
    </main>
  )
}
