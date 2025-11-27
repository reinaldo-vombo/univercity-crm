'use client'

import { Button } from '@/components/ui/button';
import { createQueryString } from '@/lib/helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback } from 'react'

const filtersButtons = [
   { id: '1', lable: 'Hoje', value: 'today' },
   { id: '2', lable: 'Ontem', value: 'westerday' },
   { id: '3', lable: 'Essa semana', value: 'this week' },
   { id: '4', lable: 'Essa mês', value: 'this mounth' },
]

const FilterActivictys = () => {
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
      <div className="flex items-center mb-4 gap-4">
         {filtersButtons.map((button) => (
            <Button
               type="button"
               onClick={() => onChange('type', button.value)}
               variant={query === button.value ? 'secondary'
                  : 'ghost'}
               key={button.id}>{button.lable}</Button>
         ))}
      </div>
   )
}

export default FilterActivictys
