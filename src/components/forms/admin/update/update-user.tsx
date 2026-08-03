'use client'
import z from "zod"
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
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { updatedUser } from "@/actions/users"
import Uploader from "@/components/shared/file-upload/uploader"
import { useSheet } from "@/providers/sheet-provider"
import { ROLES } from "@/constants/roles"

const UpdatedUserForm = ({ userInf }: any) => {
   const { id, name, email, role, contact, avatar } = userInf;
   const { close } = useSheet()

   function isAdmin(role: string): boolean {
      return ["manager", "admin"].includes(role);
   }

   const form = useForm<z.infer<typeof updateSchema>>({
      resolver: zodResolver(updateSchema),
      defaultValues: {
         id,
         name: name,
         role: role,
         email: email,
         contact: contact || {},
         avatar: avatar || null,
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
            toast.success(FLASH_MESSAGE.UPDATED);
            close()
         } catch (err) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(err);
         }
      });

   }
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do útilizador</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Manuel Jose Armando Santos"
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
                        <Input placeholder="Ex: exemplo@gmail.com" {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="contact.location"
                  render={({ field }) => (
                     <FormItem className="w-1/2">
                        <FormLabel>Localização</FormLabel>
                        <FormControl>
                           <Input placeholder="Ex: Angola, luanda" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="contact.phone"
                  render={({ field }) => (
                     <FormItem className="w-1/2">
                        <FormLabel>Telefoe</FormLabel>
                        <FormControl>
                           <Input placeholder="Ex: 923-333-333" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
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
                           placeholder="Ex: admin, editor, direitor..."
                           disabled={isAdmin(role)}
                        />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="avatar"
               render={({ field }) => (
                  <FormItem className="w-full">
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
