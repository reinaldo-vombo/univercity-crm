'use client'

import { useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { createQueryString } from "@/lib/helper"
import { Button } from "../ui/button"
const notificationType = [
   {
      lable: 'Todos',
      value: 'all'
   },
   {
      lable: 'Actividades',
      value: 'activitys',
   },
   {
      lable: 'Pagametos',
      value: 'paymets',
   },
]

const MessageFilter = () => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const query = searchParams.get('type');
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   const onChange = (queryName: string, queryValue: string) => {
      router.push(pathname + '?' + generateQueryString(queryName, queryValue), { scroll: false })
   }
   return (
      <div className="flex items-center gap-4 p-3">
         {notificationType.map((type) => (
            <div className="flex items-center " key={type.value}>
               <Button
                  className="rounded-lg"
                  variant={query === type.value ? 'secondary' : 'default'}
                  onClick={() => onChange('type', type.value)}
               >
                  {type.lable}
               </Button>
            </div>
         ))}
      </div>
   )
}

export default MessageFilter;
