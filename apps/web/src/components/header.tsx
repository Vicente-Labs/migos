'use client'

import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useContext } from 'use-context-selector'

import { AuthContext } from '@/context/auth'
import { useLanguage } from '@/context/language'

import { MobileHeader } from './mobile-header'
import { MobileHeaderDrawer } from './mobile-header-drawer'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'

export default function Header() {
  const { isAuthenticated, user } = useContext(AuthContext)

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

        {isAuthenticated && user ? (
          <motion.div
            className="flex items-center gap-4 text-xl font-medium"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button>
              <Plus className="size-4" /> new group
            </Button>

            <Avatar>
              <AvatarImage src={user.avatarUrl || undefined} />
              <AvatarFallback>
                {user.name
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center gap-4 text-xl font-medium"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ul className="flex items-center gap-4">
              <li>
                <Button
                  variant="outline"
                  className="transition-all duration-300 hover:bg-primary/10"
                  asChild
                >
                  <Link href={`/${language}/#about-us`} scroll={true}>
                    about us
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="outline"
                  className="transition-all duration-300 hover:bg-primary/10"
                  asChild
                >
                  <Link href={`/${language}/blog`} scroll={true}>
                    blog
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="outline"
                  className="transition-all duration-300 hover:bg-primary/10"
                  asChild
                >
                  <Link href={`/${language}/#plans`} scroll={true}>
                    plans
                  </Link>
                </Button>
              </li>
            </ul>

            <span className="size-[6px] rounded-full bg-[#4E4F4C]/30" />

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="transition-all duration-300 hover:text-primary"
                asChild
              >
                <Link href="/sign-up">sign in</Link>
              </Button>
              <Button className="px-6 py-0.5 transition-all duration-300 hover:bg-primary/80">
                sign up{' '}
              </Button>
            </div>
          </motion.div>
        )}
      </motion.header>

      <MobileHeader setIsOpen={setIsOpen} />

      <MobileHeaderDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}
