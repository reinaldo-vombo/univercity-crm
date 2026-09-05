import { updateBulkRetakeSchema } from '@/lib/validation/retake'
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
import React, { Dispatch, SetStateAction, useTransition } from 'react'
import { z } from 'zod'
import SubmitBtn from '@/components/shared/submit-btn'
import { Input } from '@/components/ui/input'
import { updateBulkRetake } from '@/actions/retake'
import { toast } from 'sonner'
import { FLASH_MESSAGE } from '@/constants/flash-message'
import { useSheet } from '@/providers/sheet-provider'
type TProps = {
   examesIds: number[]
   setSelectedIds: Dispatch<SetStateAction<number[]>>
}
const BulkUpdateRetake = ({ examesIds, setSelectedIds }: TProps) => {
   const { close } = useSheet();

   const form = useForm<z.infer<typeof updateBulkRetakeSchema>>({
      resolver: zodResolver(updateBulkRetakeSchema),
      defaultValues: {
         ids: examesIds,
         buildingId: 0,
         roomId: 0
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateBulkRetakeSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
         } else {
            formData.append(key, value as any);
         }
      });
      startTransition(async () => {
         try {
            const response = await updateBulkRetake(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
            setSelectedIds([])
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <p className="text-sm text-muted-foreground">Campos preenchidos serão aplicados a{" "} <strong>{examesIds.length}</strong> salas</p>
            <FormField
               control={form.control}
               name="buildingId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Edificio</FormLabel>
                     <FormControl>
                        <Input
                           type='number'
                           placeholder="EX: Edificil 1"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="roomId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Sala</FormLabel>
                     <FormControl>
                        <Input
                           type='number'
                           placeholder="EX: 1,2,3,4,5,6,7,8,9"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="offeredCourseSectionId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Turma</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: LCC1M, LCC2M etc..."
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="academicSemesterId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Semestre academico</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: 1º semestre"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
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

export default BulkUpdateRetake;
