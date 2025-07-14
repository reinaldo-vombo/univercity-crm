// app/not-found.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
   const router = useRouter();

   return (
      <div className="mx-auto h-screen w-full max-w-[242px] my-auto text-center sm:max-w-[562px]">
         <div className="flex flex-col items-center justify-center">
            <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
               Pagina não encontrada
            </h1>
            <Image
               src="/404.svg"
               width={562}
               height={156}
               alt="erro code 500"
               className="dark:hidden" />
            {/* <img src="src/images/error/500-dark.svg" alt="500" className="hidden dark:block"/> */}

            <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
               We can’t seem to find the page you are looking for!
            </p>

            <Button onClick={() => router.push("/")}>Go back home</Button>

         </div>
      </div>
   );
}
