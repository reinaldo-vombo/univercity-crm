import * as z from "zod"
import { toast } from "sonner"
import { useFieldArray, useForm } from "react-hook-form"
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
import { createOfferedCourseBatchSchema } from "@/lib/validation/offered-course"
import { TCourse, TDepartemant, TDiscipline, TSemesterRegistration } from "@/types/global"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
import { MultiSelect } from "@/components/ui/multi-select"
import { DUMMY_DATA } from "@/constants/mock-data"
import { addNewOfferedCourse } from "@/actions/offered-couser"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type TProps = {
   semesterRegistration: TSemesterRegistration[];
   curses: TCourse[];
   departments: TDepartemant[]
   disciplines: TDiscipline[]
}
const CreateOfferedCourseForm = ({ semesterRegistration, curses, departments, disciplines }: TProps) => {
   const { close } = useSheet()

   const form = useForm<z.infer<typeof createOfferedCourseBatchSchema>>({
      resolver: zodResolver(createOfferedCourseBatchSchema),
      defaultValues: {
         academicDepartmentId: "",
         semesterRegistrationId: "",
         maxCapacity: 50,
         items: [
            {
               courseId: "",
               yearLevel: "FIRST",
               disciplineIds: [],
               defaultPricePerShift: {
                  1: 0,
                  2: 0,
                  3: 0,
                  default: 0,
               },
            },
         ],
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof createOfferedCourseBatchSchema>) {
      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         // 👇 arrays de objetos
         if (Array.isArray(value) && typeof value[0] === "object") {
            formData.append(key, JSON.stringify(value));
            return;
         }

         // 👇 arrays simples (string, number, etc)
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, String(v)));
            return;
         }

         // 👇 valores simples
         formData.append(key, String(value));
      });

      startTransition(async () => {
         try {
            const response = await addNewOfferedCourse(formData);

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
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "items",
   });
   const semesters = semesterRegistration.map(semester => ({
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

   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
               <FormField
                  control={form.control}
                  name="academicDepartmentId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Departamento</FormLabel>
                        <FormControl>
                           <Selector
                              placeholder="Departamentos"
                              formField={field}
                              options={academicDepartment} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="semesterRegistrationId"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Período de Matrícula</FormLabel>
                        <FormControl>
                           <Selector
                              placeholder="Ano curraiculr"
                              formField={field}
                              options={semesters} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="maxCapacity"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Número de vagas</FormLabel>
                        <FormControl>
                           <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <hr />

            {/* CURSOS (ARRAY DINÂMICO) */}
            {fields.map((field, index) => (
               <div key={field.id} className="border p-4 rounded-md space-y-4">
                  <div className="flex justify-between items-center">
                     <h3 className="font-semibold">Curso #{index + 1}</h3>
                     {fields.length > 1 && (
                        <Button
                           type="button"
                           variant="destructive"
                           size="icon"
                           onClick={() => remove(index)}
                        >
                           <X className="h-4 w-4" />
                        </Button>
                     )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name={`items.${index}.courseId`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Curso</FormLabel>
                              <FormControl>
                                 <Selector
                                    placeholder="Cursos"
                                    formField={field}
                                    className='w-full'
                                    options={academicCurses} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name={`items.${index}.yearLevel`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Ano curricular</FormLabel>
                              <Selector
                                 placeholder="Ano curricular"
                                 formField={field}
                                 className='w-full'
                                 options={DUMMY_DATA.yearLevel} />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <FormField
                     control={form.control}
                     name={`items.${index}.disciplineIds`}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Disciplinas</FormLabel>
                           <FormControl>
                              <MultiSelect
                                 field={field}
                                 options={academicDiscipline}
                                 placeholder="Selecione as disciplinas"
                                 modalPopover={true}
                                 variant='inverted'
                                 animation={2}
                                 maxCount={3}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* PREÇOS POR TURNO */}
                  <div className="grid grid-cols-4 gap-4">
                     <FormField
                        control={form.control}
                        name={`items.${index}.defaultPricePerShift.1`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Manhã</FormLabel>
                              <FormControl>
                                 <Input type="number" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name={`items.${index}.defaultPricePerShift.2`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Tarde</FormLabel>
                              <FormControl>
                                 <Input type="number" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name={`items.${index}.defaultPricePerShift.3`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Noite</FormLabel>
                              <FormControl>
                                 <Input type="number" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name={`items.${index}.defaultPricePerShift.default`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Padrão</FormLabel>
                              <FormControl>
                                 <Input type="number" {...field} />
                              </FormControl>
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
            ))}

            <Button
               type="button"
               variant="outline"
               onClick={() =>
                  append({
                     courseId: "",
                     yearLevel: "FIRST",
                     disciplineIds: [],
                     defaultPricePerShift: { 1: 0, 2: 0, 3: 0, default: 0 },
                  })
               }
            >
               <Plus className="h-4 w-4 mr-2" />
               Adicionar outro curso
            </Button>

            <SubmitBtn label="Criar" loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateOfferedCourseForm;
