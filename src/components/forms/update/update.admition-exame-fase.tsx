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
import { updateAdmitionExameFaseSchema } from "@/lib/validation/adnition-exame"
import { SubmitState, TAdmitionExameFase, TBuilding } from "@/types/global"
import { useSheet } from "@/providers/sheet-provider"
import { updateAdmitionExameFase } from "@/actions/admition-exame"
import Selector from "@/components/shared/selector"
import DatePicker from "@/components/shared/calendar"
import ActionButton from "@/components/layouts/button/action-button"
import TimePickerWithIcon from "@/components/shared/time-picker"

type TProps = {
   defaultValues: TAdmitionExameFase;
   building: TBuilding[]
}
const UpdateAdmitionExameFase = ({ defaultValues, building }: TProps) => {
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const { close } = useSheet();
   const { name, ordem, endDate, startDate, buildingId, duoDate, startTime, endTime, roomId, id } = defaultValues;

   const form = useForm<z.infer<typeof updateAdmitionExameFaseSchema>>({
      resolver: zodResolver(updateAdmitionExameFaseSchema),
      defaultValues: {
         id,
         name,
         buildingId,
         duoDate,
         roomId,
         ordem,
         startTime: startTime || '',
         endTime: endTime || '',
         endDate,
         startDate
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateAdmitionExameFaseSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         setSubmitState('loading')

         try {
            const response = await updateAdmitionExameFase(formData);
            if (response.error) {
               setSubmitState('error')
               toast.error(response.message);
               setTimeout(() => setSubmitState('idle'), 2000)
               return;
            }
            setSubmitState('success')
            setTimeout(() => setSubmitState('idle'), 2000)
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            setSubmitState('error')
            console.error(error);
            setTimeout(() => setSubmitState('idle'), 2000)
         }
      });

   }
   const buildings = building.map(b => ({
      id: b.id,
      label: b.title,
      value: b.id,
   }));
   const rooms = building.map(b => b.rooms)

   const roomslist = rooms.flat().map(b => ({
      id: b.id,
      label: b.roomNumber,
      value: b.id,
   }));

   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="py-10">
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Titulo</FormLabel>
                        <FormControl>
                           <Input
                              className="w-full"
                              placeholder="Ex: Fase 1, primera fase etc..."
                              {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="ordem"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Ordem</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="Ex: 1, 01, 001"
                              {...field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex w-full items-center gap-3 mt-6">
               <FormField
                  control={form.control}
                  name="buildingId"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Predio</FormLabel>
                        <FormControl>
                           <Selector
                              className="w-full"
                              placeholder="Predio"
                              options={buildings}
                              formField={field}
                           />
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
                     <FormItem className="w-full">
                        <FormLabel>Salas</FormLabel>
                        <FormControl>
                           <Selector
                              className="w-full"
                              formField={field}
                              options={roomslist}
                              placeholder="Salas"
                           />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

            </div>
            <div className="flex items-center gap-3 mt-6">
               <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Ínicio das matriculas</FormLabel>
                        <FormControl>
                           <DatePicker
                              asPopover={true} formField={field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Fim das matriculas</FormLabel>
                        <FormControl>
                           <DatePicker
                              asPopover={true} formField={field} />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="duoDate"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Realização do exame</FormLabel>
                        <FormControl>
                           <DatePicker
                              asPopover={true} formField={field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center gap-3 mt-6">
               <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Começo</FormLabel>
                        <FormControl>
                           <TimePickerWithIcon
                              field={field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Termino</FormLabel>
                        <FormControl>
                           <TimePickerWithIcon
                              field={field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <ActionButton submitState={submitState} isPending={isPending} />
         </form>
      </Form >
   )
}

export default UpdateAdmitionExameFase;
