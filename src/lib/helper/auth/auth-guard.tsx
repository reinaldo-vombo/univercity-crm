'use client';

import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { toast } from "sonner";

export const SessionGuard = () => {
   const { data: session } = useSession();

   useEffect(() => {
      if (!session) return;

      const error = (session as any).error;
      // console.log('guard', session.error);


      if (error === "RefreshTokenError") {
         toast.warning("Sessão encerrada — faz login novamente");
         signOut({ callbackUrl: "/auth/login" });
         return;
      }

      // ✅ Tratar 401 de conta eliminada/inactiva
      if (error === "SessionInvalid") {
         toast.error("A tua conta foi desactivada — contacta o administrador");
         signOut({ callbackUrl: "/auth" });
      }

   }, [session, session?.error]);


   return null;
}