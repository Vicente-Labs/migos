import { eq } from 'drizzle-orm'
import Stripe from 'stripe'

import { PLANS } from '@/config/plans'
import { db } from '@/db'
import { users } from '@/db/schemas'
import { env } from '@/env'

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

type UserSubscriptionPlan = {
  plan: 'FREE' | 'PRO'
  isSubscribed: boolean
  isCanceled: boolean
  stripeCurrentPeriodEnd: Date | null
}

export async function getUserSubscriptionPlan(
  userId: string,
): Promise<UserSubscriptionPlan> {
  if (!userId)
    return {
      plan: 'FREE',
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    }

  const dbUser = await db.select().from(users).where(eq(users.id, userId))

  if (!dbUser || dbUser.length === 0) throw new Error('User not found')

  const isSubscribed = Boolean(
    dbUser[0].stripePriceId &&
      dbUser[0].stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser[0].stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now(),
  )

  const isSA = dbUser[0].continent === 'SA'

  const plan = isSubscribed
    ? PLANS.find(
        (plan) =>
          plan.priceIds[isSA ? 'SA_PRICE_ID' : 'NOT_SA_PRICE_ID'] ===
          dbUser[0].stripePriceId,
      )
    : null

  if (!plan)
    return {
      plan: 'FREE',
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    }

  let isCanceled = false
  if (isSubscribed && dbUser[0].stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser[0].stripeSubscriptionId,
    )

    isCanceled = stripePlan.cancel_at_period_end
  }

  return {
    plan: 'PRO',
    isSubscribed,
    isCanceled,
    stripeCurrentPeriodEnd: dbUser[0].stripeCurrentPeriodEnd,
  }
}
