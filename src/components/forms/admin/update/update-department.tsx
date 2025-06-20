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
import { updateDepartmentSchema } from "@/lib/validation/departement"
import { TAcademicFaculty, TUser } from "@/lib/types/global"
import { updatedDepartemant } from "@/lib/actions/departement"
import Selector from "@/components/sheard/selector"
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
               toast.warning(FLASH_MESSAGE.DEPARTMENT_NOT_UPDATED);
               return;
            }
            toast.success(FLASH_MESSAGE.DEPARTMENT_UPDATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
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
                     <FormLabel>Nome do curso</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="Nome"
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
                     <FormLabel>Utilizadores</FormLabel>
                     <FormControl className="w-full">
                        <Selector
                           options={admins}
                           placeholder="Selecione um admin"
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
                     <FormLabel>Facultys</FormLabel>
                     <FormControl className="w-full">
                        <Selector
                           options={academicFacultys}
                           placeholder="Unidade Acadêmica"
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
