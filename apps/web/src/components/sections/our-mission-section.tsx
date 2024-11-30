'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { toast } from 'sonner'

import { useLanguage } from '@/context/language'

import { Button } from '../ui/button'

export function OurMissionSection() {
  const { dictionary } = useLanguage()

  return (
    <motion.section
      id="about-us"
      className="flex min-h-screen w-full flex-col items-center justify-center gap-8 px-4 py-12 sm:min-h-[80vh] sm:gap-12 md:gap-16 lg:flex-row lg:gap-20 lg:px-8 lg:py-24 xl:gap-[420px] xl:px-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="order-1 flex w-full flex-col items-center gap-6 text-center sm:gap-8 md:gap-10 lg:order-1 lg:w-auto lg:max-w-xl lg:items-start lg:text-left"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center gap-2 sm:gap-3">
          <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl xl:text-6xl">
            {dictionary.ourMission}
          </h1>
          <span className="text-lg text-[#848780] sm:text-xl md:text-2xl xl:text-3xl">
            {dictionary.weWereCreatedToAddPracticalityToYourXmasWith}
          </span>

          <ul className="mt-4 flex flex-col gap-3 sm:gap-4">
            <li className="flex items-center gap-3">
              <span className="text-2xl text-[#848780] sm:text-3xl">•</span>
              <span className="text-base text-[#848780] sm:text-lg md:text-xl">
                {dictionary.effortlessGiftMatching}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl text-[#848780] sm:text-3xl">•</span>
              <span className="text-base text-[#848780] sm:text-lg md:text-xl">
                {dictionary.organizedGroupManagement}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="text-2xl text-[#848780] sm:text-3xl">•</span>
              <span className="text-base text-[#848780] sm:text-lg md:text-xl">
                {dictionary.funAndEngagingFeatures}
              </span>
            </li>
          </ul>
        </div>

        <div className="w-full max-w-xs sm:max-w-sm lg:max-w-md">
          <Button
            onClick={() => {
              toast.error(`We're not launched yet.`)
            }}
            className="w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors sm:py-4 sm:text-base md:px-6 md:py-5 md:text-xl"
          >
            {dictionary.simplifyMyXmas}
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="order-2 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:order-2 lg:max-w-[500px]"
      >
        <Image
          src="/bell.svg"
          alt="Bell"
          width={500}
          height={500}
          className="h-auto w-full drop-shadow-[17px_21px_20px_#00000078]"
          priority
        />
      </motion.div>
    </motion.section>
  )
}
