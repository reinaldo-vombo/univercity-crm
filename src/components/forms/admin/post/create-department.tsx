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
import { departmentSchema } from "@/lib/validation/departement"
import { TUser } from "@/lib/types/global"
import { addNewDepartemant } from "@/lib/actions/departement"
import Selector from "@/components/sheard/selector"
type TPros = {
   users: TUser[]
   academicFaculty: any
}
const CreateDepartmentFrom = ({ users, academicFaculty }: TPros) => {
   const admins = users.map(user => ({
      id: user.id,
      label: user.name,
      value: user.id,
   }));
   const academicFacultys = academicFaculty.map((faculty: any) => ({
      id: faculty.id,
      label: faculty.title,
      value: faculty.id,
   }));
   const form = useForm<z.infer<typeof departmentSchema>>({
      resolver: zodResolver(departmentSchema),
      defaultValues: {
         title: "",
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof departmentSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewDepartemant(formData);
            if (response.error) {
               toast.error(FLASH_MESSAGE.DEPARTMENT_NOT_CREATED);
               return;
            }
            toast.success(FLASH_MESSAGE.DETEPARTMENT_CREATED);
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
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do Departamento</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Nome do Departamento"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="departmentHeadId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Membros</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={admins}
                           placeholder="Selecione um admin"
                           formField={field} />
                     </FormControl>
                     <FormDescription>Selecione o director do departamento</FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="academicFacultyId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Unidade Acadêmica</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={academicFacultys}
                           placeholder="Ex: Faculdade de Engenharia" formField={field} />
                     </FormControl>
                     <FormDescription></FormDescription>
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

export default CreateDepartmentFrom;
