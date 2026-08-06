import { type FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, ShieldAlert, ShieldCheck } from 'lucide-react';

import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

interface FieldErrors {
  username?: string;
  password?: string;
}

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectTo = (location.state as { from?: string } | null)?.from ?? ROUTES.dashboard;

  function validate(): boolean {
    const errors: FieldErrors = {};
    if (!username.trim()) errors.username = 'Username is required';
    if (!password) errors.password = 'Password is required';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    window.setTimeout(() => {
      const result = login({ username, password, rememberMe });
      setIsSubmitting(false);

      if (!result.success) {
        setFormError(result.error ?? 'Invalid username or password');
        return;
      }

      navigate(redirectTo, { replace: true });
    }, 450);
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-canvas px-6 py-12">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-4 flex size-10 items-center justify-center rounded-(--radius-md) border border-border-default bg-surface lg:hidden">
            <ShieldCheck className="size-5 text-primary-400" />
          </div>
          <h2 className="text-xl font-semibold text-text-primary">Welcome Back</h2>
          <p className="mt-1 text-[13px] text-text-secondary">
            Sign in to access the Central Control Platform
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {formError && (
            <div className="flex items-center gap-2 rounded-(--radius-md) border border-danger-600/40 bg-danger-bg px-3 py-2 text-xs text-danger-400">
              <ShieldAlert className="size-4 shrink-0" />
              {formError}
            </div>
          )}

          <div>
            <label htmlFor="username" className="mb-1.5 block text-xs font-medium text-text-secondary">
              Username
            </label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              placeholder="Enter your username"
              value={username}
              invalid={Boolean(fieldErrors.username)}
              onChange={(e) => {
                setUsername(e.target.value);
                if (fieldErrors.username) setFieldErrors((prev) => ({ ...prev, username: undefined }));
              }}
            />
            {fieldErrors.username && (
              <p className="mt-1 text-[11px] text-danger-400">{fieldErrors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-text-secondary">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                invalid={Boolean(fieldErrors.password)}
                className="pr-9"
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-[11px] text-danger-400">{fieldErrors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              Remember Me
            </label>
            <button
              type="button"
              className="text-xs text-primary-400 hover:text-primary-300 hover:underline"
              onClick={() => {}}
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            <LogIn className={cn('size-4', isSubmitting && 'animate-pulse')} />
            {isSubmitting ? 'Signing in…' : 'Login'}
          </Button>
        </form>

        <div className="mt-8 space-y-1 border-t border-border-default pt-4 text-center lg:text-left">
          <p className="text-[11px] text-text-tertiary">Platform Version 1.0.0 · Sprint 1</p>
          <p className="text-[11px] text-text-tertiary">
            &copy; {new Date().getFullYear()} GTTC. Indigenous Smart Security Central Control Platform.
          </p>
        </div>
      </div>
    </div>
  );
}
