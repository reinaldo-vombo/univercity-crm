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
import { TAdmitionExame } from "@/types/global"
import { admitionExameSchema } from "@/lib/validation/adnition-exame"
import { updateAdmitionExame } from "@/lib/actions/admition-exame"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"
import Selector from "@/components/shared/selector"
import { DUMMY_DATA } from "@/constants/mock-data"
import config from '@/config/env'
type TPros = {
   values: TAdmitionExame
}
const UpdateAdmitionExameForm = ({ values }: TPros) => {
   const reciptUrl = values.paymentRecipt;

   const form = useForm<z.infer<typeof admitionExameSchema>>({
      resolver: zodResolver(admitionExameSchema),
      defaultValues: {
         applicantName: values.applicantName,
         aprovePayment: values.aprovePayment,
         exameResults: values.exameResults,
         passed: values.passed,
         paymentAmoute: values.paymentAmoute,
         exameDate: values.exameDate

      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof admitionExameSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updateAdmitionExame(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            console.error(error);
         }
      });

   }
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-7">
            <FormField
               control={form.control}
               name="applicantName"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do aplicante</FormLabel>
                     <FormControl>
                        <Input
                           disabled
                           placeholder="Nome"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {/* <FormField
               control={form.control}
               name="paymentAmoute"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do aplicante</FormLabel>
                     <FormControl>
                        <Input
                           disabled
                           placeholder="Nome"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            /> */}
            <div className="space-y-4">
               <Image
                  src={`${config.API_ASSETS_URL}/${reciptUrl}`}
                  alt="recipt"
                  className="rounded-md"
                  width={500}
                  height={500}
               />
               <FormField
                  control={form.control}
                  name="aprovePayment"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel id="aprovePayment">Estatus do pagamento</FormLabel>
                        <FormControl>
                           <Switch
                              checked={values.aprovePayment as boolean}
                              onChange={field.onChange}
                              id="aprovePayment"
                           />
                        </FormControl>
                        <FormDescription>Aprovação do pagamento</FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />

            </div>
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
                           options={DUMMY_DATA.gender}
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
                           checked={values.passed as boolean}
                           onChange={field.onChange}
                           id="aproveExame"
                        />
                     </FormControl>
                     <FormDescription>Ex: Aprovado ou Reprovado</FormDescription>
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

export default UpdateAdmitionExameForm;
