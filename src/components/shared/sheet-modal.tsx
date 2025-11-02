'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TSheetProps } from "./types"
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

const SheetModal = ({ children, trigger, description, className, side, triggerStyle, title }: TSheetProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger className={`${triggerStyle} p-2 cursor-pointer`}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side} className={`${className} rounded-lg`}>
        <ScrollArea className='h-full'>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription className="sr-only">
              {description || 'Contente Modal'}
            </SheetDescription>
            {children}
          </SheetHeader>
        </ScrollArea>
      </SheetContent>
    </Sheet>

  )
}

export default SheetModal
