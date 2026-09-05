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
import SubmitBtn from "@/components/shared/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { useSheet } from "@/providers/sheet-provider"
import Selector from "@/components/shared/selector"
import { reviewCourseTransferZodSchema } from "@/lib/validation/secretary"
import { Textarea } from "@/components/ui/textarea"
import { handleCourseTransferReuest } from "@/actions/secretary"

const STATUS = [
  {
    id: '1',
    label: 'APPROVED',
    value: 'APPROVED'
  },
  {
    id: '2',
    label: 'REJECTED',
    value: 'REJECTED'
  },
]

const ReviewCourseTransferForm = () => {
  const { close } = useSheet();
  const form = useForm<z.infer<typeof reviewCourseTransferZodSchema>>({
    resolver: zodResolver(reviewCourseTransferZodSchema),
    defaultValues: {
      adminNote: '',
      decision: 'REJECTED',

    }
  })
  const [isPending, startTransition] = useTransition();
  async function onSubmit(values: z.infer<typeof reviewCourseTransferZodSchema>) {
    const formData: any = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });
    startTransition(async () => {
      try {
        const response = await handleCourseTransferReuest(formData);
        if (response.error) {
          toast.error(response.message);
          return;
        }
        toast.success('Pedio atualizado');
        form.reset();
        close()
      } catch (error) {
        toast.error(FLASH_MESSAGE.SERVER_ERROR);
        console.error(error);
      }
    });
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-10">
        <div>
          <FormField
            control={form.control}
            name="decision"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Selector
                    formField={field}
                    options={STATUS}
                    className="w-full"
                    placeholder="Status" />
                </FormControl>
                <FormDescription>Estado do pedido</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="adminNote"
            render={({ field }) => (
              <FormItem className="w-full mb-4">
                <FormLabel>Notas</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ex: Escreva uma descrição"
                    {...field} />
                </FormControl>
                <FormDescription>Pequena descrição</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SubmitBtn
          label="Atualisar"
          loading={isPending} />
      </form>
    </Form >
  )

}

export default ReviewCourseTransferForm;
