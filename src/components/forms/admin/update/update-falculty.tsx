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
import { TAcademicFaculty, TDepartemant, TFaculty } from "@/lib/types/global"
import Selector from "@/components/sheard/selector"
import { updateFacultySchema } from "@/lib/validation/faculty"
import { updatedFaculty } from "@/lib/actions/faculty"

type TPros = {
   defaultValues: TFaculty
   departemants: TDepartemant[]
   academicFaculty: TAcademicFaculty[]
}

const UpdateFacultyFrom = ({ defaultValues, departemants, academicFaculty }: TPros) => {
   const academicDepartemant = departemants.map(departemant => ({
      id: departemant.id,
      label: departemant.title,
      value: departemant.id,
   }));
   const academicFacultys = academicFaculty.map((faculty) => ({
      id: faculty.id,
      label: faculty.title,
      value: faculty.id,
   }));
   const form = useForm<z.infer<typeof updateFacultySchema>>({
      resolver: zodResolver(updateFacultySchema),
      defaultValues: {
         firstName: defaultValues.firstName,
         middleName: defaultValues.middleName || "",
         lastName: defaultValues.lastName,
         contactNo: defaultValues.contactNo,
         gender: defaultValues.gender,
         email: defaultValues.email,
         profileImage: defaultValues.profileImage,
         designation: defaultValues.designation,
         facultyId: defaultValues.facultyId,
         shift: "MORNING",
         academicDepartmentId: defaultValues.academicDepartmentId,
         academicFacultyId: defaultValues.academicFacultyId,
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof updateFacultySchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await updatedFaculty(formData);
            if (response.error) {
               toast.error(response.message);
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
               name="firstName"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Primero nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: Paulo"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="middleName"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Nome do meio</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: Manuel Dos Santos"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="lastName"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Último nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: Cardoso"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="gender"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Último nome</FormLabel>
                     <FormControl>
                        <Input
                           placeholder="EX: Cardoso"
                           {...field} />
                     </FormControl>
                     <FormDescription></FormDescription>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="academicDepartmentId"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Departamento</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={academicDepartemant}
                           placeholder="Selecione o departamento"
                           formField={field} />
                     </FormControl>
                     <FormDescription>Selecione o departamento ao qual o professor pertence</FormDescription>
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
                     <FormDescription>Selecione a unidade ao qual o professor pertence</FormDescription>
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

export default UpdateFacultyFrom;
