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
import { addNewEventCalendar } from "@/actions/calendar"
import { createEventSchema } from "@/lib/validation/events-calendar"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"

const today = new Date()

const CreateEventFrom = () => {

   const form = useForm<z.infer<typeof createEventSchema>>({
      resolver: zodResolver(createEventSchema),
      defaultValues: {
         title: "",
         start: today,
         end: today,
         type: 'EVENTO',
         description: "",
         location: "",
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof createEventSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewEventCalendar(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
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
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="py-10">
            <div className="grid grid-cols-12 gap-6">
               <div className="col-span-6">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Titulo</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Ex: Conferia da univercidade"
                                 {...field} />
                           </FormControl>
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="type"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Tipo de Evento</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Ex: Evento, Informações"
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
                              <Textarea
                                 placeholder="Ex: Conferia da univercidade"
                                 {...field} />
                           </FormControl>
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="location"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Localização</FormLabel>
                           <FormControl>
                              <Input
                                 placeholder="Ex: Edificil 1,  Auditorio 5, "
                                 {...field} />
                           </FormControl>
                           <FormDescription></FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="col-span-6 flex items-center gap-3">
                  <FormField
                     control={form.control}
                     name="start"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Ínicio</FormLabel>
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
                     name="end"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Terminal</FormLabel>
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
            </div>

            <SubmitBtn
               label="Publicar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateEventFrom;
