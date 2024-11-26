import { roleSchema } from '@migos/auth'
import { eq } from 'drizzle-orm'
import type { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { db } from '@/db'
import { groups, member } from '@/db/schemas'
import { auth } from '@/http/middlewares/auth'

const groupSchema = z.object({
  id: z.string(),
  role: roleSchema,
  name: z.string(),
  ownerId: z.string(),
  description: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  budget: z.string(),
  isMember: z.boolean(),
  isOwner: z.boolean(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
})

export async function fetchGroups(app: FastifyInstance) {
  app
    .register(auth)
    .withTypeProvider<ZodTypeProvider>()
    .get(
      '/groups',
      {
        schema: {
          tags: ['group'],
          summary: 'Fetch groups',
          querystring: z.object({ page: z.coerce.number() }),
          response: {
            200: z.object({
              message: z.literal('groups fetched successfully'),
              groups: groupSchema.array(),
            }),
            401: z.object({
              message: z.tuple([
                z.literal('missing auth token'),
                z.literal('invalid auth token'),
              ]),
            }),
            500: z.object({
              message: z.string(),
            }),
          },
        },
      },
      async (req, res) => {
        const { sub: userId } = await req.getCurrentUserId()

        const { page } = req.query

        const fetchedGroups = await db
          .select({
            group: groups,
            member,
          })
          .from(member)
          .where(eq(member.userId, userId))
          .leftJoin(groups, eq(groups.id, member.groupId))
          .offset((page - 1) * 10)
          .limit(10)

        const formattedGroups = fetchedGroups
          .map(({ group, member }) => {
            if (!group) return null

            return {
              ...group,
              isMember: true,
              isOwner: group.ownerId === userId,
              role: member.role,
            }
          })
          .filter((group): group is NonNullable<typeof group> => group !== null)

        return res.status(200).send({
          message: 'groups fetched successfully',
          groups: formattedGroups,
        })
      },
    )
}
