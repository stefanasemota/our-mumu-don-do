'use client';

import { handleLogoutAction } from '@/app/admin-login/actions'; // Import the ACTION, not the library
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useTransition } from 'react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const onLogoutClick = () => {
    // startTransition tells Next.js to handle the redirect smoothly
    startTransition(async () => {
      await handleLogoutAction();
    });
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onLogoutClick}
      disabled={isPending}
      className="text-muted-foreground hover:text-destructive"
    >
      <LogOut className="mr-2 h-4 w-4" />
      {isPending ? "Signing out..." : "Logout"}
    </Button>
  );
}