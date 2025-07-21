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
import { TCourse } from "@/types/global"
import Selector from "@/components/shared/selector"
import { coursePriceSchema } from "@/lib/validation/coursePrice"
import { addNewCoursePrice } from "@/lib/actions/course-price"

type TProps = {
   courses: TCourse[]
}
const CreateCoursePriceForm = ({ courses }: TProps) => {
   const courseOptions = courses.map((course) => ({
      id: course.id,
      label: course.title,
      value: course.id
   }))

   const form = useForm<z.infer<typeof coursePriceSchema>>({
      resolver: zodResolver(coursePriceSchema),
      defaultValues: {
         price: '',
         courseId: ''
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof coursePriceSchema>) {

      const formData: any = new FormData();

      // Convert numeric values to numbers before appending to FormData
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await addNewCoursePrice(formData);

            if (response.error) {
               toast.warning(FLASH_MESSAGE.COURSE_PRICE_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.COURSE_PRICE_CREATED);
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
                           type="number"
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
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateCoursePriceForm;
