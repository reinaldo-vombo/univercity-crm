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
import { addNewBuilding } from "@/lib/actions/building"
import { updateBuildingSchema } from "@/lib/validation/building"
import { TBuiding } from "@/lib/types/global"
type TProps = {
   building: TBuiding
}

const UpdateBuildingFrom = ({ building }: TProps) => {
   const { id, title } = building

   const form = useForm<z.infer<typeof updateBuildingSchema>>({
      resolver: zodResolver(updateBuildingSchema),
      defaultValues: {
         id,
         title,
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateBuildingSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewBuilding(formData);
            if (response.error) {
               toast.error(FLASH_MESSAGE.BUILDING_NOT_UPDATED);
               return;
            }
            toast.success(FLASH_MESSAGE.BUILDING_UPDATED);
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
                     <FormLabel>Titulo</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Nome do edificio"
                           {...field} />
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

export default UpdateBuildingFrom;
