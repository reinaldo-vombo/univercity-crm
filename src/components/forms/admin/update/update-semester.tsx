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
import { handleApiError } from "@/lib/helper/api/error-handler"
import { addNewAcademicFaculty } from "@/lib/actions/academic-faculty"
import { TSemester } from "@/lib/types/global"
import { semesterSchema } from "@/lib/validation/semester"
import { updatedSemester } from "@/lib/actions/semester"
type Props = {
   values: TSemester
}

const UpdateSemesterForm = ({ values }: Props) => {
   const { id, title, code, year, startMonth, endMonth, isCurrent } = values

   const form = useForm<z.infer<typeof semesterSchema>>({
      resolver: zodResolver(semesterSchema),
      defaultValues: {
         // title: title,
         // code: code,
         // year: year,
         // startMonth: startMonth,
         // endMonth: endMonth,
         // isCurrent: isCurrent,
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof semesterSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updatedSemester(formData);

            if (response.error) {
               toast.warning(FLASH_MESSAGE.FACULTY_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.FACULTY_CREATED);
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
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Faculdade de Engenharia "
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="code"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Codigo</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: FAC-ENG-2022 "
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="year"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ano corrente</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: 2022 "
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="startMonth"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mês de inicio</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Janeiro "
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="endMonth"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mês de encerramento</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Janeiro "
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

export default UpdateSemesterForm;
