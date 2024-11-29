import { eq } from 'drizzle-orm'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import Stripe from 'stripe'
import z from 'zod'

import { db } from '@/db'
import { users } from '@/db/schemas'
import { env } from '@/env'
import { BadRequestError } from '@/http/_errors/bad-request-errors'
import { UnauthorizedError } from '@/http/_errors/unauthorized-error'
import { stripe } from '@/lib/stripe'

export async function stripeWebhookRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/stripe-webhook',
    {
      schema: {
        tags: ['payments'],
        summary: 'Stripe webhook',
        body: z.object({
          event: z.string(),
        }),
        headers: z.object({
          'Stripe-Signature': z.string(),
        }),
      },
    },
    async (req, res) => {
      let event: string | Stripe.Event = req.body.event
      const { 'Stripe-Signature': signature } = req.headers

      if (!signature) throw new UnauthorizedError()

      const endpointSecret = env.STRIPE_WEBHOOK_SECRET

      try {
        event = stripe.webhooks.constructEvent(event, signature, endpointSecret)
      } catch (err) {
        return res.status(400).send({ message: 'Webhook error' })
      }

      const session = event.data.object as Stripe.Checkout.Session

      if (!session.metadata?.userId) throw new BadRequestError()

      if (event.type === 'checkout.session.completed') {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        )

        await db
          .update(users)
          .set({
            stripeSubscriptionId: subscription.id,
            stripeCustomerId: subscription.customer as string,
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000,
            ),
          })
          .where(eq(users.id, session.metadata.userId))
      }

      if (event.type === 'invoice.payment_succeeded') {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string,
        )

        await db
          .update(users)
          .set({
            stripeCurrentPeriodEnd: new Date(
              subscription.current_period_end * 1000,
            ),
          })
          .where(eq(users.id, session.metadata.userId))
      }

      return res.status(200).send({ received: true })
    },
  )
}
