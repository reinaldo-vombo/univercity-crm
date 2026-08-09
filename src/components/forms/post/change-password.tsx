'use client'

import * as z from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { updatedUser } from "@/actions/users"
import { changePasswordShema } from "@/lib/validation/user"
import useShowPassword from "@/lib/hooks/use-show-password"
import { Eye, EyeClosed } from "lucide-react"

const ChangePasswordForm = () => {
   const { showPassword, toggleVisiblity } = useShowPassword()

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
            const response = await updatedUser(formData);
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
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="corrent_password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Senha antiga</FormLabel>
                     <FormControl className="relative">
                        <Input
                           placeholder="xx-xxx-xxxx"
                           type={showPassword}
                           {...field} />
                        {showPassword === 'password' ?
                           <EyeClosed className="absolute cursor-pointer right-3 top-2" onClick={() => toggleVisiblity('text')} />
                           :
                           <Eye className="absolute cursor-pointer right-3 top-2" onClick={() => toggleVisiblity('password')} />
                        }
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="new_password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Senha nova</FormLabel>
                        <FormControl className="relative">
                           <Input
                              placeholder="xx-xxx-xxxx"
                              type={showPassword}
                              {...field} />
                           {showPassword === 'password' ?
                              <EyeClosed className="absolute cursor-pointer right-3 top-2" onClick={() => toggleVisiblity('text')} />
                              :
                              <Eye className="absolute cursor-pointer right-3 top-2" onClick={() => toggleVisiblity('password')} />
                           }
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="corrent_password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Confirmar senha</FormLabel>
                        <FormControl className="relative">
                           <Input
                              placeholder="xx-xxx-xxxx"
                              type={showPassword}
                              {...field} />
                           {showPassword === 'password' ?
                              <EyeClosed className="absolute cursor-pointer right-3 top-2" onClick={() => toggleVisiblity('text')} />
                              :
                              <Eye className="absolute cursor-pointer right-3 top-2" onClick={() => toggleVisiblity('password')} />
                           }
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <SubmitBtn
               label="Atualisar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default ChangePasswordForm;
