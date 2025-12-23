'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { login } from '@/app/admin-login/actions';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Authenticating...' : 'Login to Dashboard'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, { error: "" });
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          id="password"
          name="password" // This MUST match the library
          type="password"
          placeholder="••••••••"
          required
        />
      </div>

      {/* 2. Simplified Error Display */}
      {state?.error && (
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Login Failed</AlertTitle>
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <LoginButton />
    </form>
  );
}
