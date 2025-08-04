import { useRouter } from '@tanstack/react-router';
import { useEffect, type ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading, session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user || !session) {
      router.navigate({ to: '/login' });
      return;
    }
  }, [user, session, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!user || !session) {
    return null;
  }

  return <>{children}</>;
}