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
import SubmitBtn from "@/components/sheard/submit-btn"
import { useTransition } from "react"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { roomSchema } from "@/lib/validation/building"
import { TBuilding } from "@/lib/types/global"
import Selector from "@/components/sheard/selector"
import { addNewRoom } from "@/lib/actions/room"

type TProps = {
   buildings: TBuilding[]
}

const CreateRoomForm = ({ buildings }: TProps) => {
   const buildingsList = buildings.map((build) => ({
      id: build.id,
      label: build.title,
      value: build.id,
   }))

   const form = useForm<z.infer<typeof roomSchema>>({
      resolver: zodResolver(roomSchema),
      defaultValues: {
         roomNumber: "",
         floor: "",
         buildingId: ""
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof roomSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewRoom(formData);
            if (response.error) {
               toast.error(FLASH_MESSAGE.ROOM_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.ROOM_CREATED);
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
               name="buildingId"
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
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateRoomForm;
