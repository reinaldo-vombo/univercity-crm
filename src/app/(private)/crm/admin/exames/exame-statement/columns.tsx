import { deleteExamStatement } from "@/actions/statemant";
import ExameStatementDetails from "@/components/admin/container/exame-statemant/exam-statement-details";
import AlertModal from "@/components/shared/alert-modal";
import SheetModal from "@/components/shared/sheet-modal";
import FormLoading from "@/components/skeleton/form";
import { UniversalColumnFilter } from "@/components/table-filters/column-filter";
import { Badge } from "@/components/ui/badge";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { createUniqueId, formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ExamType } from "@/types/enum";
import { TCourse, TDepartemant, TDiscipline, TExameStatemant, TOfferedCourseSection } from "@/types/global";
import { ColumnDef } from "@tanstack/react-table";
import { BookAIcon, Calendar, Eye, FileText, ListChecks, Pen, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
const CreateExameStatemantFrom = dynamic(() => import("@/components/forms/admin/post/exame-statemant"),
   { ssr: false, loading: () => <FormLoading /> })
interface Props {
   departments: TDepartemant[]
   course: TCourse[]
   disciplines: TDiscipline[]
   section: TOfferedCourseSection[]
}

export function ExameStatementColumns({ course, departments, disciplines, section }: Props): ColumnDef<TExameStatemant>[] {

   const contextLabels: Record<string, string> = {
      ADMISSION: "Admissão",
      COURSE: "Curso",
   };

   const typeLabels: Record<ExamType, string> = {
      FREQUENCI: "Frequencia",
      RETAKE: "Recurso",
      SPECIAL: "Especial",
   };

   return [
      {
         accessorKey: "context",
         header: "Contexto",
         cell: ({ row }) => {
            const context = row.getValue("context") as string;
            return (
               <Badge variant="outline">
                  {contextLabels[context] ?? context}
               </Badge>
            );
         },
      },
      {
         accessorKey: "type",
         header: "Tipo",
         cell: ({ row }) => {
            const type = row.getValue("type") as ExamType;
            return (
               <Badge
                  className={cn(
                     type === "FREQUENCI" && "bg-blue-100 text-blue-700",
                     type === "RETAKE" && "bg-amber-100 text-amber-700",
                     type === "SPECIAL" && "bg-purple-100 text-purple-700",
                  )}
               >
                  <b>{typeLabels[type] ?? type}</b>
               </Badge>
            );
         },
      },
      {
         accessorKey: "discipline",
         header: "Disciplina",
         cell: ({ row }) => {
            const discipline = row.original.discipline;
            return (
               <div className="flex items-center gap-2">
                  <BookAIcon className="h-4 w-4 text-orange-500" />
                  <span className="truncate max-w-[180px]">
                     {discipline ?? "—"}
                  </span>
               </div>
            );
         },
      },
      {
         accessorKey: "course",
         accessorFn: (row) => row.courseId,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Curso"
               options={course.map((curs) => ({
                  value: curs.id,
                  label: curs.title
               }))}
            />
         ),
         cell: ({ row }) => (
            <span className="truncate max-w-[160px]">
               {row.original.course ?? "—"}
            </span>
         ),
      },
      {
         accessorKey: "department",
         accessorFn: (row) => row.academicDepartmentId,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Departamento"
               options={departments.map((dep) => ({
                  value: dep.id,
                  label: dep.title
               }))}
            />
         ),
         cell: ({ row }) => (
            <span className="truncate max-w-[160px]">
               {row.original.department ?? "—"}
            </span>
         ),
      },
      {
         accessorKey: "totalQuestions",
         header: "Perguntas",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <ListChecks className="h-4 w-4 text-indigo-500" />
               <span>{row.getValue("totalQuestions")}</span>
            </div>
         ),
      },
      {
         accessorKey: "totalAnswerSheets",
         header: "Folhas de resposta",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <FileText className="h-4 w-4 text-teal-500" />
               <span>{row.getValue("totalAnswerSheets")}</span>
            </div>
         ),
      },
      {
         accessorKey: "createdBy",
         header: "Criado por",
         cell: ({ row }) => (
            <span className="truncate max-w-[160px]">
               {row.getValue("createdBy")}
            </span>
         ),
      },
      {
         accessorKey: "createdAt",
         header: "Data de publicação",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <Calendar className="h-4 w-4 text-red-500" />
               <span className="truncate max-w-[180px]">
                  {formatDate(row.getValue("createdAt"))}
               </span>
            </div>
         ),
      },
      {
         id: "actions",
         header: "Acção",
         cell: ({ row }) => {
            const statement = row.original;

            const handleDelete = async (id: string) => {

               try {
                  const res = await deleteExamStatement(id);
                  if (res.error) {
                     toast.warning(res.message);
                     return;
                  }
                  toast.success(FLASH_MESSAGE.DELETED);
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
                     variant="ghost"
                     id={`view-${uid}`}
                     className="sm:max-w-2xl"
                     title="Detalhes do enunciado"
                     description="Visualizar detalhes do enunciado"
                  >
                     <ExameStatementDetails data={statement} />
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="bottom"
                     variant="outline"
                     id={`edit-${statement.id}`}
                     className="sm:max-w-full"
                     title="Atualizar enuciado"
                     description="Atualizar detalhes do enunciado"
                  >
                     <CreateExameStatemantFrom
                        course={course}
                        departments={departments}
                        disciplines={disciplines}
                        section={section}
                        examStatement={statement}
                     />
                  </SheetModal>

                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(statement.id)}
                  />
               </div>
            );
         },
      },
   ];
}