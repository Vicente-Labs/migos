import { createId } from '@paralleldrive/cuid2'
import { relations } from 'drizzle-orm'
import { boolean, pgEnum, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

import { preRegisters } from '.'

export const localeEnum = pgEnum('locale', ['en-US', 'pt-BR', 'es-ES'])

export const providerEnum = pgEnum('provider', ['GOOGLE'])

export const users = pgTable('users', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey(),

  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash'),
  avatarUrl: text('avatar_url'),

  locale: localeEnum('locale').notNull().default('en-US'),

  preRegistered: boolean('pre_registered').notNull().default(false),
  preRegisterId: text('pre_register_id')
    .references(() => preRegisters.id)
    .unique(),

  provider: providerEnum('provider'),
  providerId: text('provider_id').unique(),

  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
})

export const usersRelations = relations(users, ({ one }) => ({
  preRegister: one(preRegisters, {
    fields: [users.preRegisterId],
    references: [preRegisters.id],
  }),
}))
