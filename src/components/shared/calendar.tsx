"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
   InputGroup,
   InputGroupAddon,
   InputGroupInput,
} from "@/components/ui/input-group"
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type TTimeRange = {
   start: string
   end: string
}

type TProps = {
   formField?: {
      value?: Date | string
      onChange?: (value: Date | undefined) => void
   }
   /** Mostra os campos de horário início/fim abaixo do calendário */
   withTime?: boolean
   /** Renderiza dentro de um Popover (bom pra economizar espaço) em vez de inline */
   asPopover?: boolean
   /** Callback opcional pra quem precisar do horário selecionado */
   onTimeChange?: (range: TTimeRange) => void
   placeholder?: string
   className?: string
}

const DatePicker = ({
   formField,
   withTime = false,
   asPopover = false,
   onTimeChange,
   placeholder = "Selecione uma data",
   className,
}: TProps) => {
   const [date, setDate] = useState<Date | undefined>(
      formField?.value ? new Date(formField.value) : undefined
   )
   const [open, setOpen] = useState(false)
   const [time, setTime] = useState<TTimeRange>({
      start: "10:30:00",
      end: "12:30:00",
   })

   useEffect(() => {
      if (formField?.value) {
         setDate(new Date(formField.value))
      }
   }, [formField?.value])

   const handleDateChange = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      formField?.onChange?.(selectedDate)
      if (asPopover && !withTime) setOpen(false)
   }

   const handleTimeChange = (key: keyof TTimeRange, value: string) => {
      const next = { ...time, [key]: value }
      setTime(next)
      onTimeChange?.(next)
   }

   const content = (
      <Card className={cn("w-fit", !asPopover && "mx-auto", className)}>
         <CardContent className="sm:max-w-sm">
            <Calendar
               mode="single"
               selected={date}
               onSelect={handleDateChange}
               className="p-0"
            />
         </CardContent>
         {withTime && (
            <CardFooter className="border-t bg-card">
               <FieldGroup>
                  <Field>
                     <FieldLabel htmlFor="time-from">Horário inicial</FieldLabel>
                     <InputGroup>
                        <InputGroupInput
                           id="time-from"
                           type="time"
                           step="1"
                           value={time.start}
                           onChange={(e) => handleTimeChange("start", e.target.value)}
                           className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                        <InputGroupAddon>
                           <Clock2Icon className="text-muted-foreground" />
                        </InputGroupAddon>
                     </InputGroup>
                  </Field>
                  <Field>
                     <FieldLabel htmlFor="time-to">Horário final</FieldLabel>
                     <InputGroup>
                        <InputGroupInput
                           id="time-to"
                           type="time"
                           step="1"
                           value={time.end}
                           onChange={(e) => handleTimeChange("end", e.target.value)}
                           className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                        />
                        <InputGroupAddon>
                           <Clock2Icon className="text-muted-foreground" />
                        </InputGroupAddon>
                     </InputGroup>
                  </Field>
               </FieldGroup>
            </CardFooter>
         )}
      </Card>
   )

   if (!asPopover) return content

   const label = date
      ? withTime
         ? `${format(date, "dd/MM/yyyy")} · ${time.start.slice(0, 5)} - ${time.end.slice(0, 5)}`
         : format(date, "dd/MM/yyyy")
      : placeholder

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               className={cn(
                  "w-fit justify-start gap-2 font-normal cursor-pointer",
                  !date && "text-muted-foreground"
               )}
            >
               <CalendarIcon className="size-4" />
               {label}
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-auto p-0" align="start">
            {content}
         </PopoverContent>
      </Popover>
   )
}

export default DatePicker