// hooks/usePermission.ts
'use client';
import { useSession } from 'next-auth/react';
import { Action, hasPermission, Subject } from '../helper/auth/permissions';

export function usePermission(action: Action, subject: Subject) {
  const { data: session } = useSession();
  return hasPermission(session?.user?.permissions ?? [], action, subject);
}
