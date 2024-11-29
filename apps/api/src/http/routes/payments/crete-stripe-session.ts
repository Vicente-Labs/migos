import { eq } from 'drizzle-orm'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { PLANS } from '@/config/plans'
import { db } from '@/db'
import { users } from '@/db/schemas'
import { env } from '@/env'
import { BadRequestError } from '@/http/_errors/bad-request-errors'
import { auth } from '@/http/middlewares/auth'
import { stripe } from '@/lib/stripe'

export async function createStripeSessionRoute(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/create-stripe-session',
      {
        schema: {
          tags: ['payments'],
          summary: 'Generate a Stripe Session',
          body: z.object({
            plan: z.enum(['PRO']),
          }),
          response: {
            303: z.object({
              message: z.enum([
                'Checkout session created successfully',
                'Billing portal session created successfully',
              ]),
              sessionUrl: z.string(),
            }),
            400: z.object({
              message: z.enum(['User not found', 'Validation error']),
              errors: z
                .object({
                  plan: z.array(z.string()).optional(),
                })
                .optional(),
            }),
            500: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (req, res) => {
        const { sub: userId } = await req.getCurrentUserId()

        const { plan } = req.body

        const user = await db.select().from(users).where(eq(users.id, userId))

        if (!user) throw new BadRequestError('User not found')

        if (user[0].stripeCustomerId && user[0].plan === 'PRO') {
          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: user[0].stripeCustomerId,
            return_url: `${env.NEXT_PUBLIC_BASE_URL}/dashboard`,
          })

          if (!stripeSession.url)
            throw new Error('Billing portal session not created')

          return res.status(303).send({
            message: 'Billing portal session created successfully',
            sessionUrl: stripeSession.url,
          })
        }

        const pricesIds = PLANS.find((p) => p.name === plan)?.priceIds

        const price =
          user[0].continent === 'SA'
            ? pricesIds?.SA_PRICE_ID
            : pricesIds?.NOT_SA_PRICE_ID

        const stripeSession = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          mode: 'subscription',
          billing_address_collection: 'auto',
          metadata: { userId },
          line_items: [
            {
              price,
              quantity: 1,
            },
          ],
          success_url: `${env.NEXT_PUBLIC_BASE_URL}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${env.NEXT_PUBLIC_BASE_URL}/order-rejected`,
        })

        if (!stripeSession.url) throw new Error('Checkout session not created')

        return res.status(303).send({
          message: 'Checkout session created successfully',
          sessionUrl: stripeSession.url,
        })
      },
    )
}
