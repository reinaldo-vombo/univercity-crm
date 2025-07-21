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
import SubmitBtn from "@/components/shared/submit-btn"
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { updatedUser } from "@/lib/actions/users"
import Uploader from "@/components/shared/file-upload/uploader"
import { useSession } from "next-auth/react"


const UpdatedUserForm = ({ userInf }: any) => {
   const { name, email, role } = userInf;
   const { data: session, update } = useSession();
   function isAdmin(role: string): boolean {
      return ["admin", "super_admin"].includes(role);
   }
   const form = useForm<z.infer<typeof updateSchema>>({
      resolver: zodResolver(updateSchema),
      defaultValues: {
         name: name,
         role: role,
         email: email,
         avatar: undefined,
      }
   })
   const [isPending, startTransition] = useTransition();

   async function onSubmit(values: z.infer<typeof updateSchema>) {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (key === "avatar" && value instanceof File) {
            formData.append("avatar", value); // ✅ Single file only
         } else if (typeof value === "string") {
            formData.append(key, value);
         }
      });
      startTransition(async () => {
         try {
            const result = await updatedUser(formData);
            if (result.error) {
               toast.error(result.message);
               return;
            }
            await update({
               ...session,
               user: {
                  ...session?.user,
                  name: result.data.name,
                  email: result.data.email,
                  avatar: result.data.avatar
               },
            })
            toast.success(FLASH_MESSAGE.USER_UPDATED);
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
                           placeholder="Nome"
                           {...field} />
                     </FormControl>
                     <FormDescription>Ex: Max paweer</FormDescription>
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
                        <Input placeholder="e-mail" {...field} />
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
                           placeholder="Cargos"
                           disabled={isAdmin(role)}
                        />
                     </FormControl>
                     <FormDescription>Ex: admin, editor, direitor...</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="avatar"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Avatar</FormLabel>
                     <FormControl>
                        <Uploader field={field} maxFiles={1} />
                     </FormControl>
                     <FormDescription>Sua foto de perfil</FormDescription>
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

export default UpdatedUserForm;
