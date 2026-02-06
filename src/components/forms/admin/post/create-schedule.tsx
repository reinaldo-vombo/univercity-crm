import * as z from "zod"
import { toast } from "sonner"
import { useFieldArray, useForm } from "react-hook-form"
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
import { TDiscipline, TOfferedCourseSection, TRoom, TSemesterRegistration } from "@/types/global"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
import { Button } from "@/components/ui/button"
import { createScheduleSchema } from "@/lib/validation/class-schedule"
import { dayOfWeek } from "@/constants/schedule"
import { formatDate } from "@/lib/helper"
import { addNewOfferedCourseClassSchedule } from "@/actions/offered-course-class-shedule"

type TProps = {
   semesterRegistration: TSemesterRegistration[],
   offereSections: TOfferedCourseSection[],
   disciplines: TDiscipline[]
   rooms: TRoom[]
}
const CreateSheduleForm = ({ offereSections, semesterRegistration, rooms, disciplines }: TProps) => {
   const { close } = useSheet()

   const form = useForm<z.infer<typeof createScheduleSchema>>({
      resolver: zodResolver(createScheduleSchema),
      defaultValues: {
         offeredCourseSectionId: "",
         classSchedules: [
            {
               dayOfWeek: "SEGUNDA",
               startTime: "07:30",
               endTime: "09:00",
               roomId: undefined as any,
               disciplineId: "",
            },
         ],
      }
   })
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "classSchedules",
   });

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof createScheduleSchema>) {

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
            const response = await addNewOfferedCourseClassSchedule(formData);

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
   const semesterRegistrationL = semesterRegistration.map(semester => ({
      id: semester.id,
      label: `${formatDate(semester.startDate)} - ${formatDate(semester.endDate)}`,
      value: semester.id,
   }));
   const sections = offereSections.map(section => ({
      id: section.id,
      label: section.title,
      value: section.id,
   }));
   const roomsList = rooms.map(room => ({
      id: room.id,
      label: `${room.roomNumber} - ${room.floor}`,
      value: room.id,
   }));
   const disciplineList = disciplines.map(discipline => ({
      id: discipline.id,
      label: discipline.name,
      value: discipline.id,
   }));
   const weeks = dayOfWeek.map(item => ({
      id: item,
      label: item,
      value: item,
   }));


   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name='offeredCourseSectionId'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Turma</FormLabel>
                        <FormControl>
                           <Selector
                              formField={field}
                              options={sections}
                              placeholder="Selecione a Turma"
                              className="w-full"
                           />
                        </FormControl>
                        <FormDescription></FormDescription>
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
                        <FormControl>
                           <Selector
                              formField={field}
                              options={semesterRegistrationL}
                              placeholder="Selecione a registro"
                              className="w-full"
                           />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            {fields.map((field, index) => (
               <div key={field.id} className="border p-4 rounded space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                     <FormField
                        control={form.control}
                        name={`classSchedules.${index}.dayOfWeek`}
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Dia da Semana</FormLabel>
                              <FormControl>
                                 <Selector
                                    className="w-full"
                                    formField={field}
                                    options={weeks}
                                    placeholder="Semana"
                                 />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name={`classSchedules.${index}.startTime`}
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Inicio da aula</FormLabel>
                              <FormControl>
                                 <Input placeholder="07:00h" type="time" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name={`classSchedules.${index}.endTime`}
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Fim da aula</FormLabel>
                              <FormControl>
                                 <Input placeholder="12:20h" type="time" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name={`classSchedules.${index}.roomId`}
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Sala</FormLabel>
                           <FormControl>
                              <Selector
                                 className="w-full"
                                 formField={field}
                                 options={roomsList}
                                 placeholder="Salas"
                              />
                           </FormControl>
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name={`classSchedules.${index}.disciplineId`}
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Disiplina</FormLabel>
                           <FormControl>
                              <Selector
                                 className="w-full"
                                 formField={field}
                                 options={disciplineList}
                                 placeholder="Selecione a disciplina"
                              />
                           </FormControl>
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  {/* Remover */}
                  <div className="flex items-end">
                     <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                     >
                        Remover
                     </Button>
                  </div>
               </div>
            ))}

            {/* Ações */}
            <div className="flex gap-4">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                     append({
                        dayOfWeek: "SEGUNDA",
                        startTime: "09:00",
                        endTime: "10:40",
                        roomId: undefined as any,
                        disciplineId: "",
                     })
                  }
               >
                  + Adicionar disciplina
               </Button>

            </div>
            <SubmitBtn label="Criar" loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateSheduleForm;
