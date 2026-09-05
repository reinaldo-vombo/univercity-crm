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
import { TCourse, TDepartemant, TFaculty } from "@/types/global"
import Selector from "@/components/shared/selector"
import { updateFacultySchema } from "@/lib/validation/faculty"
import { updatedFaculty } from "@/actions/faculty"
import { DUMMY_DATA } from "@/constants/mock-data"
import Uploader from "@/components/shared/file-upload/uploader"

type TPros = {
   defaultValues: TFaculty
   departemants: TDepartemant[]
   courses: TCourse[]
}

const UpdateFacultyFrom = ({ defaultValues, departemants, courses }: TPros) => {
   const academicDepartemant = departemants.map(departemant => ({
      id: departemant.id,
      label: departemant.title,
      value: departemant.id,
   }));
   const academicCourses = courses.map(course => ({
      id: course.id,
      label: course.title,
      value: course.id,
   }));
   const form = useForm<z.infer<typeof updateFacultySchema>>({
      resolver: zodResolver(updateFacultySchema),
      defaultValues: {
         id: defaultValues.id,
         firstName: defaultValues.firstName,
         middleName: defaultValues.middleName || "",
         lastName: defaultValues.lastName,
         contactNo: defaultValues.contactNo || '',
         gender: defaultValues.gender,
         email: defaultValues.email || '',
         profileImage: defaultValues.profileImage,
         academicDepartmentId: defaultValues.academicDepartmentId,
         coursedIds: undefined
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
            toast.success(FLASH_MESSAGE.UPDATED);
            form.reset();
         } catch (error) {
            toast.error(FLASH_MESSAGE.SERVER_ERROR);
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
            <div className="">
               <FormField
                  control={form.control}
                  name="profileImage"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Foto do professor</FormLabel>
                        <FormControl>
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
                     <FormItem className="w-1/2">
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
            </div>
            <div className="flex items-center gap-2">
               <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                     <FormItem className="w-1/2">
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
                     <FormItem className="w-1/2">
                        <FormLabel>Génro</FormLabel>
                        <FormControl>
                           <Selector
                              placeholder="Selecione o génro"
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
                  name="contactNo"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Número de telefone</FormLabel>
                        <FormControl>
                           <Input
                              placeholder="EX: (+244) 922 456 927"
                              {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem>
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
               name="coursedIds"
               render={({ field }) => (
                  <FormItem className="mb-6">
                     <FormLabel>Cursos</FormLabel>
                     <FormControl>
                        <Selector
                           className="w-full"
                           options={academicCourses}
                           placeholder="Selecione os cursos"
                           formField={field} />
                     </FormControl>
                     <FormDescription>Selecione os ao qual o professor pertence</FormDescription>
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
