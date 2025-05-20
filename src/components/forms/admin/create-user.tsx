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
import { userSchema } from "@/lib/validation/user"
import SubmitBtn from "@/components/sheard/submit-btn"
import Selector from "@/components/sheard/selector"
import { DUMMY_DATA } from "@/constants/mock-data"


const CreateUser = () => {
   const form = useForm<z.infer<typeof userSchema>>({
      resolver: zodResolver(userSchema),
      defaultValues: {
         name: "",
         role: "admin",
         email: '',
      }
   })
   async function onSubmit(values: z.infer<typeof userSchema>) {
      console.log(values);
      toast.success('works')

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
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
                        <Input placeholder="Email" {...field} />
                     </FormControl>
                     <FormDescription>O email do útilizador</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="email"
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
                     <FormDescription>O cargo do útilizador</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn
               label="Criar"
               loading={form.formState.isSubmitting} />
         </form>
      </Form>
   )
}

export default CreateUser
