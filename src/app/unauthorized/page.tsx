// app/unauthorized/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function UnauthorizedPage() {
   const router = useRouter();

   return (
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
         <Lock className="h-16 w-16 text-red-500 mb-4" />
         <h1 className="text-3xl font-bold mb-2">Unauthorized</h1>
         <p className="text-muted-foreground mb-6">
            You do not have permission to view this page.
         </p>
         <Button onClick={() => router.push("/")}>Go back home</Button>
      </div>
   );
}
