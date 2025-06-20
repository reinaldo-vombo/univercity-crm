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
import { courseSchema } from "@/lib/validation/curses"
import { addNewCourse } from "@/lib/actions/courses"
import { TDepartemant } from "@/lib/types/global"
import Selector from "@/components/sheard/selector"
type TProps = {
   departments: TDepartemant[]
}
const CreateCourseForm = ({ departments }: TProps) => {
   const departmentOptions = departments.map((department) => ({
      id: department.id,
      label: department.title,
      value: department.id
   }))

   const form = useForm<z.infer<typeof courseSchema>>({
      resolver: zodResolver(courseSchema),
      defaultValues: {
         title: "",
         code: "",
         credits: 20,
         durationInYears: 4,
         academicDepartmentId: "",
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof courseSchema>) {
      // console.log('values', values);

      const formData: any = new FormData();

      // Convert numeric values to numbers before appending to FormData
      Object.entries(values).forEach(([key, value]) => {
         if (typeof value === 'number') {
            formData.append(key, value.toString()); // Convert number to string, but treat as number
         } else {
            formData.append(key, value); // For other types, append as is
         }
      });

      startTransition(async () => {
         try {
            console.log('formData', formData);
            const response = await addNewCourse(formData);
            console.log('error', response);

            if (response.error) {
               toast.warning(FLASH_MESSAGE.COURSE_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.COURSE_CREATED);
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
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Recursos Humanos, Ciencia da Computacao..."
                           {...field} />
                     </FormControl>
                     <FormDescription>O nome do curso</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="durationInYears"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ano de curso</FormLabel>
                     <FormControl>
                        <Input
                           type="number"
                           placeholder="Ex: 4, 3, 2..."
                           {...field} />
                     </FormControl>
                     <FormDescription>O ano de duracao do curso</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="academicDepartmentId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={departmentOptions}
                           placeholder="Escolha um departamento"
                           formField={field} />
                     </FormControl>
                     <FormDescription>O departamento ao qual o curso pertence</FormDescription>
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
                           placeholder="Ex: MAT101 "
                           {...field} />
                     </FormControl>
                     <FormDescription>O codigo do curso</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* <FormField
               control={form.control}
               name="credits"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Valor</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: 40.000"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            /> */}
            <SubmitBtn
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateCourseForm;
