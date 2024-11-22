import { eq } from 'drizzle-orm'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { db } from '@/db'
import { users } from '@/db/schemas'
import { NotFoundError } from '@/http/_errors/not-found-error'

export async function getProfile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId',
    {
      schema: {
        tags: ['geral'],
        params: z.object({ userId: z.string() }),
        description: 'Get user profile',
        response: {
          200: z.object({
            provider: z.enum(['GOOGLE']).nullable(),
            id: z.string(),
            name: z.string(),
            email: z.string(),
            passwordHash: z.string().nullable(),
            avatarUrl: z.string().nullable(),
            providerId: z.string().nullable(),
            updatedAt: z.date(),
            createdAt: z.date(),
          }),
        },
      },
    },
    async (req, res) => {
      const { userId } = req.params

      const user = await db.query.users.findFirst({
        where: eq(users.id, userId),
      })

      if (!user) throw new NotFoundError('user not found')

      return res.status(200).send(user)
    },
  )
}
