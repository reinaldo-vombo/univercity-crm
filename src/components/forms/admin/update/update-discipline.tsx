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
import { updateDisciplineSchema } from "@/lib/validation/discipline"
import { updateDiscipline } from "@/actions/discipline"
import { TCourse, TDiscipline, TSemesterRegistration } from "@/types/global"
import { useSheet } from "@/providers/sheet-provider"
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
type TProps = {
   values: TDiscipline;
   semesterRegistration: TSemesterRegistration[],
   curses: TCourse[]
}
const SEMESTER_NUMBER = [
   {
      id: '1',
      label: '1º Semestre',
      value: 1,
   },
   {
      id: '2',
      label: '3º Semestre',
      value: 2,
   },
]
const UpdateDisciplineForm = ({ values, curses, semesterRegistration }: TProps) => {
   const { close } = useSheet()
   const { id, courses, name, suspendGrade, } = values;
   const course = courses[0]

   const form = useForm<z.infer<typeof updateDisciplineSchema>>({
      resolver: zodResolver(updateDisciplineSchema),
      defaultValues: {
         id,
         name,
         suspendGrade: suspendGrade || 10,
         yearLevel: course.yearLevel || 'FIRST',
         courseId: course.courseId,
         semesterNumber: 0,
         courseDisciplineId: course.id
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateDisciplineSchema>) {

      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await updateDiscipline(formData);

            if (response.error) {
               toast.warning(response.message);
               return;
            }

            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });

   }

   const semesterRegistrations = semesterRegistration.map(registratin => ({
      id: registratin.id,
      label: registratin.status,
      value: registratin.id,
   }));
   const academicCurses = curses.map(curse => ({
      id: curse.id,
      label: curse.title,
      value: curse.id,
   }));
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
               <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Disciplina</FormLabel>
                        <FormControl>
                           <Input placeholder="Algoritmos" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='yearLevel'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Ano</FormLabel>
                        <Selector
                           className="w-full"
                           formField={field}
                           options={DUMMY_DATA.yearLevel}
                           placeholder="Ano" />
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <FormField
               control={form.control}
               name='suspendGrade'
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nota mínima</FormLabel>
                     <FormControl>
                        <Input type="number" {...field} />
                     </FormControl>
                     <FormDescription>Nota de suspenção</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex flex-col items-center gap-2 sm:flex-row">
               <FormField
                  control={form.control}
                  name='courseId'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Curso academico</FormLabel>
                        <Selector
                           className="w-full"
                           formField={field}
                           options={academicCurses}
                           placeholder="Curso academicos" />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='semesterNumber'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Semestre academico</FormLabel>
                        <Selector
                           className="w-full"
                           formField={field}
                           options={SEMESTER_NUMBER}
                           placeholder="Curso academicos" />
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <FormField
               control={form.control}
               name='semesterRegistrationId'
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Registro semestral</FormLabel>
                     <Selector
                        className="w-full"
                        formField={field}
                        options={semesterRegistrations}
                        placeholder="Curso academicos" />
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

export default UpdateDisciplineForm;
