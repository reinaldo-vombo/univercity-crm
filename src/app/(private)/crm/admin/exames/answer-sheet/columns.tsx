import { deleteExamStatement } from "@/actions/statemant";
import AlertModal from "@/components/shared/alert-modal";
import Avatar from "@/components/shared/avatar";
import SheetModal from "@/components/shared/sheet-modal";
import FormLoading from "@/components/skeleton/form";
import { UniversalColumnFilter } from "@/components/table-filters/column-filter";
import { Badge } from "@/components/ui/badge";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { createUniqueId, formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { TSheetStatus } from "@/types/enum";
import { AnswerSheetListItem, TCourse, TSemester, TStudent } from "@/types/global";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Eye, ListChecks, Pen, Trash } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";

const AnswerStatemantFrom = dynamic(() => import("@/components/forms/admin/post/correct-answer-sheet"),
   { ssr: false, loading: () => <FormLoading /> })

interface Props {
   students: TStudent[]
   semester: TSemester[]
   course: TCourse[]
}

export function ExameStatementSheetColumns({ students, course, semester }: Props): ColumnDef<AnswerSheetListItem>[] {


   const typeLabels: Record<TSheetStatus, string> = {
      PENDING: "Pendente",
      PROCESSED: "Processado",
      NEEDS_REVIEW: "Revisão",
      ERROR: "Erro",
   };

   return [
      {
         accessorKey: "person",
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Estudante"
               options={students.map((dep) => ({
                  value: dep.id,
                  label: `${dep?.firstName} ${dep?.lastName}`
               }))}
            />
         ),
         cell: ({ row }) => {
            const person = row.original.person;
            const name = `${person?.firstName} ${person?.lastName}`
            return (
               <div className="flex items-center gap-4">
                  <Avatar photo={person?.profileImage || ''} name={name} className="size-16" />
                  <span className="text-2xl">{name}</span>
               </div>
            );
         },
      },
      {
         accessorKey: "status",
         header: "Estado",
         cell: ({ row }) => {
            const type = row.getValue("status") as TSheetStatus;
            return (
               <Badge
                  className={cn(
                     type === "PROCESSED" && "bg-green-300 text-white",
                     type === "PENDING" && "bg-amber-300 text-amber-700",
                     type === "NEEDS_REVIEW" && "bg-indigo-300 text-purple-700",
                     type === "ERROR" && "bg-purple-100 text-purple-700",
                  )}
               >
                  <b>{typeLabels[type] ?? type}</b>
               </Badge>
            );
         },
      },
      {
         accessorKey: "course",
         accessorFn: (row) => row.course.id,
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
               {row.original.course.title ?? "—"}
            </span>
         ),
      },
      {
         accessorKey: "semester",
         accessorFn: (row) => row.semester.id,
         header: ({ column }) => (
            <UniversalColumnFilter
               column={column}
               title="Semestre"
               options={semester.map((dep) => ({
                  value: dep.id,
                  label: dep.title
               }))}
            />
         ),
         cell: ({ row }) => (
            <span className="truncate max-w-[160px]">
               {row.original.semester.title ?? "—"}
            </span>
         ),
      },
      {
         accessorKey: "totalScore",
         header: "Resultado",
         cell: ({ row }) => (
            <div className="flex items-center gap-2">
               <ListChecks className="h-4 w-4 text-indigo-500" />
               <span>{row.getValue("totalScore")}</span>
            </div>
         ),
      },
      {
         accessorKey: "submittedAt",
         header: "Submissão",
         cell: ({ row }) => (
            <span className="truncate max-w-[160px]">
               {row.getValue("submittedAt")}
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
            const sheet = row.original;

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
                     hello
                  </SheetModal>
                  <SheetModal
                     trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                     side="bottom"
                     variant="outline"
                     id={`edit-${sheet.id}`}
                     className="sm:max-w-full"
                     title="Atualizar enuciado"
                     description="Atualizar detalhes do enunciado"
                  >
                     <AnswerStatemantFrom examStatementId={sheet.id} studentId={sheet.person?.id} />
                  </SheetModal>

                  <AlertModal
                     trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                     action={() => handleDelete(sheet.id)}
                  />
               </div>
            );
         },
      },
   ];
}