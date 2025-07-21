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
import { assignRemoveFacultiesSchema } from "@/lib/validation/curses"
import { assignFaculties } from "@/lib/actions/courses"
import { TCourse, TFaculty } from "@/types/global"
import { MultiSelect } from "@/components/ui/multi-select"

type TProps = {
   values: TCourse
   falculty: TFaculty[]
}

const AssignFacultiesForm = ({ values, falculty }: TProps) => {
   const falcultys = falculty.map((item) => ({
      label: item.firstName,
      value: item.id,
   }))

   const form = useForm<z.infer<typeof assignRemoveFacultiesSchema>>({
      resolver: zodResolver(assignRemoveFacultiesSchema),
      defaultValues: {
         id: values.id,
         faculties: [],
      }
   })
   console.log('falcultys', form.getValues('faculties'));

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof assignRemoveFacultiesSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await assignFaculties(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.ASSIGN_FACULTIES);
            form.reset();
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
               name="faculties"
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
