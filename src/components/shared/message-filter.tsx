'use client'

import { useCallback } from "react"
import Card from "./card"
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
      <Card>
         <div className="flex items-center">
            {notificationType.map((type) => (
               <div className="flex items-center justify-around" key={type.value}>
                  <Button
                     variant={query === type.value ? 'secondary' : 'default'}
                     onClick={() => onChange('type', type.value)}
                  >
                     {type.lable}
                  </Button>
               </div>
            ))}
         </div>
      </Card>
   )
}

export default MessageFilter;
