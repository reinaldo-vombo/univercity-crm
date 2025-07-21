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
import { handleApiError } from "@/services/error-handler"
import { addNewAcademicFaculty } from "@/lib/actions/academic-faculty"
import { academicFacultyacultySchema } from "@/lib/validation/academicFaculty"

const CreateAcademicFaculty = () => {

   const form = useForm<z.infer<typeof academicFacultyacultySchema>>({
      resolver: zodResolver(academicFacultyacultySchema),
      defaultValues: {
         title: "",
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof academicFacultyacultySchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewAcademicFaculty(formData);

            if (response.error) {
               toast.warning(FLASH_MESSAGE.ACADEMIC_FACULTY_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.ACADEMIC_FACULTY_CREATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
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
            <SubmitBtn
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateAcademicFaculty;
