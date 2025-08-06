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
import { updateRoomSchema } from "@/lib/validation/building"
import { TBuilding, TRoom } from "@/types/global"
import Selector from "@/components/shared/selector"
import { updateRoom } from "@/lib/actions/room"

type TProps = {
   buildings: TBuilding[]
   values: TRoom
}

const UpdateRoomForm = ({ buildings, values }: TProps) => {
   const { buildingId, floor, roomNumber, id } = values;
   const buildingsList = buildings.map((build) => ({
      id: build.id,
      label: build.title,
      value: build.title,
   }))

   const form = useForm<z.infer<typeof updateRoomSchema>>({
      resolver: zodResolver(updateRoomSchema),
      defaultValues: {
         id,
         roomNumber,
         floor,
         buildingId
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateRoomSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updateRoom(formData);
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
   const onInvalid = (errors: unknown) => {
      //This helpe me fix a two week form not submiting god kwon's way bug
      console.error("Validation Errors:", errors);
   };
   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="roomNumber"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Número da Sala</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: P001, 01, 200"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="floor"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Andar</FormLabel>
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
            <FormField
               control={form.control}
               name="floor"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Edificio</FormLabel>
                     <FormControl>
                        <Selector
                           formField={field}
                           options={buildingsList}
                           placeholder="Selecione o edificio"
                           className="w-full"
                        />
                     </FormControl>
                     <FormDescription>Selecione o edificio no qual a sala pertence</FormDescription>
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

export default UpdateRoomForm;
