'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { startTransition } from 'react'

type TProps = {
  error: Error & { digest?: string };
  reset: () => void
}

export default function Error({ error, reset }: TProps) {
  const router = useRouter()
  const reloadWindows = () => {
    startTransition(() => {
      console.log('relod');
      router.refresh();
      reset()
    })
  }

  return (
    <div className="col-span-12 mx-auto h-screen w-full max-w-[242px] text-center sm:max-w-[562px]">
      <div className="flex items-center h-full flex-col justify-center">
        <h1 className="mb-8 font-bold text-primary text-title-md xl:text-title-2xl">
          Service Unavailable
        </h1>
        <h2 className="mb-8 font-bold text-primary text-title-md xl:text-title-2xl">
          {error.message}
        </h2>
        <Image
          src="/500.svg"
          width={562}
          height={156}
          alt="erro code 500"
        />
        {/* <img src="src/images/error/500-dark.svg" alt="500" className="hidden dark:block"/> */}

        <p className="mt-10 mb-6 text-base text-primary sm:text-lg">
          Our servers are currently unreachable. Please try again later.
        </p>

        <Button className='cursor-pointer' onClick={reloadWindows}>try again</Button>
      </div>
    </div>

  )
}
