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
import { useEffect, useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { useSheet } from "@/providers/sheet-provider"
import { addNewOfferedCourse } from "@/actions/offered-couser"
import { answerSheetSchema } from "@/lib/validation/exame-statemant"
import Uploader from "@/components/shared/file-upload/uploader"

type TProps = {
   examStatementId: string;
   candidateId?: string
   studentId?: string
}
const AnswerSheetForm = ({ examStatementId, candidateId, studentId }: TProps) => {
   const { close } = useSheet()

   const form = useForm<z.infer<typeof answerSheetSchema>>({
      resolver: zodResolver(answerSheetSchema),
      defaultValues: {
         candidateId,
         examStatementId,
         imageFile: undefined as unknown as File,
         imageFileName: '',
         imageMimeType: '',
         studentId
      }
   })

   const imageFile = form.watch('imageFile')

   useEffect(() => {
      if (imageFile instanceof File) {
         form.setValue('imageFileName', imageFile.name)
         form.setValue('imageMimeType', imageFile.type)
      }
   }, [imageFile, form])

   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof answerSheetSchema>) {
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

   const onInvalid = (errors: unknown) => {
      console.error("Validation Errors:", errors);
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">

            <FormField
               control={form.control}
               name="imageFile"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Imagem da folha de prova</FormLabel>
                     <FormControl>
                        <Uploader field={field} />
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

export default AnswerSheetForm;
