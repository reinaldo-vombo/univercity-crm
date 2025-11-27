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
import { updateCourse } from "@/actions/courses"
import { TCourse, TDepartemant, TPrice } from "@/types/global"
import { useSheet } from "@/providers/sheet-provider"

type TProps = {
   values: TCourse;
   departments: TDepartemant[];
   prices: TPrice[];
}

const UpdateCourseForm = ({ values, departments, prices }: TProps) => {
   const { close } = useSheet()
   const { id, title, code, durationInYears, yearLevel, academicDepartmentId, priceId, shiftId, } = values;

   const form = useForm<z.infer<typeof updateCourseSchema>>({
      resolver: zodResolver(updateCourseSchema),
      defaultValues: {
         id,
         title,
         academicDepartmentId,
         durationInYears,
         priceId,
         shiftId,
         yearLevel,
         code,
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
            const response = await updateCourse(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   const departmentList = departments.map((department) => ({
      id: department.id,
      label: department.title,
      value: department.id
   }))
   const priceList = prices.map((price) => ({
      id: price.id,
      label: price.amount,
      value: price.id
   }))
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
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
                           options={departmentList}
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
            <FormField
               control={form.control}
               name="shiftId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Turno</FormLabel>
                     <FormControl>
                        <Selector
                           placeholder="EX: Manhã, Tarde, Noite"
                           formField={field}
                           className="w-full"
                           options={DUMMY_DATA.shifts} />
                     </FormControl>
                     <FormDescription>EX: Manhã, Tarde, Noite</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="priceId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mensalidade</FormLabel>
                     <FormControl>
                        <Selector
                           placeholder="EX: 40000, 51000, 20000"
                           formField={field}
                           className="w-full"
                           options={priceList} />
                     </FormControl>
                     <FormDescription>Propia do curso</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="yearLevel"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nivel do curso</FormLabel>
                     <FormControl>
                        <Selector
                           formField={field}
                           placeholder="EX: primero ano, segundo ano"
                           className="w-full"
                           options={DUMMY_DATA.yearLevel} />
                     </FormControl>
                     <FormDescription>Ex: 1ª, 2ª, 3ª, 4ª, 5ª</FormDescription>
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

export default UpdateCourseForm;
