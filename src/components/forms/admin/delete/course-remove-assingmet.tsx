"use client";

import * as z from "zod"
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import SubmitBtn from "@/components/shared/submit-btn";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { assignRemoveCoursesZodSchema } from "@/lib/validation/curses";
import { MultiSelect } from "@/components/ui/multi-select";
import { removeAssigndFaculties } from "@/actions/courses";

type Props = {
   faculties: {
      faculty: {
         id: string;
         firstName: string;
         lastName: string;
         profileImage: string | null;
      };
   }[];
   courseId: string;
}

const CourseRemovedAssingment = ({ faculties, courseId, }: Props) => {
   const falcultys = faculties.map((item) => ({
      label: item.faculty.firstName,
      value: item.faculty.id,
      avatar: item.faculty.profileImage || '/avatar-1.jpg'
   }))

   const form = useForm<z.infer<typeof assignRemoveCoursesZodSchema>>({
      resolver: zodResolver(assignRemoveCoursesZodSchema),
      defaultValues: {
         courseId,
         facultys: []
      },
   });

   const { handleSubmit, control } = form;
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof assignRemoveCoursesZodSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await removeAssigndFaculties(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success('Atruição do curso removido');
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }


   return (
      <Form {...form}>
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Faculty */}
            <FormField
               control={control}
               name="facultys"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Professores</FormLabel>
                     <FormControl>
                        <MultiSelect
                           modalPopover={true}
                           field={field}
                           options={falcultys}
                           defaultValue={field.value}
                           placeholder="Selecione os professores"
                           variant="inverted"
                           animation={2}
                           maxCount={3}
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

export default CourseRemovedAssingment;