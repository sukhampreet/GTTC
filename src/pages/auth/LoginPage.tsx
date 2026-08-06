import { Navigate } from 'react-router-dom';

import { LoginBrandPanel } from '@/pages/auth/components/LoginBrandPanel';
import { LoginForm } from '@/pages/auth/components/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

export function LoginPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={ROUTES.dashboard} replace />;
  }

  return (
    <div className="grid h-screen w-screen grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
      <LoginBrandPanel />
      <LoginForm />
    </div>
  );
}
