// lib/columns/studentColumns.ts
import { ColumnDef } from "@tanstack/react-table";
import { Badge, BadgeDollarSign, BookA, Building, Eye, Link2Icon, Moon, Pen, Sun, SunMoon, Trash } from "lucide-react"
import SheetModal from "@/components/shared/sheet-modal";
import AlertModal from "@/components/shared/alert-modal";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { TCourse, TDepartemant, TPrice } from "@/types/global";
import { deleteCourse } from "@/actions/courses";
import UpdateCourseForm from "@/components/forms/admin/update/update-couses";
import CourseDetails from "@/components/admin/container/course/course-details";
import AssignFacultiesForm from "@/components/forms/admin/update/assign-faculties";
import { TFaculty } from "@/types/global";
import { createUniqueId, formatCurrency, formatDate } from "@/lib/helper";
import { UniversalColumnFilter } from "@/components/admin/table-filters/column-filter";


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
         accessorKey: "code",
         accessorFn: (row) => row.code,
         header: "Codigo",
         cell: ({ row }) => {
            const code = row.original.code;
            return (
               <div className="flex items-center gap-2">
                  <Badge className="text-purple-500" />
                  <span>{code}</span>
               </div>
            )
         },
      },
      {
         accessorKey: "shift",
         accessorFn: (row) => row.shift.name,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Turno"
               options={[
                  { value: "Manhã", label: "Manhã" },
                  { value: "Tarde", label: "Tarde" },
                  { value: "Noite", label: "Noite" },
               ]}
            />
         ),
         cell: ({ row }) => {
            const shift = row.original.shift.name;
            return (
               <div className="flex items-center gap-2">
                  {shift === "Manhã" ?
                     <Sun className="text-yellow-300" />
                     :
                     shift === "Tarde" ?
                        <SunMoon className="text-amber-500" />
                        : <Moon className="text-blue-500" />}
                  <span>{shift}</span>
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
         accessorKey: "price",
         header: "Mensalidade",
         cell: ({ row }) => {
            const price = row.original.price;
            return (
               <div className="flex items-center gap-2">
                  <BadgeDollarSign className="text-green-500" />
                  <b>{formatCurrency(price?.amount || 0)}</b>
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
            const uid1 = createUniqueId("atribut");
            const uid2 = createUniqueId("assign");

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
                  <SheetModal
                     trigger={<Link2Icon className="h-4 w-4  cursor-pointer text-purple-500" />}
                     side="left"
                     id={`atribut-${uid1}`}
                     className="sm:max-w-lg"
                     title="Atribuir Professores ao curso"
                     description=' Formulario para Atribuir Professores ao curso'>
                     <AssignFacultiesForm falculty={falculty} values={credits} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Link2Icon className="h-4 w-4  cursor-pointer text-red-500" />}
                     side="left"
                     id={`assign-${uid2}`}
                     className="sm:max-w-lg"
                     title="Remover Professores do curso"
                     description='Formulario para remover Professores do curso'>
                     <AssignFacultiesForm falculty={falculty} values={credits} />
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
