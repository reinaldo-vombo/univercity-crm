
import { toast } from "sonner"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { changePasswordShema } from "@/lib/validation/user"
import { updatedUserPassword } from "@/actions/users"
import { Lock } from "lucide-react"

const ResetForm = () => {
   const form = useForm<z.infer<typeof changePasswordShema>>({
      resolver: zodResolver(changePasswordShema),
      defaultValues: {
         corrent_password: '',
         new_password: '',
         confirm_password: ''
      }
   })
   const [isPending, startTransition] = useTransition();

   async function onSubmit(values: z.infer<typeof changePasswordShema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updatedUserPassword(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });
   }
   return (
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
         <div className="flex items-center gap-2 mb-1">
            <div className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-slate-800">
               <Lock className="size-4" />
            </div>
            <div>
               <h3 className="font-semibold leading-none">Gerenciar senha</h3>
               <p className="text-xs text-muted-foreground mt-1">Atualize sua senha regularmente para manter sua conta segura</p>
            </div>
         </div>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-8">
               <FormField
                  control={form.control}
                  name="corrent_password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Senha antiga</FormLabel>
                        <FormControl>
                           <Input type="password" placeholder="Digite sua senha atual" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                     control={form.control}
                     name="new_password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Senha nova</FormLabel>
                           <FormControl>
                              <Input type="password" placeholder="Nova senha" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="confirm_password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Confirmar senha</FormLabel>
                           <FormControl>
                              <Input type="password" placeholder="Repita a nova senha" {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex justify-end">
                  <SubmitBtn label="Atualisar" loading={isPending} />
               </div>
            </form>
         </Form>
      </div>
   )
}

export default ResetForm
