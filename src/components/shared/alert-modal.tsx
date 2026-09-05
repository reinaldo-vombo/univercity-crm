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

import { AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const AlertModal = ({ trigger, action, description, disabled = false }: TAlertProps) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger
            disabled={disabled}
            className="cursor-pointer disabled:cursor-default disabled:opacity-50"
            aria-label="Botão de excluir"
         >
            {trigger}
         </AlertDialogTrigger>
         <AlertDialogContent className="sm:max-w-[420px]">
            <AlertDialogHeader>
               <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
                  <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
               </div>
               <AlertDialogTitle className="text-center text-lg">
                  Você tem certeza?
               </AlertDialogTitle>
               <AlertDialogDescription className="text-center">
                  {description
                     ? description
                     : "Esta ação não pode ser desfeita. Isso removerá seus dados permanentemente do servidor."}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-2 sm:justify-center">
               <AlertDialogCancel className="cursor-pointer">
                  Cancelar
               </AlertDialogCancel>
               <AlertDialogAction
                  onClick={action}
                  className={cn(
                     "cursor-pointer bg-red-600 text-white hover:bg-red-700",
                     "focus-visible:ring-red-600"
                  )}
               >
                  Continuar
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default AlertModal
