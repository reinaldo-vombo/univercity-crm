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
import SubmitBtn from "@/components/sheard/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { curseSchema } from "@/lib/validation/curse"
import { handleApiError } from "@/lib/helper/api/error-handler"
import axios from "axios"

const CreateCurse = () => {

   const form = useForm<z.infer<typeof curseSchema>>({
      resolver: zodResolver(curseSchema),
      defaultValues: {
         title: "",
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof curseSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await axios.post("/api/curses", formData);

            if (!response.data) {
               toast.error(FLASH_MESSAGE.USER_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.COURSE_CREATED);
            form.reset();
         } catch (error) {
            toast.error("Network error. Please try again.");
            handleApiError(error);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do curso</FormLabel>
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

            <SubmitBtn
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateCurse
