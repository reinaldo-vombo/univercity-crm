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
import { updateSchema } from "@/lib/validation/user"
import SubmitBtn from "@/components/sheard/submit-btn"
import Selector from "@/components/sheard/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { addNewUser } from "@/lib/actions/users"

type TProps = {
   userInf: {
      name: string,
      email: string,
      role: string
   }
}
const UpdatedUser = ({ userInf }: TProps) => {
   const { name, email, role } = userInf;
   const form = useForm<z.infer<typeof updateSchema>>({
      resolver: zodResolver(updateSchema),
      defaultValues: {
         name: name,
         role: role,
         email: email,
      }
   })
   const [isPending, startTransition] = useTransition();

   async function onSubmit(values: z.infer<typeof updateSchema>) {
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
            toast.success(FLASH_MESSAGE.USER_UPDATED);
            form.reset();
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
                     <FormLabel>Nome do útilizador</FormLabel>
                     <FormControl>
                        <Input
                           disabled
                           placeholder="Nome"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
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
                        <Input disabled placeholder="Email" {...field} />
                     </FormControl>
                     <FormDescription>Ex@gmail.com</FormDescription>
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
                           options={DUMMY_DATA.roles}
                           className="w-full"
                           formField={field}
                           placeholder="Cargos" />
                     </FormControl>
                     <FormDescription>Ex: admin, editor...</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn
               label="Atualisar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default UpdatedUser
