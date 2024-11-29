import { app } from '@/http/server'

describe('Authenticate with Google (e2e)', () => {
  // we can only test a bad request because we cannot generate a valid code using googleapis

  it('should return 400 when code is invalid', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/authenticate/google',
      query: {
        code: 'invalid-code',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(JSON.parse(response.payload)).toEqual({
      message: 'Invalid or expired authorization code',
    })
  })
})
