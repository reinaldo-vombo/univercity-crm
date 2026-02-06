import * as z from "zod"
import { toast } from "sonner"
import { useFieldArray, useForm } from "react-hook-form"
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
import { bulkDisciplineSchema, } from "@/lib/validation/discipline"
import { addNewDiscipline } from "@/actions/discipline"
import { TCourse, TSemester } from "@/types/global"
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { useSheet } from "@/providers/sheet-provider"
import { Button } from "@/components/ui/button"

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
   const form = useForm<z.infer<typeof bulkDisciplineSchema>>({
      resolver: zodResolver(bulkDisciplineSchema),
      defaultValues: {
         courseId: '',
         semesterId: '',
         disciplines: [
            { name: "", yearLevel: "FIRST", suspendGrade: 10 },
         ],
      }
   })


   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof bulkDisciplineSchema>) {

      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         // 👇 arrays de objetos
         if (Array.isArray(value) && typeof value[0] === "object") {
            formData.append(key, JSON.stringify(value));
            return;
         }

         // 👇 arrays simples (string, number, etc)
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, String(v)));
            return;
         }

         // 👇 valores simples
         formData.append(key, String(value));
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
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "disciplines",
   });
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            {fields.map((field, index) => (
               <div key={field.id} className="space-y-6">
                  <div className="flex items-center justify-between gap-2 flex-col md:flex-row">
                     <FormField
                        control={form.control}
                        name={`disciplines.${index}.name`}
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Disciplina</FormLabel>
                              <FormControl>
                                 <Input placeholder="Algoritmos" {...field} />
                              </FormControl>
                              <FormDescription></FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name={`disciplines.${index}.yearLevel`}
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Ano</FormLabel>
                              <Selector
                                 className="w-full"
                                 formField={field}
                                 options={DUMMY_DATA.yearLevel}
                                 placeholder="Ano" />
                              <FormDescription></FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <FormField
                     control={form.control}
                     name={`disciplines.${index}.suspendGrade`}
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Nota mínima</FormLabel>
                           <FormControl>
                              <Input type="number" {...field} />
                           </FormControl>
                           <FormDescription>Nota de suspenção</FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <div className="flex flex-col items-center gap-2 sm:flex-row">
                     <FormField
                        control={form.control}
                        name='courseId'
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Curso academico</FormLabel>
                              <Selector
                                 className="w-full"
                                 formField={field}
                                 options={academicCurses}
                                 placeholder="Curso academicos" />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name='semesterId'
                        render={({ field }) => (
                           <FormItem className="w-full">
                              <FormLabel>Semestre academico</FormLabel>
                              <Selector
                                 className="w-full"
                                 formField={field}
                                 options={academicSemester}
                                 placeholder="Curso academicos" />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  {/* Remover */}
                  <div className="flex items-end">
                     <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                     >
                        Remover
                     </Button>
                  </div>
               </div>
            ))}

            {/* Ações */}
            <div className="flex gap-4">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                     append({ name: "", yearLevel: "FIRST", suspendGrade: 10 })
                  }
               >
                  + Adicionar disciplina
               </Button>

            </div>
            <SubmitBtn label="Criar" loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateDisciplineForm;
