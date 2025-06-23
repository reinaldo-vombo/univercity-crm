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
import { updateDisciplineSchema } from "@/lib/validation/discipline"
import { updateDiscipline } from "@/lib/actions/discipline"
import { TDiscipline } from "@/lib/types/global"
type TProps = {
   values: TDiscipline
}
const UpdateDisciplineForm = ({ values }: TProps) => {
   const { id, code, name, minimumGradeToDismiss } = values;

   const form = useForm<z.infer<typeof updateDisciplineSchema>>({
      resolver: zodResolver(updateDisciplineSchema),
      defaultValues: {
         id,
         name,
         code,
         credits: 1,
         description: "",
         minimumGradeToDismiss
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateDisciplineSchema>) {

      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await updateDiscipline(formData);

            if (response.error) {
               toast.warning(FLASH_MESSAGE.DISCIPLINE_NOT_UPDATED);
               return;
            }

            toast.success(FLASH_MESSAGE.DISCIPLINE_UPDATED);
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
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Matematica, Eletronica"
                           {...field} />
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
            <FormField
               control={form.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Descrição</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Descrição"
                           {...field} />
                     </FormControl>
                     <FormDescription>Opcional</FormDescription>
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

export default UpdateDisciplineForm;
