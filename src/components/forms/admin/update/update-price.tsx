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
import { TPrice } from "@/types/global"
import { UpdatePriceSchema } from "@/lib/validation/price"
import { updatePrice } from "@/actions/price"
import { useSheet } from "@/providers/sheet-provider"

type TProps = {
   defaultValue: TPrice
}
const UpdatePriceForm = ({ defaultValue }: TProps) => {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof UpdatePriceSchema>>({
      resolver: zodResolver(UpdatePriceSchema),
      defaultValues: {
         id: defaultValue.id,
         amount: defaultValue.amount || 0,
         currency: defaultValue.currency,
         description: defaultValue.description || ''
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof UpdatePriceSchema>) {

      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const response = await updatePrice(formData);

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
                     <FormLabel>Curso</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Curso Recurso humanos"
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

export default UpdatePriceForm;
