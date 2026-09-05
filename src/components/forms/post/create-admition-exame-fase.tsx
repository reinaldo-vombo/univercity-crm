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
import { admitionExameFaseSchema } from "@/lib/validation/adnition-exame"
import { createAdmitionExameFase } from "@/actions/admition-exame"
import { useSheet } from "@/providers/sheet-provider"
import { SubmitState, TBuilding } from "@/types/global"
import Selector from "@/components/shared/selector"
import DatePicker from "@/components/shared/calendar"
import ActionButton from "@/components/layouts/button/action-button"

type TProps = {
   building: TBuilding[]
}

const today = new Date()
const CreateAdmitionExameFaseForm = ({ building }: TProps) => {
   const [isPending, startTransition] = useTransition();
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const { close } = useSheet();
   const form = useForm<z.infer<typeof admitionExameFaseSchema>>({
      resolver: zodResolver(admitionExameFaseSchema),
      defaultValues: {
         name: '',
         ordem: 1,
         buildingId: undefined,
         roomId: 0,
         duoDate: today,
         endDate: today,
         startDate: { date: today, time: { start: '10:30:00', end: '12:30:00' } }
      }
   })


   async function onSubmit(values: z.infer<typeof admitionExameFaseSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (value === undefined || value === null) return;

         if (value instanceof Date) {
            // manda como string ISO simples, sem JSON.stringify
            formData.append(key, value.toISOString());
         } else if (typeof value === 'object') {
            // objetos aninhados (ex: startDate) e arrays
            formData.append(key, JSON.stringify(value));
         } else {
            formData.append(key, String(value));
         }
      });
      startTransition(async () => {
         setSubmitState('loading')
         try {
            const response = await createAdmitionExameFase(formData);
            if (response.error) {
               setSubmitState('error')
               toast.warning(response.message);
               setTimeout(() => setSubmitState('idle'), 2000)
               return;
            }
            setSubmitState('success')
            setTimeout(() => setSubmitState('idle'), 2000)
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            setSubmitState('error')
            setTimeout(() => setSubmitState('idle'), 2000)
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
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
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="py-10 space-y-10">
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Titulo</FormLabel>
                        <FormControl>
                           <Input
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
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="buildingId"
                  render={({ field }) => (
                     <FormItem className="w-1/2">
                        <FormLabel>Predio</FormLabel>
                        <FormControl>
                           <Selector
                              options={buildings}
                              formField={field}
                              className="w-full"
                              placeholder="Predio"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="roomId"
                  render={({ field }) => (
                     <FormItem className="w-1/2">
                        <FormLabel>Sala</FormLabel>
                        <FormControl>
                           <Selector
                              options={roomslist}
                              formField={field}
                              className="w-full"
                              placeholder="Predio"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center justify-between gap-2 mt-6">
               <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Ínicio</FormLabel>
                        <FormControl>
                           <DatePicker
                              asPopover={true} withTime={true} formField={field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Ecerramento</FormLabel>
                        <FormControl>
                           <DatePicker
                              asPopover={true} formField={field} />
                        </FormControl>
                        <FormDescription></FormDescription>
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
            <ActionButton submitState={submitState} isPending={isPending} />
         </form>
      </Form >
   )
}

export default CreateAdmitionExameFaseForm;
