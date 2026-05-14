'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { academicServiceZodShema } from "@/lib/validation/secretary";
import SubmitBtn from "@/components/shared/submit-btn";
import { useTransition } from "react";
import { addAcademicService } from "@/actions/secretary";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { useSheet } from "@/providers/sheet-provider";
import { handleApiError } from "@/services/error-handler";
import { TPrice } from "@/types/global";
import Selector from "@/components/shared/selector";

const CreatAcademicServices = ({ prices }: { prices: TPrice[] }) => {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof academicServiceZodShema>>({
      resolver: zodResolver(academicServiceZodShema),
      defaultValues: {
         priceId: '',
         title: ''
      },
   });
   const pricesList = prices.map((price) => ({
      id: price.id,
      label: `${price.amount} - ${price.description}`,
      value: price.id
   }))


   const [isPending, startTransition] = useTransition();
   const onSubmit = async (values: z.infer<typeof academicServiceZodShema>) => {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });

      startTransition(async () => {
         try {
            const result = await addAcademicService(formData);
            if (result.error) {
               toast.error(result.message);
               return
            }

            toast.success(FLASH_MESSAGE.CREATED)
            form.reset();
            close()
         } catch (err) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            handleApiError(err);
         }

      })
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Serviço</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Ex: Exame de recurso, Monografia"
                           {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="priceId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Serviço</FormLabel>
                     <FormControl>
                        <Selector
                           formField={field}
                           options={pricesList}
                           placeholder="Selecione o preço" />
                     </FormControl>
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

export default CreatAcademicServices
