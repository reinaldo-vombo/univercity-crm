import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { TSheetProps } from "./types"
import { useRouter, useSearchParams } from "next/navigation"

const SheetModal = ({ children, trigger, description, className, side, triggerStyle, title }: TSheetProps) => {

  const searchParams = useSearchParams();
  const router = useRouter();

  const isOpen = searchParams.get("sheet") === "true";

  const setOpen = (open: boolean) => {
    const params = new URLSearchParams(searchParams.toString())
    if (open) {
      params.set("sheet", "true")
    } else {
      params.delete("sheet")
    }
    router.replace(`?${params.toString()}`)
  }
  return (
    <Sheet onOpenChange={setOpen} open={isOpen}>
      <SheetTrigger className={`${triggerStyle} p-2 cursor-pointer`}>
        {trigger}
      </SheetTrigger>
      <SheetContent side={side} className={`${className} rounded-lg`}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription className="sr-only">
            {description || 'Contente Modal'}
          </SheetDescription>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>

  )
}

export default SheetModal
