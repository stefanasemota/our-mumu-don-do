'use client';

import { logout } from '@/app/admin-login/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useTransition } from 'react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    // startTransition handles the "Server Action" call safely from the browser
    startTransition(async () => {
      await logout(); // Call the 'logout' action
    });
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLogout} disabled={isPending}>
      <LogOut className="mr-2 h-4 w-4" />
      {isPending ? "Signing out..." : "Logout"}
    </Button>
  );
}
