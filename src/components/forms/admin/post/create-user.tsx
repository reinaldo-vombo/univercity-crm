'use client'

import z from "zod"
import { toast } from "sonner"
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
import { userSchema } from "@/lib/validation/user"
import SubmitBtn from "@/components/shared/submit-btn"
import Selector from "@/components/shared/selector"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { addNewUser } from "@/actions/users"
import { useSheet } from "@/providers/sheet-provider"
import { ENUM_USER_ROLE } from "@/lib/enums/user"
import { ROLES } from "@/constants/roles"

const CreateUser = () => {
   const { close } = useSheet()
   const [isPending, startTransition] = useTransition();
   const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
         name: undefined,
         role: ENUM_USER_ROLE.ADMIN,
         email: undefined,
      }
   })

   async function onSubmit(values: z.infer<typeof userSchema>) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const result = await addNewUser(formData);
            if (result.error) {
               toast.error(result.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (err) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(err);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex Mario Dos Santos"
                           {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input placeholder="Ex exemplo@gmail.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="role"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Cargo</FormLabel>
                     <FormControl>
                        <Selector
                           options={ROLES}
                           className="w-full"
                           formField={field}
                           placeholder="Ex SUPER_ADMIN ADMIN STAFF..." />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateUser
