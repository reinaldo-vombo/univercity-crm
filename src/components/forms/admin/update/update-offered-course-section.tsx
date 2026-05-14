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
import { updateOfferedCourseSectionZodSchema, } from "@/lib/validation/offered-course"
import { TOfferedCourse, TOfferedCourseSection, TPrice } from "@/types/global"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
import { updateOfferedCourseSection } from "@/actions/offered-couser-section"
import { Input } from "@/components/ui/input"

type TProps = {
   offeredCourses: TOfferedCourse[];
   defautValues: TOfferedCourseSection
   prices: TPrice[]
}
const UpdateCreateOfferedCourseSectionForm = ({ offeredCourses, defautValues, prices }: TProps) => {
   const { maxCapacity, offeredCourseId, title, id, shiftId } = defautValues;
   const { close } = useSheet()
   const offeredCourse = offeredCourses.map(offeredCourse => ({
      id: offeredCourse.id,
      label: offeredCourse.course.title,
      value: offeredCourse.id,
   }));
   const tutian = prices.filter((f) => f.description !== null).map(price => ({
      id: price.id,
      label: `${price.amount} - ${price.description}`,
      value: price.id,
   }));
   const form = useForm<z.infer<typeof updateOfferedCourseSectionZodSchema>>({
      resolver: zodResolver(updateOfferedCourseSectionZodSchema),
      defaultValues: {
         id,
         maxCapacity,
         offeredCourseId,
         shiftId,
         priceId: '',
         title
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateOfferedCourseSectionZodSchema>) {
      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await updateOfferedCourseSection(formData);

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

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
               <FormField
                  control={form.control}
                  name='title'
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Nome da Turma</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="EX: LCC2M, LEG1T..."
                              {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <div className="flex items-center gap-2">
                  <FormField
                     control={form.control}
                     name='maxCapacity'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Número de Vagas</FormLabel>
                           <Input
                              type="number"
                              placeholder="Nome"
                              {...field} />
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name='priceId'
                     render={({ field }) => (
                        <FormItem className="w-full">
                           <FormLabel>Mensalidade</FormLabel>
                           <Selector
                              formField={field}
                              className="w-full"
                              options={tutian}
                              placeholder="Selecione a mensalidade" />
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
                           <Selector
                              formField={field}
                              className="w-full"
                              options={offeredCourse}
                              placeholder="Cadeiras Semestral" />
                           <FormMessage />
                        </FormItem>
                     )}
                  />

               </div>
            </div>
            <SubmitBtn label="Atualisar" loading={isPending} />
         </form>
      </Form>
   )
}

export default UpdateCreateOfferedCourseSectionForm;
