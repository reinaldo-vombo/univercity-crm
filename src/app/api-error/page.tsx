// app/api-down/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ApiDownPage() {
   const router = useRouter();

   return (

      <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[562px]">
         <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
            Service Unavailable
         </h1>
         <Image
            src="/500.svg"
            width={562}
            height={156}
            alt="erro code 500"
            className="dark:hidden"
         />
         {/* <img src="src/images/error/500-dark.svg" alt="500" className="hidden dark:block"/> */}

         <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
            Our servers are currently unreachable. Please try again later.
         </p>

         <Button onClick={() => router.push("/")}>Go back home</Button>
      </div>
   );
}
