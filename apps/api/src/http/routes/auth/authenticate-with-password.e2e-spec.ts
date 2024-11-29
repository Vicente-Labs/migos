import { hash } from 'bcryptjs'

import { makeUser } from '@/../test/factories/make-user'
import { app } from '@/http/server'

describe('Authenticate with password (e2e)', () => {
  it('should be able to authenticate with password', async () => {
    const password = '12345678'

    const { email } = await makeUser({
      passwordHash: await hash(password, 1),
    })

    const response = await app.inject({
      method: 'POST',
      url: '/authenticate/password',
      body: {
        email,
        password,
      },
    })

    expect(response.statusCode).toBe(200)
  })
})
