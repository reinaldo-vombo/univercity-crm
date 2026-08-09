// lib/columns/studentColumns.ts

import { ColumnDef } from "@tanstack/react-table"
import { Eye, Hash, Mail, Pen, Phone, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal"
import AlertModal from "@/components/shared/alert-modal"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"
import { TDepartemant, TFaculty } from "@/types/global"
import Avatar from "@/components/shared/avatar"
import { deleteFaculty } from "@/actions/faculty"
import FalcultyDetails from "@/components/admin/container/falculty/falculty-details"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeaderName } from "@/components/table-filters/name-filter"
import { UniversalColumnFilter } from "@/components/table-filters/column-filter"
import { createUniqueId } from "@/lib/helper"
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateFacultyFrom = dynamic(() => import("@/components/forms/admin/update/update-falculty"),
   { ssr: false, loading: () => <FormLoading /> })


export function FacultyColumns(departemants: TDepartemant[], courses: any): ColumnDef<TFaculty>[] {

   return [
      {
         accessorKey: "firstName",
         header: ({ column }) => (
            <DataTableColumnHeaderName column={column} title="Nome" />
         ),
         cell: ({ row }) => {
            const faculty = row.original;
            const fullName = `${faculty.firstName} ${faculty.middleName || ''} ${faculty.lastName}`
            const name = `${faculty.firstName} ${faculty.lastName}`
            return (
               <div className="flex items-center gap-2">
                  <Avatar name={name || ''} photo={faculty?.profileImage || ''} className="size-11" />
                  <span>{fullName}</span>
               </div>
            )
         }
      },
      {
         accessorKey: "facultyId",
         header: 'Numero do professor',
         cell: ({ row }) => {
            const faculty = row.original;
            return (
               <div className="flex items-center gap-2">
                  <Hash className="text-orange-500" />
                  <span>{faculty.facultyId}</span>
               </div>
            )
         }
      },
      {
         accessorKey: "academicDepartment",
         accessorFn: (row) => row.academicDepartment.id,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Departamento"
               options={departemants.map((d) => ({
                  value: d.id,
                  label: d.title
               }))}
            />
         ),
         cell: ({ row }) => {
            const department = row.original.academicDepartment;
            return (
               <Badge variant="secondary" className="text-xs">
                  {department.title}
               </Badge>
            )
         },
      },
      {
         accessorKey: "email",
         header: ({ column }) => (
            <DataTableColumnHeaderName column={column} title="Email" />
         ),
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Mail className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">{row.getValue("email")}</span>
            </div>
         ),
      },
      {
         accessorKey: "gender",
         accessorFn: (row) => row.gender,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Género"
               options={[
                  { value: "Masculino", label: "Masculino" },
                  { value: "Feminino", label: "Feminino" },
               ]}
            />
         ),
         cell: ({ row }) => (
            <Badge className={row.getValue("gender") === 'Masculino' ? 'bg-blue-500' : 'bg-pink-500'}>{row.getValue("gender")}</Badge>
         ),
      },
      {
         accessorKey: "contactNo",
         header: "Telefone",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Phone className="h-4 w-4 text-green-500" />
               <span>(+244) {row.getValue("contactNo")}</span>
            </div>
         ),
      },

      {
         id: "actions",
         header: "Acção",
         cell: ({ row }) => {
            const falculty = row.original

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteFaculty(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.SERVER_ERROR);
                  console.error(err);
               }
            };
            const uid = createUniqueId("view");
            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={uid}
                     className="sm:max-w-6xl"
                     title="Detalhes do professore"
                     description='Informções do professore'>
                     <FalcultyDetails data={falculty} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`edit-${falculty.id}`}
                     className="sm:max-w-md"
                     title="Atualização do professore"
                     description='Formulario de atualização do professore'>
                     <UpdateFacultyFrom departemants={departemants} defaultValues={falculty} courses={courses} />
                  </SheetModal>
                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(falculty.id)} />
               </div>
            )
         },
      },
   ]
}
