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
import { TAcademicFaculty, TDepartemant } from "@/types/global"
import Selector from "@/components/shared/selector"
import { facultySchema } from "@/lib/validation/faculty"
import { addNewFaculty } from "@/lib/actions/faculty"
import { DUMMY_DATA } from "@/constants/mock-data"
import Uploader from "@/components/shared/file-upload/uploader"

type TPros = {
   departemants: TDepartemant[]
   academicFaculty: TAcademicFaculty[]
}

const CreateFacultyFrom = ({ departemants, academicFaculty }: TPros) => {
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
   const form = useForm<z.infer<typeof facultySchema>>({
      resolver: zodResolver(facultySchema),
      defaultValues: {
         firstName: "",
         middleName: "",
         lastName: "",
         contactNo: "",
         gender: "Masculino",
         email: "",
         profileImage: "",
         designation: "",
         shift: "MORNING",
         academicDepartmentId: "",
         academicFacultyId: "",
      }
   })
   const [isPending, startTransition] = useTransition();
   async function onSubmit(values: z.infer<typeof facultySchema>) {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         formData.append(key, value);
      });
      startTransition(async () => {
         try {
            const response = await addNewFaculty(formData);
            if (response.error) {
               toast.error(response.message);
               return;
            }
            toast.success(FLASH_MESSAGE.CREATED);
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
         <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-8 py-6">
            <div >
               <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Foto do professor</FormLabel>
                        <FormControl className="w-full place-content-center">
                           <Uploader field={field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                     <FormItem className="w-full">
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
                     <FormItem className="w-full">
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
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                     <FormItem className="w-full">
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
                  name="contactNo"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="EX: (+244) 999 999 999"
                              {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="EX: exemplo@gmail.com"
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
                     <FormItem className="w-full">
                        <FormLabel>Género</FormLabel>
                        <FormControl>
                           <Selector
                              placeholder="Selecione o género"
                              className="w-full"
                              formField={field}
                              options={DUMMY_DATA.gender} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Designação</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="EX: Professor | Coordenador de Departamento"
                              {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="shift"
                  render={({ field }) => (
                     <FormItem className="w-full">
                        <FormLabel>Turno</FormLabel>
                        <FormControl>
                           <Selector
                              placeholder="Selecione o Turno"
                              className="w-full"
                              formField={field}
                              options={DUMMY_DATA.shifts} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
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
               label="Criar"
               loading={isPending} />
         </form>
      </Form>
   )
}

export default CreateFacultyFrom;
