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
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { updateCourseSchema } from "@/lib/validation/curses"
import { addNewCourse } from "@/lib/actions/courses"
import { TCourse } from "@/types/global"

type TProps = {
   values: TCourse
}

const UpdateCourseForm = ({ values }: TProps) => {
   const { id, title, code, credits } = values;

   const form = useForm<z.infer<typeof updateCourseSchema>>({
      resolver: zodResolver(updateCourseSchema),
      defaultValues: {
         id,
         title,
         code,
         credits
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateCourseSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewCourse(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
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
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Temporada</FormLabel>
                     <FormControl>
                        <Selector options={DUMMY_DATA.sesson} placeholder="Ex: Verao" formField={field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="code"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Codigo</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: FAC-ENG-2022 "
                           {...field} />
                     </FormControl>
                     <FormDescription>Ex: FAC-ENG-2022</FormDescription>
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

export default UpdateCourseForm;
