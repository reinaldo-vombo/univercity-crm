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
import { createOfferedCourseSectionZodSchema, } from "@/lib/validation/offered-course"
import { TOfferedCourse } from "@/types/global"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
import { DUMMY_DATA } from "@/constants/mock-data"
import { addNewOfferedCourseSection } from "@/actions/offered-couser-section"
import { Input } from "@/components/ui/input"

type TProps = {
   offeredCourses: TOfferedCourse[];
}
const CreateOfferedCourseSectionForm = ({ offeredCourses }: TProps) => {
   const { close } = useSheet()
   const offeredCourse = offeredCourses.map(offeredCourse => ({
      id: offeredCourse.id,
      label: offeredCourse.course.title,
      value: offeredCourse.id,
   }));
   const form = useForm<z.infer<typeof createOfferedCourseSectionZodSchema>>({
      resolver: zodResolver(createOfferedCourseSectionZodSchema),
      defaultValues: {
         currentlyEnrolledStudent: 0,
         maxCapacity: 0,
         offeredCourseId: '',
         yearLevel: undefined
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof createOfferedCourseSectionZodSchema>) {
      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await addNewOfferedCourseSection(formData);

            if (response.error) {
               toast.warning(response.message);
               return;
            }

            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });

   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
               <div className="flex items-center gap-2">
                  <FormField
                     control={form.control}
                     name='maxCapacity'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Número de Vagas</FormLabel>
                           <FormControl>
                              <Input
                                 type="number"
                                 placeholder="Vagas disponiveis"
                                 {...field} />
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
                           <FormLabel>Turno</FormLabel>
                           <FormControl>
                              <Selector
                                 formField={field}
                                 className="w-full"
                                 options={DUMMY_DATA.yearLevel}
                                 placeholder="Turno" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex items-center gap-2">
                  <FormField
                     control={form.control}
                     name='offeredCourseId'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Cadeiras Semestral</FormLabel>
                           <FormControl>
                              <Selector
                                 formField={field}
                                 className="w-full"
                                 options={offeredCourse}
                                 placeholder="Cadeiras Semestral" />
                           </FormControl>
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

export default CreateOfferedCourseSectionForm;
