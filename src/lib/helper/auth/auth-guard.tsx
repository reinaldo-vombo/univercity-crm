// components/auth/auth-guard.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export function AuthGuard({ children }: { children: React.ReactNode }) {
   const { data: session, status } = useSession();

   useEffect(() => {
      console.log('login', status, session);

      if (status === "authenticated") {
         const expiresAt = session?.user?.expiresAt;

         if (!expiresAt || expiresAt < Math.floor(Date.now() / 1000)) {
            toast.warning("Sua sessão expirou, por favor faca login novamente.");
            console.log("🔐 Session expired — logging out");
            signOut({ callbackUrl: "/" });
         }
      }
   }, [status, session]);

   return <>{children}</>;
}
