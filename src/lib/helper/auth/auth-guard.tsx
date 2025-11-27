'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function SessionChecker() {
   const { data: session, status } = useSession()
   console.log('auth-guard');

   useEffect(() => {
      if (status === "authenticated" && session?.expiresAt) {
         console.log({ status, session });

         const expirationTime = new Date(session?.expiresAt);
         const currentTime = new Date()
         if (currentTime > expirationTime) {
            toast.warning('Sua sessão expirou, faça o login de novo');
            signOut({ callbackUrl: '/' })
         }
      }
   }, [session, status])

   return null;

}