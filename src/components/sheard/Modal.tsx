import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"

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
               <DialogTitle>{title}</DialogTitle>
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
