import { Button } from "@/components/ui/button";
import {
   Popover as Root,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";

type TPopover = {
   trigger: any,
   children: ReactNode,
   className?: string
}

const Popover = ({ children, trigger, className = 'w-96' }: TPopover) => {
   return (
      <Root>
         <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative flex size-11 items-center justify-center rounded-md border border-border bg-primary-foreground text-gray-500 transition-colors hover:bg-primary">
               {trigger}
            </Button>
         </PopoverTrigger>
         <PopoverContent className={className}>
            {children}
         </PopoverContent>
      </Root>
   )
}

export default Popover;
