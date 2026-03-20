// components/ui/date-range-picker.tsx
"use client"

import * as React from "react"
import { format } from "date-fns"
import { pt } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import {
   Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type TProps = {
   from: Date | undefined | null
   to: Date | undefined | null
   onSelect: (range: DateRange | undefined) => void
   className?: string
   disabled?: boolean
}

export function DatePickerWithRange({
   from,
   to,
   onSelect,
   className,
   disabled,
}: TProps) {
   const [open, setOpen] = React.useState(false)

   const selected: DateRange = {
      from: from ?? undefined,
      to: to ?? undefined,
   }

   const label =
      from && to
         ? `${format(from, "dd MMM", { locale: pt })} – ${format(to, "dd MMM yyyy", { locale: pt })}`
         : from
            ? format(from, "dd MMM yyyy", { locale: pt })
            : "Selecionar período"

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               disabled={disabled}
               className={cn(
                  "w-56 justify-start text-left font-normal",
                  !from && "text-muted-foreground",
                  className,
               )}
            >
               <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
               <span className="truncate">{label}</span>
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="end">
            <Card className="mx-auto w-fit p-0">
               <CardContent className="p-0">
                  <Calendar
                     mode="range"
                     defaultMonth={from ?? undefined}
                     selected={selected}
                     onSelect={(range) => {
                        onSelect(range)
                        // fecha automaticamente quando os dois lados estão preenchidos
                        if (range?.from && range?.to) setOpen(false)
                     }}
                     numberOfMonths={2}
                     disabled={(date) =>
                        date < new Date("1900-01-01")
                     }
                     locale={pt}
                     initialFocus
                  />
               </CardContent>
            </Card>
         </PopoverContent>
      </Popover>
   )
}