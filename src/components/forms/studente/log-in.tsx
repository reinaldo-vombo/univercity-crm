"use client"

import * as z from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
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
import { studentSchema } from "@/lib/validation/studente"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function StudentLogin() {
   const router = useRouter();
   const form = useForm<z.infer<typeof studentSchema>>({
      resolver: zodResolver(studentSchema),
      defaultValues: {
         number: '',
         password: ''
      }

   })

   async function onSubmit(values: z.infer<typeof studentSchema>) {
      const { number, password } = values;
      const userType = "student";
      const identifier = number;
      try {
         const res = await signIn("credentials", {
            redirect: false,
            user_type: userType,
            identifier,
            password,
         });

         if (res?.ok) {
            router.push("/");
         } else {
            toast.error("Login failed. Check your credentials.");
         }
      } catch (error) {
         console.error("Form submission error", error);
         toast.error("Failed to submit the form. Please try again.");
      }
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            <FormField
               control={form.control}
               name="number"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Número de estudante</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Número de estudante"
                           {...field} />
                     </FormControl>
                     <FormDescription>O seu número de estudante</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Password</FormLabel>
                     <FormControl>
                        <Input placeholder="Palavra-passe" {...field} />
                     </FormControl>
                     <FormDescription>Sua senha</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full">Entrar</Button>
            <Link href=''>Esqueceu a palavra-passe?</Link>
         </form>
      </Form>
   )
}