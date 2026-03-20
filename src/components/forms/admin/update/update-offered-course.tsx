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
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { updateOfferedCourseZodSchema, } from "@/lib/validation/offered-course"
import { TCourse, TDepartemant, TDiscipline, TOfferedCourse, TSemesterRegistration } from "@/types/global"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
import { MultiSelect } from "@/components/ui/multi-select"
import { DUMMY_DATA } from "@/constants/mock-data"
import { updateOfferedCourse } from "@/actions/offered-couser"

type TProps = {
   defaultValues: TOfferedCourse
   semesterRegistrations: TSemesterRegistration[];
   curses: TCourse[];
   departments: TDepartemant[]
   disciplines: TDiscipline[]
}
const UpdateOfferedCourseForm = ({ defaultValues, semesterRegistrations, curses, departments, disciplines }: TProps) => {
   const { semesterRegistrationId, id, academicDepartmentId } = defaultValues
   const { close } = useSheet()

   const form = useForm<z.infer<typeof updateOfferedCourseZodSchema>>({
      resolver: zodResolver(updateOfferedCourseZodSchema),
      defaultValues: {
         id,
         academicDepartmentId,
         courseIds: [],
         disciplineIds: [],
         semesterRegistrationId,
         yearLevel: 'FIFTH'
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateOfferedCourseZodSchema>) {

      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await updateOfferedCourse(formData);

            if (response.error) {
               toast.warning(response.message);
               return;
            }

            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   const semesters = semesterRegistrations.map(semester => ({
      id: semester.id,
      label: semester.status,
      value: semester.id,
   }));
   const academicCurses = curses.map(curse => ({
      id: curse.id,
      label: curse.title,
      value: curse.id,
   }));
   const academicDiscipline = disciplines.map(discipline => ({
      id: discipline.id,
      label: discipline.name,
      value: discipline.id,
   }));
   const academicDepartment = departments.map(department => ({
      id: department.id,
      label: department.title,
      value: department.id,
   }));

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
               <FormField
                  control={form.control}
                  name='disciplineIds'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Disciplinas</FormLabel>
                        <FormControl>
                           <MultiSelect
                              modalPopover={true}
                              field={field}
                              options={academicDiscipline}
                              defaultValue={field.value}
                              placeholder="Selecione as desciplinas"
                              variant="inverted"
                              animation={2}
                              maxCount={10}
                           />
                        </FormControl>
                        <FormDescription>Nome da desciplina</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name='semesterRegistrationId'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Registro semestral</FormLabel>
                        <Selector
                           formField={field}
                           options={semesters}
                           placeholder="Registro semestral" />
                        <FormDescription>Periodo de matricula</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex items-center gap-2">
                  <FormField
                     control={form.control}
                     name='courseIds'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Curso academico</FormLabel>
                           <MultiSelect
                              modalPopover={true}
                              field={field}
                              options={academicCurses}
                              defaultValue={field.value}
                              placeholder="Selecione os cursos"
                              variant="inverted"
                              animation={2}
                              maxCount={10}
                           />

                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='academicDepartmentId'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Departamentos academicos</FormLabel>
                           <Selector
                              formField={field}
                              options={academicDepartment}
                              placeholder="Departamentos academicos" />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='yearLevel'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Ano Curricular</FormLabel>
                           <Selector
                              formField={field}
                              options={DUMMY_DATA.yearLevel}
                              placeholder="Ano Curricular" />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <SubmitBtn label="Criar" loading={isPending} />
         </form>
      </Form>
   )
}

export default UpdateOfferedCourseForm;
