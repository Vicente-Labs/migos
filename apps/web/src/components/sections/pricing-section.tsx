'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, CircleCheck, XCircle } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { useLanguage } from '@/context/language'

export function PricingSection() {
  const { dictionary } = useLanguage()

  return (
    <motion.section
      id="plans"
      className="flex flex-col items-center gap-8 px-4 py-12 sm:px-6 md:gap-12 lg:px-8 xl:px-20 xl:py-24"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="grid w-full max-w-7xl gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative flex h-full flex-col justify-between rounded-lg bg-primary p-6 sm:p-8 lg:p-10"
        >
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-background sm:text-4xl lg:text-5xl">
                {dictionary.basic}
              </h2>

              <div className="mt-2">
                <span className="text-4xl font-bold text-background sm:text-5xl lg:text-6xl">
                  free
                </span>
                <span className="ml-1 text-sm text-background sm:text-base lg:text-lg">
                  / group
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col text-background">
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.upTo5MembersPerGroup}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <CircleCheck className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.basicNotifications}
                  </span>
                </li>

                <li className="flex items-center gap-3 text-[#B8BBB3] line-through">
                  <XCircle className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.personalizedAnnouncements}
                  </span>
                </li>

                <li className="flex items-center gap-3 text-[#B8BBB3] line-through">
                  <XCircle className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.reroll}
                  </span>
                </li>

                <li className="flex items-center gap-3 text-[#B8BBB3] line-through">
                  <XCircle className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.prioritySupport}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Button className="w-full border border-primary bg-background py-3 text-base font-semibold text-primary transition hover:bg-background/90 sm:py-4 sm:text-lg">
              <Link href="/sign-up?plan=pro">{dictionary.getStarted}</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="relative flex h-full flex-col justify-between rounded-lg bg-primary p-6 sm:p-8 lg:p-10"
        >
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-background sm:text-4xl lg:text-5xl">
                {dictionary.pro}
              </h2>

              <div className="mt-2">
                <span className="text-4xl font-bold text-background sm:text-5xl lg:text-6xl">
                  $6.70
                </span>
                <span className="ml-1 text-sm text-background sm:text-base lg:text-lg">
                  / group
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col text-background">
              <span className="mb-4 text-sm sm:text-base">
                everything in basic and:
              </span>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.unlimitedMembersPerGroup}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.personalizedAnnouncements}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.giftSuggestions}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.reroll}
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <CheckCircle2 className="size-5" />
                  <span className="text-sm sm:text-base">
                    {dictionary.prioritySupport}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <Button className="w-full border border-primary bg-background py-3 text-base font-semibold text-primary transition hover:bg-background/90 sm:py-4 sm:text-lg">
              <Link href="/sign-up?plan=pro">{dictionary.getPro}</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
