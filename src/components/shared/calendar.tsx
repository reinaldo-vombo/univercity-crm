"use client"

import React, { useState, useEffect } from "react"

import { Calendar as RootCalendar } from "@/components/ui/calendar"

type TProps = {
   captionLayout: React.ComponentProps<typeof RootCalendar>["captionLayout"];
   formField?: any;
};
const Calendar = ({ captionLayout, formField }: TProps) => {
   const [date, setDate] = useState<Date | undefined>(new Date(2026, 5, 12));

   useEffect(() => {
      if (formField?.value) {
         setDate(new Date(formField.value));
      }
   }, [formField?.value]);

   const handleDateChange = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      if (formField?.onChange) {
         formField.onChange(selectedDate);
      }
   };
   return (
      <div className="flex flex-col gap-4">
         <RootCalendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={handleDateChange}
            captionLayout={captionLayout}
            className="rounded-lg border shadow-sm"
         />
      </div>
   )
}

export default Calendar;
