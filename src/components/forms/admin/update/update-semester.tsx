'use client'

import z from "zod"
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
import { useState, useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { handleApiError } from "@/services/error-handler"
import { SubmitState, TSemester } from "@/types/global"
import { updateSemesterSchema } from "@/lib/validation/semester"
import { updatedSemester } from "@/actions/semester"
import { useSheet } from "@/providers/sheet-provider"
import { DUMMY_DATA } from "@/constants/mock-data"
import Selector from "@/components/shared/selector"
import { Switch } from "@/components/ui/switch"
import ActionButton from "@/components/layouts/button/action-button"
type Props = {
   values: TSemester
}
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

const UpdateSemesterForm = ({ values }: Props) => {
   const { close } = useSheet()
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const { id, title, code, year, startMonth, endMonth, isCurrent } = values

   const form = useForm<z.infer<typeof updateSemesterSchema>>({
      resolver: zodResolver(updateSemesterSchema),
      defaultValues: {
         id,
         title: title,
         code: code,
         year: year,
         startMonth: startMonth,
         endMonth: endMonth,
         isCurrent: isCurrent,
      }
   })


   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateSemesterSchema>) {
      setSubmitState('loading')
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updatedSemester(formData);

            if (response.error) {
               setSubmitState('error')
               toast.error(response.message);
               setTimeout(() => setSubmitState('idle'), 3000)
               return;
            }

            setSubmitState('success')
            setTimeout(() => setSubmitState('idle'), 3000)
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
         } catch (error) {
            setSubmitState('error')
            setTimeout(() => setSubmitState('idle'), 3000)
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            handleApiError(error);
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
                     <FormLabel id="semesterStatus">Status do Semestre</FormLabel>
                     <FormControl>
                        <Switch
                           checked={field.value as boolean}
                           onCheckedChange={field.onChange}
                           id="semesterStatus"
                        />
                     </FormControl>
                     <FormDescription>Ex: Activo ou Inativo, não pode haver 2 semestre activo</FormDescription>
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
                           placeholder="Ex: 01"
                           {...field} />
                     </FormControl>
                     <FormDescription>Ex: 01</FormDescription>
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
            <ActionButton submitState={submitState} isPending={isPending} />
         </form>
      </Form>
   )
}

export default UpdateSemesterForm;
