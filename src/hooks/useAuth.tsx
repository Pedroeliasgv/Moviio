import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { supabase } from '../services/supabase.ts'

interface AuthContextValue {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const isDev = import.meta.env.DEV

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (data.session) {
          setSession(data.session)
          setUser(data.session.user)
        } else if (isDev) {
          const mockUser = {
            id: 'dev-user',
            app_metadata: {},
            aud: 'authenticated',
            created_at: new Date().toISOString(),
            email: 'teste@moviio.com',
            email_confirmed_at: new Date().toISOString(),
            phone: undefined,
            phone_confirmed_at: null,
            user_metadata: {
              full_name: 'Usuário de Teste',
            },
            role: 'authenticated',
          } as unknown as User

          const mockSession = {
            access_token: 'mock-access-token',
            token_type: 'bearer',
            expires_in: 3600,
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            refresh_token: 'mock-refresh-token',
            provider_token: null,
            user: mockUser,
          } as Session

          setSession(mockSession)
          setUser(mockUser)
        }
        setLoading(false)
      })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession ?? null)
      setUser(newSession?.user ?? null)
      setLoading(false)
    })

    return () => subscription?.subscription.unsubscribe()
  }, [isDev])

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      signIn: async (email: string, password: string) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        return { error }
      },
      signUp: async (email: string, password: string, name: string) => {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
          },
        })
        if (data?.user) {
          await supabase.from('profiles').upsert({ id: data.user.id, full_name: name })
        }
        return { error }
      },
      signOut: async () => {
        await supabase.auth.signOut()
      },
      resetPassword: async (email: string) => {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/login',
        })
        return { error }
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
