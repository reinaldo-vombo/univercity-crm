'use client';

import { signOut, useSession } from "next-auth/react";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

export interface AutoLogoutProviderProps {
   requireSession?: boolean;
}

export function AutoLogoutProvider({ children }: PropsWithChildren<AutoLogoutProviderProps>) {
   const { data: session, status } = useSession()
   console.log('auth-guard');

   useEffect(() => {
      if (status !== "authenticated" || !session) {
         // maybe you want to do something more here...
         return;
      }

      const expiry =
         session.expiresAt ?
            session.expiresAt * 1000
            : new Date(session.expiresAt).getTime();

      const now = Date.now()
      const timeout = expiry - now;

      if (timeout <= 0) {
         signOut();
         toast.warning('Sua sessão expirou, faça o login de novo')
         return
      }

      const timer = setTimeout(() => signOut())

      return () => clearTimeout(timer)
   }, [status, session])

   return <>{children}</>

}