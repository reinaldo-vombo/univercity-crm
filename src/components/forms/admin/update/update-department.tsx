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
import { updateDepartmentSchema } from "@/lib/validation/departement"
import { TAcademicFaculty, TUser } from "@/types/global"
import { updatedDepartemant } from "@/actions/departement"
import Selector from "@/components/shared/selector"
import { useSheet } from "@/providers/sheet-provider"
type TPros = {
   users: TUser[]
   values: {
      id: string;
      title: string;
      academicFacultyId: string;
      departmentHeadId: string | null;
   },
   academicFaculty: TAcademicFaculty[]
}
const UpdatedDepartmentForm = ({ users, academicFaculty, values }: TPros) => {
   const { close } = useSheet()
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
   const form = useForm<z.infer<typeof updateDepartmentSchema>>({
      resolver: zodResolver(updateDepartmentSchema),
      defaultValues: {
         id: values.id,
         title: values.title,
         academicFacultyId: values.academicFacultyId,
         departmentHeadId: values.departmentHeadId
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateDepartmentSchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updatedDepartemant(formData);
            if (response.error) {
               toast.warning(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.UPDATED);
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
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-10">
            <FormField
               control={form.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do departamento</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: Engenharia Civil, Ciência da Computação..."
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
                     <FormLabel>Directores</FormLabel>
                     <FormControl className="w-full">
                        <Selector
                           options={admins}
                           placeholder="Selecione um Membro"
                           formField={field}
                           className="w-full"
                        />
                     </FormControl>
                     <FormDescription></FormDescription>
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
                     <FormControl className="w-full">
                        <Selector
                           options={academicFacultys}
                           placeholder="EX: Falculdade Engiaria"
                           formField={field}
                           className="w-full"
                        />
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

export default UpdatedDepartmentForm
