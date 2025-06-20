"use client"

import React, { useState, useEffect } from "react"

import { Calendar } from "@/components/ui/calendar"

type TProps = {
   captionLayout: React.ComponentProps<typeof Calendar>["captionLayout"];
   formField?: any;
};
const Calendar13 = ({ captionLayout, formField }: TProps) => {
   const [date, setDate] = useState<Date | undefined>(new Date(2025, 5, 12));
   useEffect(() => {
      if (formField?.value) {
         setDate(new Date(formField.value)); // Make sure formField.value is in a valid Date format
      }
   }, [formField?.value]);

   const handleDateChange = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      if (formField?.onChange) {
         formField.onChange(selectedDate); // Update form field value on date change
      }
   };
   return (
      <div className="flex flex-col gap-4">
         <Calendar
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

export default Calendar13
