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
import { removeAssigndFaculties } from "@/actions/courses"
import { TCourse, TFaculty } from "@/types/global"
import { MultiSelect } from "@/components/ui/multi-select"
import { assignRemoveCoursesZodSchema } from "@/lib/validation/curses"
import { useSheet } from "@/providers/sheet-provider"

type TProps = {
   values: TCourse
   falculty: TFaculty[]
}

const AssignFacultiesForm = ({ values, falculty }: TProps) => {
   const { close } = useSheet()
   const falcultys = falculty.map((item) => ({
      label: item.firstName,
      value: item.id,
      avatar: item.profileImage || '/avatar-1.jpg'
   }))

   const form = useForm<z.infer<typeof assignRemoveCoursesZodSchema>>({
      resolver: zodResolver(assignRemoveCoursesZodSchema),
      defaultValues: {
         courseId: values.id,
         facultys: [],
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof assignRemoveCoursesZodSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
         } else {
            formData.append(key, value as any);
         }
      });
      startTransition(async () => {
         try {
            const response = await removeAssigndFaculties(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success('Professores removidos como sucesso');
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
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
                     <FormDescription>Abribua professores curso</FormDescription>
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

export default AssignFacultiesForm;
