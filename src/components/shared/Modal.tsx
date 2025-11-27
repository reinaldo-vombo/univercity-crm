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
   description: string
   title: string
}
const Modal = ({ children, trigger, description, title }: TProps) => {
   return (
      <Dialog>
         <DialogTrigger>{trigger}</DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="flex gap-2 items-center cursor-pointer">
                  <div className="w-fit rounded-lg p-1">
                     <Image src='/logo.svg' width={60} height={60} alt="logo" />
                  </div>
                  {title}
               </DialogTitle>
               <Separator className="my-2" />
               <DialogDescription className="sr-only">
                  {description}
               </DialogDescription>
               {children}
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}

export default Modal
