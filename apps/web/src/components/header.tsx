'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

import { useLanguage } from '@/context/language'
import { cn } from '@/lib/utils'

import { LangSwitcher } from './lang-switcher'
import { MobileHeader } from './mobile-header'
import { MobileHeaderDrawer } from './mobile-header-drawer'
import { buttonVariants } from './ui/button'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const { language } = useLanguage()

  return (
    <>
      <motion.header
        className="text-smooth m-10 hidden items-center justify-between font-poppins md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/" className="font-cooperBlack text-3xl font-semibold">
            migos
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-4 text-xl font-medium"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="#about-us"
                scroll={true}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'transition-all duration-300 hover:bg-primary/10',
                )}
              >
                about us
              </Link>
            </li>
            <li>
              <Link
                href="#blog"
                scroll={true}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'transition-all duration-300 hover:bg-primary/10',
                )}
              >
                blog
              </Link>
            </li>
          </ul>

          <LangSwitcher />

          <span className="h-6 w-px rounded-full bg-foreground/20" />

          <div className="flex items-center gap-4">
            <Link
              href={`/${language}/sign-in`}
              className={cn(
                buttonVariants({ variant: 'outline' }),
                'transition-all duration-300 hover:bg-primary/10',
              )}
            >
              sign in
            </Link>
            <Link
              href={`/${language}/sign-up`}
              className={cn(buttonVariants({ variant: 'default' }), 'w-44')}
            >
              sign up
            </Link>
          </div>
        </motion.div>
      </motion.header>

      <MobileHeader setIsOpen={setIsOpen} />

      <MobileHeaderDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
