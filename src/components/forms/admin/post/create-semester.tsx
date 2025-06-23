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
import { semesterSchema } from "@/lib/validation/semester"
import { addNewSemester } from "@/lib/actions/semester"
import Selector from "@/components/sheard/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { Switch } from "@/components/ui/switch"

const startYear = 2000;
const currentYear = new Date().getFullYear();

const yearsArray: any = [];

for (let year = startYear; year <= currentYear; year++) {
   yearsArray.push({
      id: year.toString(),      // id as a string (for uniqueness)
      value: year,              // value as the year itself
      label: year.toString()    // label as the year (can be customized further)
   });
}
const CreateDisciplineForm = () => {

   const form = useForm<z.infer<typeof semesterSchema>>({
      resolver: zodResolver(semesterSchema),
      defaultValues: {
         title: 'Primavera',
         code: '01',
         isCurrent: true,
         year: currentYear.toString(),  // Set a default year
         startMonth: 'Abril',           // Set a default start month
         endMonth: 'Agosto',
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof semesterSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewSemester(formData);
            if (response.error) {
               toast.error(FLASH_MESSAGE.SEMESTER_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.SEMESTER_CREATED);
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
                        <Selector
                           className="w-full"
                           options={DUMMY_DATA.sesson}
                           placeholder="Ex: Verao"
                           formField={field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="isCurrent"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel id="semesterStatus">Status</FormLabel>
                     <FormControl>
                        <Switch
                           checked={field.value as boolean}
                           onChange={field.onChange}
                           id="semesterStatus"
                        />
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
                           placeholder="Ex: 01/2022"
                           {...field} />
                     </FormControl>
                     <FormDescription>Ex: 01/2022</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="year"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ano corrente</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={yearsArray}
                           placeholder="Ex: 2025"
                           formField={field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="startMonth"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mês de inicio</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={DUMMY_DATA.months}
                           placeholder="Ex: Março"
                           formField={field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="endMonth"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Mês de encerramento</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={DUMMY_DATA.months}
                           placeholder="Ex: Dezembro"
                           formField={field} />
                     </FormControl>
                     <FormDescription></FormDescription>
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

export default CreateDisciplineForm;
