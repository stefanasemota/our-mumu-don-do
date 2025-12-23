'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { handleLoginAction } from '@/app/admin-login/actions';


// This is the component used on line 43
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
    >
      {pending ? "Authenticating..." : "Login to Dashboard"}
    </button>
  );
}

export function LoginForm() {
  // Connect the server action to the form state
  const [state, formAction] = useFormState(handleLoginAction, null );
  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-2">
        <input 
          name="password" // CRITICAL: This must match 'password' in your library
          type="password" 
          placeholder="••••••••"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
      
      {state?.error && (
         <p className="text-sm text-red-500">{state.error}</p>
      )}

     {/* 4. Use the name defined above */}
     <LoginButton />
    </form>
  );
}
