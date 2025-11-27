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
import { disciplineSchema } from "@/lib/validation/discipline"
import { addNewDiscipline } from "@/actions/discipline"
import { generateSlug } from "@/lib/helper"
import { TCourse, TSemester } from "@/types/global"
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { useSheet } from "@/providers/sheet-provider"

type TProps = {
   semesters: TSemester[],
   curses: TCourse[]
}
const CreateDisciplineForm = ({ semesters, curses }: TProps) => {
   const { close } = useSheet()
   const academicSemester = semesters.map(semester => ({
      id: semester.id,
      label: semester.title,
      value: semester.id,
   }));
   const academicCurses = curses.map(curse => ({
      id: curse.id,
      label: curse.title,
      value: curse.id,
   }));
   const form = useForm<z.infer<typeof disciplineSchema>>({
      resolver: zodResolver(disciplineSchema),
      defaultValues: {
         name: "",
         code: "",
         courseId: "",
         semesterId: "",
         yearLevel: "FIRST",
         minimumGradeToDismiss: 10
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof disciplineSchema>) {

      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await addNewDiscipline(formData);

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
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Matematica, Eletronica"
                           {...field}
                           onChange={(e) => {
                              field.onChange(e);
                              form.setValue('code', generateSlug(e.target.value))
                           }}
                        />
                     </FormControl>
                     <FormDescription>Nome da disciplina</FormDescription>
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
                           placeholder="Ex: MT-01"
                           {...field} />
                     </FormControl>
                     <FormDescription>Codigo do da disciplina</FormDescription>
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
                           options={academicCurses}
                           placeholder="Recursos Humanos, Ciência da Computação etc..."
                           formField={field} />
                     </FormControl>
                     <FormDescription>Selecione o Ano Curricular, 1º, 2º, 3º, 4º...</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="yearLevel"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ano Corricular</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={DUMMY_DATA.yearLevel}
                           placeholder="1º, 2º, 3º, 4º"
                           formField={field} />
                     </FormControl>
                     <FormDescription>Selecione o Ano Curricular, 1º, 2º, 3º, 4º...</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="semesterId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Semestre</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={academicSemester}
                           placeholder="1ª semestre"
                           formField={field} />
                     </FormControl>
                     <FormDescription>Selecione o semestre dessa desciplina</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="minimumGradeToDismiss"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nota de dispenção</FormLabel>
                     <FormControl>
                        <Input
                           type="number"
                           placeholder="EX: 10, 15, 14"
                           {...field} />
                     </FormControl>
                     <FormDescription>O valor de dispenção</FormDescription>
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
