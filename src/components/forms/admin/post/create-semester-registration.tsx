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
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { semesterRegisterSchema } from "@/lib/validation/semester-registration"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
import { Calendar } from "@/components/ui/calendar"
import { TSemester } from "@/types/global"
import { addNewSemesterRegistartion } from "@/actions/semester-registration"

type TProps = {
   semesters: TSemester[]
}
const CreateSemesterRegistrationForm = ({ semesters }: TProps) => {
   const { close } = useSheet()
   const form = useForm<z.infer<typeof semesterRegisterSchema>>({
      resolver: zodResolver(semesterRegisterSchema),
      defaultValues: {
         startDate: undefined,
         endDate: undefined,
         status: 'UPCOMING',
         academicSemesterId: ''
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof semesterRegisterSchema>) {

      startTransition(async () => {
         try {
            const response = await addNewSemesterRegistartion(values);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });

   }
   const academicSemesters = semesters.map((semesters) => ({
      id: semesters.id,
      label: semesters.title,
      value: semesters.id,
   }));
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
            <FormField
               control={form.control}
               name="academicSemesterId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Semestre Academico</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={academicSemesters}
                           placeholder="Ex: 1º Semestre, 2ºSemestre"
                           formField={field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="startDate"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mês de inicio</FormLabel>
                     <FormControl>
                        <Calendar
                           className="w-full"
                           mode="single"
                           selected={field.value}
                           onSelect={field.onChange}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="endDate"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mês de encerramento</FormLabel>
                     <FormControl>
                        <Calendar
                           className="w-full"
                           mode="single"
                           selected={field.value}
                           onSelect={field.onChange}
                        />
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

export default CreateSemesterRegistrationForm;
