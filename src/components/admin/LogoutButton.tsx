'use client';

import { logout } from '@/app/admin-login/actions';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useTransition } from 'react';

export function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  const onLogoutClick = () => {
    startTransition(async () => {
      await logout();
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
      {isPending ? 'Signing out...' : 'Logout'}
    </Button>
  );
}
