'use client'
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
import { handleApiError } from "@/services/error-handler"
import { updateAcademicFaculty } from "@/actions/academic-faculty"
import { updateAcademicFacultyacultySchema } from "@/lib/validation/academicFaculty"
import { useSheet } from "@/providers/sheet-provider"
import { TAcademicFaculty, TPrice } from "@/types/global"
import Selector from "@/components/shared/selector"

type TProps = {
   values: TAcademicFaculty;
   prices: TPrice[]
}
const UpadateAcademicFaculty = ({ values, prices }: TProps) => {
   const { id, title } = values;
   const { close } = useSheet()
   const form = useForm<z.infer<typeof updateAcademicFacultyacultySchema>>({
      resolver: zodResolver(updateAcademicFacultyacultySchema),
      defaultValues: {
         id,
         title,
         priceId: ''
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateAcademicFacultyacultySchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updateAcademicFaculty(formData);

            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            handleApiError(error);
         }
      });

   }
   const pricesList = prices.map(price => ({
      id: price.id,
      label: price.amount,
      value: price.id,
   }));
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
                           placeholder="Ex: Faculdade de Engenharia "
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="priceId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Preços</FormLabel>
                     <FormControl className="w-full">
                        <Selector
                           options={pricesList}
                           placeholder="Selecione um Membro"
                           formField={field}
                           className="w-full"
                        />
                     </FormControl>
                     <FormDescription>Preços dos Exames de Admisão</FormDescription>
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

export default UpadateAcademicFaculty;
