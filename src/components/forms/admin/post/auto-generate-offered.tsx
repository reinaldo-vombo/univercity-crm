import z from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { autoGenerateOfferedSchema } from "@/lib/validation/offered-course"
import { useSheet } from "@/providers/sheet-provider"
import { addNewOfferedCourse } from "@/actions/offered-couser"
import { Input } from "@/components/ui/input"
import { TSemesterRegistration } from "@/types/global"
import Selector from "@/components/shared/selector"

type TProps = {
   semesterRegistration: TSemesterRegistration[];
}
const AutoGenerateOfferedCourseForm = ({ semesterRegistration }: TProps) => {
   const { close } = useSheet()

   const form = useForm<z.infer<typeof autoGenerateOfferedSchema>>({
      resolver: zodResolver(autoGenerateOfferedSchema),
      defaultValues: {
         maxCapacity: 100
      }
   })

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof autoGenerateOfferedSchema>) {
      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         // 👇 arrays de objetos
         if (Array.isArray(value) && typeof value[0] === "object") {
            formData.append(key, JSON.stringify(value));
            return;
         }

         // 👇 arrays simples (string, number, etc)
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, String(v)));
            return;
         }

         // 👇 valores simples
         formData.append(key, String(value));
      });

      startTransition(async () => {
         try {
            const response = await addNewOfferedCourse(formData);

            if (response.error) {
               toast.warning(response.message);
               return;
            }

            toast.success(FLASH_MESSAGE.CREATED);
            form.reset();
            close()
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
            console.error(error);
         }
      });
   }
   const semesterRegistrations = semesterRegistration.map(semester => ({
      id: semester.id,
      label: semester.status,
      value: semester.id,
   }));
   const onInvalid = (errors: unknown) => {
      console.error("Validation Errors:", errors);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
            <FormField
               control={form.control}
               name="maxCapacity"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Número de vagas</FormLabel>
                     <FormControl>
                        <Input type="number" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="semesterRegistrationId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Período de Matrícula</FormLabel>
                     <FormControl>
                        <Selector
                           placeholder="Registro semestral"
                           formField={field}
                           options={semesterRegistrations} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <SubmitBtn label="Criar" loading={isPending} />
         </form>
      </Form>
   )
}

export default AutoGenerateOfferedCourseForm;
