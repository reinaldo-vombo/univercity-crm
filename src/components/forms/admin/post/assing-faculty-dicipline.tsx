"use client";

import z from "zod"
import { useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SubmitBtn from "@/components/shared/submit-btn";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import Selector from "@/components/shared/selector";
import { assignFacultyToSectionDisciplinesSchema } from "@/lib/validation/faculty";
import { assingFacultyToDiscipline } from "@/actions/faculty";
import { TDiscipline, TFaculty, TOfferedCourseSection } from "@/types/global";
import { useSheet } from "@/providers/sheet-provider";
import { Button } from "@/components/ui/button";


type Props = {
   facultys: TFaculty[];
   disciplines: TDiscipline[]
   offeredCourseSection: TOfferedCourseSection[];
}

const FacultyDisciplineAssignmentForm = ({
   facultys,
   disciplines,
   offeredCourseSection,
}: Props) => {

   const { close } = useSheet();
   const form = useForm<z.infer<typeof assignFacultyToSectionDisciplinesSchema>>({
      resolver: zodResolver(assignFacultyToSectionDisciplinesSchema),
      defaultValues: {
         assignments: [
            { disciplineId: '', facultyId: '' }
         ],
         offeredCourseSectionId: ''
      },
   });


   const { handleSubmit, control } = form;
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof assignFacultyToSectionDisciplinesSchema>) {
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
            const response = await assingFacultyToDiscipline(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success('Disciplina atribuida');
            form.reset();
            close();
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });

   }
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "assignments",
   });
   const facultyList = facultys.map((faculty) => ({
      id: faculty.id,
      label: `${faculty.firstName} ${faculty.lastName}`,
      value: faculty.id
   }))
   const disciplineList = disciplines.map((discipline) => ({
      id: discipline.id,
      label: discipline.name,
      value: discipline.id
   }))
   const sectionList = offeredCourseSection.map((section) => ({
      id: section.id,
      label: section.title,
      value: section.id
   }))

   return (
      <Form {...form}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
               <div key={field.id}>
                  <FormField
                     control={control}
                     name='offeredCourseSectionId'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Turmas</FormLabel>
                           <FormControl>
                              <Selector
                                 formField={field}
                                 options={sectionList}
                                 placeholder="Selecione a turma"
                                 className="w-full"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="flex items-center gap-2">

                     <FormField
                        control={control}
                        name={`assignments.${index}.facultyId`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Professores</FormLabel>
                              <FormControl>
                                 <Selector
                                    formField={field}
                                    options={facultyList}
                                    placeholder="Selecione professor"
                                    className="w-full"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={control}
                        name={`assignments.${index}.disciplineId`}
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Disciplina</FormLabel>
                              <FormControl>
                                 <Selector
                                    formField={field}
                                    options={disciplineList}
                                    placeholder="Selecione a disciplina"
                                    className="w-full"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

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
            <Button
               type="button"
               variant="outline"
               onClick={() =>
                  append({ facultyId: "", disciplineId: "" })
               }
            >
               + Adicionar disciplina
            </Button>
            <SubmitBtn label="Registar" loading={isPending} />
         </form>
      </Form>
   );
}

export default FacultyDisciplineAssignmentForm;