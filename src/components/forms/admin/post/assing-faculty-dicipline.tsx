"use client";

import * as z from "zod"
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SubmitBtn from "@/components/shared/submit-btn";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import Selector from "@/components/shared/selector";
import { DUMMY_DATA } from "@/constants/mock-data";
import { facultyDisciplineAssignmentSchema } from "@/lib/validation/faculty";
import { assingFacultyToDiscipline } from "@/actions/faculty";
import { TFaculty } from "@/types/global";
import { useSheet } from "@/providers/sheet-provider";


type Props = {
   facultys: TFaculty[];
   disciplineId: string;
}

const FacultyDisciplineAssignmentForm = ({
   facultys,
   disciplineId,
}: Props) => {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof facultyDisciplineAssignmentSchema>>({
      resolver: zodResolver(facultyDisciplineAssignmentSchema),
      defaultValues: {
         facultyId: undefined,
         disciplineId,
         shiftId: 1
      },
   });

   const { handleSubmit, control } = form;
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof facultyDisciplineAssignmentSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
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
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   const facultyList = facultys.map((faculty) => ({
      id: faculty.id,
      label: `${faculty.firstName} ${faculty.lastName}`,
      value: faculty.id
   }))

   return (
      <Form {...form}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Faculty */}
            <FormField
               control={control}
               name="facultyId"
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
               name="shiftId"
               render={({ field }) => (
                  <FormItem className="w-full">
                     <FormLabel>Turno</FormLabel>
                     <FormControl>
                        <Selector
                           formField={field}
                           options={DUMMY_DATA.shifts}
                           placeholder="Selecione Turno"
                           className="w-full"
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn label="Registar" loading={isPending} />
         </form>
      </Form>
   );
}

export default FacultyDisciplineAssignmentForm;