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
import { Dispatch, SetStateAction, useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { blukUpdateRoomShema } from "@/lib/validation/building"
import { updateManyRoom } from "@/actions/room"
import { useSheet } from "@/providers/sheet-provider"

type TProps = {
   roomIds: number[]
   setSelectedIds: Dispatch<SetStateAction<number[]>>
}

const BulkUpdateRoomUpdateForm = ({ roomIds, setSelectedIds }: TProps) => {
   const { close } = useSheet()


   const form = useForm<z.infer<typeof blukUpdateRoomShema>>({
      resolver: zodResolver(blukUpdateRoomShema),
      defaultValues: {
         ids: roomIds,
         floor: ""
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof blukUpdateRoomShema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, v));
         } else {
            formData.append(key, value as any);
         }
      });
      startTransition(async () => {
         try {
            const response = await updateManyRoom(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
            close()
            setSelectedIds([])
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
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 py-10">
            <p className="text-sm text-muted-foreground">Campos preenchidos serão aplicados a{" "} <strong>{roomIds.length}</strong> salas</p>
            <FormField
               control={form.control}
               name="floor"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Edificio</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: 1ª 2ª 3ª"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
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

export default BulkUpdateRoomUpdateForm;
