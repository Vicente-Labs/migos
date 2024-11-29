import { faker } from '@faker-js/faker'

import { db } from '../../src/db'
import { users } from '../../src/db/schemas'

function makeUserData(data: Partial<typeof users.$inferInsert> = {}) {
  return {
    ...data,
    name: data.name ?? faker.person.fullName(),
    email: data.email?.toLowerCase() ?? faker.internet.email().toLowerCase(),
  }
}

export async function makeUser(
  data: Partial<typeof users.$inferInsert> = {},
): Promise<{ id: string; name: string; email: string }> {
  const userData = makeUserData(data)

  const [user] = await db.insert(users).values(userData).returning()

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
}
