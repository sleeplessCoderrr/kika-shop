import { useRouter } from '@tanstack/react-router'
import { useEffect, type ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading, session } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (!user || !session) {
      router.navigate({ to: '/login' })
      return
    }

    if (requireAdmin) {
      const userRole = user.user_metadata?.role || user.app_metadata?.role
      if (userRole !== 'admin') {
        router.navigate({ to: '/' })
        return
      }
    }
  }, [user, session, loading, router, requireAdmin])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    )
  }

  if (!user || !session) {
    return null
  }

  if (requireAdmin) {
    const userRole = user.user_metadata?.role || user.app_metadata?.role
    if (userRole !== 'admin') {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
  }

  return <>{children}</>
}