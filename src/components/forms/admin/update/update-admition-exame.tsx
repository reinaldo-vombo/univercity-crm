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
import { useEffect, useState, useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { SubmitState, TAdmitionExame } from "@/types/global"
import { admitionExameSchema } from "@/lib/validation/adnition-exame"
import { updateAdmitionExame } from "@/actions/admition-exame"
import { Switch } from "@/components/ui/switch"
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import { useSheet } from "@/providers/sheet-provider"
import { handleApiError } from "@/services/error-handler"
import ActionButton from "@/components/layouts/button/action-button"

type TPros = {
   values: TAdmitionExame
}
const UpdateAdmitionExameForm = ({ values }: TPros) => {
   const [submitState, setSubmitState] = useState<SubmitState>('idle');
   const { faseId } = values;
   const { close } = useSheet()

   const form = useForm<z.infer<typeof admitionExameSchema>>({
      resolver: zodResolver(admitionExameSchema),
      defaultValues: {
         id: values.id,
         exameResults: values.exameResults,
         passed: values.passed,
         exameDate: values.exameDate,
         faseId
      }
   })

   const exameResults = form.watch("exameResults");
   useEffect(() => {
      if (exameResults && exameResults >= 10) {
         form.setValue("passed", true);
      } else {
         form.setValue("passed", false);
      }
   }, [exameResults, form]);

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof admitionExameSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         setSubmitState('loading')
         try {
            const response = await updateAdmitionExame(formData);
            if (response.error) {
               setSubmitState('error')
               toast.error(response.message);
               return;
            }
            setSubmitState('success')
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
         } catch (error) {
            setSubmitState('error')
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            handleApiError(error);
         }
      });

   }
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6 py-7">
            <FormField
               control={form.control}
               name="exameResults"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nota do exame</FormLabel>
                     <FormControl>
                        <Selector
                           formField={field}
                           className="w-full"
                           placeholder="Selecione a nota"
                           options={DUMMY_DATA.exameGrades}
                        />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="passed"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel id="aproveExame">Situação</FormLabel>
                     <FormControl>
                        <Switch
                           checked={field.value}
                           onCheckedChange={field.onChange}
                           id="aproveExame"
                        />
                     </FormControl>
                     <FormDescription>Ex: Aprovado ou Reprovado</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <ActionButton submitState={submitState} isPending={isPending} />
         </form>
      </Form>
   )
}

export default UpdateAdmitionExameForm;
