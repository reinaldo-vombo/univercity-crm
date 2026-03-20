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
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { admitionExameFaseSchema } from "@/lib/validation/adnition-exame"
import { Calendar } from "@/components/ui/calendar"
import { createAdmitionExameFase } from "@/actions/admition-exame"
import { useSheet } from "@/providers/sheet-provider"
import { TBuilding } from "@/types/global"
import Selector from "@/components/shared/selector"

type TProps = {
   building: TBuilding[]
}

const today = new Date()
const CreateAdmitionExameFaseForm = ({ building }: TProps) => {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof admitionExameFaseSchema>>({
      resolver: zodResolver(admitionExameFaseSchema),
      defaultValues: {
         name: '',
         ordem: 0,
         buildingId: undefined,
         roomId: 0,
         duoDate: new Date(),
         endDate: today,
         startDate: today
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof admitionExameFaseSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await createAdmitionExameFase(formData);
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
                              placeholder="Ex: Fase 1, primera fase etc..."
                              {...field} />
                        </FormControl>
                        <FormDescription>Nome da fase </FormDescription>
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
                        <FormDescription>ordem do da fase, use formato como 1, ou 001, 01</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 mt-6">
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
                        <FormDescription></FormDescription>
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
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3 mt-6">
               <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Ínicio das matriculas</FormLabel>
                        <FormControl>
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange} />
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
                        <FormLabel>Fim das matriculas</FormLabel>
                        <FormControl>
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange} />
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
                        <FormLabel>Data do exame</FormLabel>
                        <FormControl>
                           <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>

            <SubmitBtn
               label="Publicar"
               loading={isPending} />
         </form>
      </Form >
   )
}

export default CreateAdmitionExameFaseForm;
