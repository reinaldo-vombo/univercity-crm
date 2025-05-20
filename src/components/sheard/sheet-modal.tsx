import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TSheetProps } from "./types"


const SheetModal = ({ children, trigger, description, className, side, triggerStyle, title }: TSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger className={`${triggerStyle} p-2`}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side} className={className}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}

export default SheetModal
