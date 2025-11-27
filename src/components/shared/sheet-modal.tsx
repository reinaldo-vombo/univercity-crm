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
import { ScrollArea } from "../ui/scroll-area";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { useSheet } from "@/providers/sheet-provider";

const SheetModal = ({ children, trigger, description, className, id, side, triggerStyle, title }: TSheetProps) => {
  const { close, open, openSheetId } = useSheet();
  const isOpen = openSheetId === id;
  function onChange(value: boolean) {
    if (value) {
      open(id)
    }
    else {
      close()
    }
  }


  return (
    <Sheet onOpenChange={(state) => onChange(state)} open={isOpen}>
      <SheetTrigger className={`${triggerStyle} p-2 cursor-pointer`} aria-label="sheet modal trigger button">
        {trigger}
        <Separator />
      </SheetTrigger>
      <SheetContent side={side} className={`${className} rounded-lg`}>
        <ScrollArea className='h-full'>
          <SheetHeader>
            <SheetTitle>
              <div className="flex items-center">
                <div className="w-fit rounded-lg p-1">
                  <Image src='/logo.svg' width={60} height={60} alt="logo" />
                </div>
                {title}
              </div>
            </SheetTitle>
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
