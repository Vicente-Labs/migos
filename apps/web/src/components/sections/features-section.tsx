'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { Button } from '@/components/ui/button'

export function FeaturesSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center gap-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl text-center">
            <motion.h2
              className="mb-6 font-bold md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why Choose Migos?
            </motion.h2>

            <motion.p
              className="font-poppins text-xl font-medium text-[#848780]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Effortlessly organize your Secret Santa with our powerful
              features, crafted for seamless and enjoyable gift exchanges.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Group Management"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">Group Management</h3>
              <p className="font-poppins font-medium text-[#848780]">
                Effortlessly create and manage multiple Secret Santa groups with
                customizable budgets and deadlines tailored to your needs.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Invitation Management"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">Effortless Invitations</h3>
              <p className="font-poppins font-medium text-[#848780]">
                Invite your friends with just a few simple clicks, making the
                process quick and enjoyable.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Gift Matching"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">Smart Gift Matching</h3>
              <p className="font-poppins font-medium text-[#848780]">
                Effortlessly connect your friends with their ideal Secret Santa
                gifts, ensuring everyone is delighted.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-lg transition-all hover:shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <Image
                src="/features/groups.png"
                alt="Gift Tip"
                width={500}
                height={500}
                className="mb-6 rounded-xl shadow-md transition-transform group-hover:scale-105"
                priority
                quality={100}
              />
              <h3 className="text-2xl">Personalized Gift Tips</h3>
              <p className="font-poppins font-medium text-[#848780]">
                Receive tailored gift suggestions for your Secret Santa group,
                making every present even more special.
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button size="lg">start your Secret Santa adventure</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
