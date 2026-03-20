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

const AlertModal = ({ trigger, action, description, disabled = false }: TAlertProps) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger disabled={disabled} className="cursor-pointer disabled:cursor-default" aria-label="Botão de excluir">{trigger}</AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
               <AlertDialogDescription>
                  {description ? description : 'Esta ação não pode ser desfeita. e removerá seus dados do servidore.'}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel className="bg-red-500">Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default AlertModal
