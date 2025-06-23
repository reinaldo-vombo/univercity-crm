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
import SubmitBtn from "@/components/sheard/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TCourse, TCoursePrice } from "@/lib/types/global"
import Selector from "@/components/sheard/selector"
import { updateCoursePriceSchema } from "@/lib/validation/coursePrice"
import { updateCoursePrice } from "@/lib/actions/course-price"

type TProps = {
   courses: TCourse[],
   defaultValue: TCoursePrice
}
const UpdateCoursePriceForm = ({ courses, defaultValue }: TProps) => {
   const courseOptions = courses.map((course) => ({
      id: course.id,
      label: course.title,
      value: course.id
   }))
   const price = defaultValue.price !== undefined ? defaultValue.price.toString() : '';

   const form = useForm<z.infer<typeof updateCoursePriceSchema>>({
      resolver: zodResolver(updateCoursePriceSchema),
      defaultValues: {
         id: defaultValue.id,
         price: price,
         courseId: defaultValue.courseId
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateCoursePriceSchema>) {

      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await updateCoursePrice(formData);

            if (response.error) {
               toast.warning(FLASH_MESSAGE.COURSE_NOT_UPDATED);
               return;
            }
            toast.success(FLASH_MESSAGE.COURSE_UPDATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="price"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Preço</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: 40000, 55000.."
                           {...field} />
                     </FormControl>
                     <FormDescription>O preço do curso</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="courseId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Curso</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={courseOptions}
                           placeholder="Escolha um curso"
                           formField={field} />
                     </FormControl>
                     <FormDescription>O curso ao qual o preço pertence</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <SubmitBtn
               label="Atualisar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default UpdateCoursePriceForm;
