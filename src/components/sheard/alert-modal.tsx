import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TAlertProps } from "./types"

const AlertModal = ({ trigger, action }: TAlertProps) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger>{trigger}</AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
               <AlertDialogDescription>
                  Esta ação não pode ser desfeita. e removerá seus dados do servidore.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default AlertModal
