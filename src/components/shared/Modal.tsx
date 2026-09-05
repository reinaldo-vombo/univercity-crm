import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"
import { Separator } from "../ui/separator"

type TProps = {
   children: React.ReactNode
   trigger: React.ReactNode
   description?: string
   title: string
   size?: "sm" | "md" | "lg" | "xlg"
}
const Modal = ({ children, trigger, description, title, size = "md" }: TProps) => {
   return (
      <Dialog>
         <DialogTrigger className="cursor-pointer" aria-label="Abrir modal">
            {trigger}
         </DialogTrigger>
         <DialogContent size={size} className="gap-0 p-0 overflow-hidden">
            <DialogHeader className="p-6 pb-4">
               <DialogTitle className="flex items-center gap-3 text-base">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted shrink-0">
                     <Image
                        src="/SIGU.png"
                        className="dark:invert"
                        width={24}
                        height={24}
                        alt="logo"
                     />
                  </div>
                  <span className="truncate">{title}</span>
               </DialogTitle>
               {description && (
                  <DialogDescription>{description}</DialogDescription>
               )}
            </DialogHeader>

            <Separator />

            <div className="p-6 pt-4">{children}</div>
         </DialogContent>
      </Dialog>
   )
}

export default Modal
