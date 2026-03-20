// lib/columns/studentColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { BookA, Building, Eye, Pen, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal";
import AlertModal from "@/components/shared/alert-modal";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { TCourse, TDepartemant, TPrice } from "@/types/global";
import { deleteCourse } from "@/actions/courses";
import CourseDetails from "@/components/admin/container/course/course-details";
import { TFaculty } from "@/types/global";
import { createUniqueId, formatDate } from "@/lib/helper";
import { UniversalColumnFilter } from "@/components/table-filters/column-filter";
import FormLoading from "@/components/skeleton/form"
import dynamic from "next/dynamic"
const UpdateCourseForm = dynamic(() => import("@/components/forms/admin/update/update-couses"),
   { ssr: false, loading: () => <FormLoading /> })

export function CoursesColumns(falculty: TFaculty[], departments: TDepartemant[], prices: TPrice[]): ColumnDef<TCourse>[] {

   return [
      {
         accessorKey: "title",
         header: "Titulo",
         cell: ({ row }) => {
            const title = row.original.title;

            return (
               <div className="flex items-center gap-2">
                  <BookA className="text-indigo-500" />
                  <span>{title}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "academicDepartment",
         accessorFn: (row) => row.academicDepartment.id,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Departamento"
               options={departments.map((d) => ({
                  value: d.id,
                  label: d.title
               }))}
            />
         ),
         cell: ({ row }) => {
            const departament = row.original.academicDepartment;
            return (
               <div className="flex items-center gap-2">
                  <Building className="text-green-500" />
                  <span>{departament.title}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "createdAt",
         header: "Data de  publicação",
         cell: ({ row }) => (
            <span className="truncate max-w-[180px]">{formatDate(row.getValue("createdAt"))}</span>
         ),
      },

      {
         id: "actions",
         header: "Acção",
         cell: ({ row }) => {
            const credits = row.original;

            const handleDelete = async (id: string) => {
               try {
                  const res = await deleteCourse(id);
                  if (res.error) {
                     toast.warning(res.message)
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
                  // Optionally refresh UI or mutate local state
               } catch (err) {
                  toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
                  console.error(err);
               }
            };
            const uid = createUniqueId("view");

            return (
               <div className="flex items-center gap-3">
                  <SheetModal
                     trigger={<Eye className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="right"
                     id={`view-${uid}`}
                     title="Detalhes do curso"
                     className="sm:max-w-2xl"
                     description='Visualizar detalhes do curso'>
                     <CourseDetails data={credits} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4  cursor-pointer" />}
                     side="right"
                     id={`edit-${credits.id}`}
                     title="Atualizar curso"
                     description='Formulario para atualizar o curso'>
                     <UpdateCourseForm values={credits} departments={departments} prices={prices} />
                  </SheetModal>

                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(credits.id)} />
               </div>
            )
         },
      },
   ]
}
