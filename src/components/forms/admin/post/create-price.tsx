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
import { createpriceSchema } from "@/lib/validation/price"
import { addNewPrice } from "@/actions/price"
import { useSheet } from "@/providers/sheet-provider"


const CreateCoursePriceForm = () => {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof createpriceSchema>>({
      resolver: zodResolver(createpriceSchema),
      defaultValues: {
         amount: 0,
         currency: 'AOA',
         description: ''
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof createpriceSchema>) {

      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await addNewPrice(formData);

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
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="amount"
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
               name="currency"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Moeda</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: AOA, EUR, USD"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
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
                           placeholder="Ex: Monografia, Curso de ciência da computação"
                           {...field} />
                     </FormControl>
                     <FormDescription>Opcional</FormDescription>
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
