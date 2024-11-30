import { useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'

import { api } from '@/axios'

interface User {
  id: number
  name: string
  username: string
  avatarUrl?: string | null
  updatedAt: string
  createdAt: string
}

interface AuthContextData {
  user: User | null
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  isAuthenticated: false,
})

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(async () => {
    const { data } = await api.get('/users/me')

    setUser(data)
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
