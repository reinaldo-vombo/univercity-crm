"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { ExamStatementFormValues, examStatementSchema } from "@/lib/validation/exame-statemant";
import { handleApiError } from "@/services/error-handler";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { ExamStatementPreview } from "@/components/admin/container/exame-statemant/ExamStatement";
import { QuestionFormCard } from "./QuestionFormCard";
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import StatementToolbar from "@/components/admin/container/exame-statemant/statemante-tool-bar";
import { createExamStatement, updateExamStatement } from "@/actions/statemant";
import { TCourse, TDepartemant, TDiscipline, TExameStatemant, TOfferedCourseSection } from "@/types/global";
import { useMemo } from "react";
import { useSheet } from "@/providers/sheet-provider";
type Props = {
   examStatement?: TExameStatemant;
   departments: TDepartemant[]
   course: TCourse[]
   disciplines: TDiscipline[]
   section: TOfferedCourseSection[]
}

function mapExamStatementToFormValues(examStatement: TExameStatemant) {
   return {
      id: examStatement.id,
      context: examStatement.context,
      type: examStatement.type,
      courseId: examStatement.courseId,
      offeredCourseSectionId: examStatement.offeredCourseSectionId,
      disciplineId: examStatement.disciplineId ?? undefined,
      academicDepartmentId: examStatement.academicDepartmentId ?? undefined,
      course: examStatement.course ?? undefined,
      discipline: examStatement.discipline ?? undefined,
      questions: examStatement.questions.map((sq) => ({
         id: sq.id,
         order: sq.order,
         title: sq.title,
         type: sq.type,
         value: sq.value,
         assertions: sq.assertions.map((a) => ({
            id: a.id, // idem
            label: a.label ?? "",
            text: a.text ?? "",
            correctValue: a.correctValue,
            order: a.order,
         })),
      })),
   };
}
function createEmptyQuestion() {
   return {
      title: "",
      value: 1,
      type: "BOOLEAN",
      assertions: [
         { label: "A", text: "", correctValue: true, order: 1 },
         { label: "B", text: "", correctValue: false, order: 2 },
      ],
   };
}

// const defaultValues = {
//    disciplineId: undefined,
//    academicDepartmentId: undefined,
//    department: undefined,
//    course: undefined,
//    discipline: undefined,
//    questions: [createEmptyQuestion()],
// };


export default function QuestionEditPage({
   course,
   departments,
   disciplines, section, examStatement }: Props) {

   const { close } = useSheet()
   const isEditing = Boolean(examStatement?.id);

   const defaultValues = useMemo(() => {
      if (examStatement) {
         return mapExamStatementToFormValues(examStatement);
      }

      return {
         disciplineId: undefined,
         academicDepartmentId: undefined,
         department: undefined,
         course: undefined,
         discipline: undefined,
         questions: [createEmptyQuestion()],
      };
   }, [examStatement]);

   const form = useForm<any>({
      resolver: zodResolver(examStatementSchema),
      defaultValues,
      mode: "onChange",
   });
   const {
      formState: { isSubmitting },
   } = form;


   const liveData = form.watch();

   async function onSubmit(values: ExamStatementFormValues) {
      const formData: any = new FormData();

      Object.entries(values).forEach(([key, value]) => {
         // 👇 arrays de objetos
         if (Array.isArray(value) && typeof value[0] === "object") {
            formData.append(key, JSON.stringify(value));
            return;
         }

         // 👇 arrays simples (string, number, etc)
         if (Array.isArray(value)) {
            value.forEach((v) => formData.append(key, String(v)));
            return;
         }

         // 👇 valores simples
         formData.append(key, String(value));
      });
      try {
         let result;

         if (isEditing && examStatement?.id) {
            result = await updateExamStatement(formData);
         } else {
            result = await createExamStatement(formData);
         }
         if (result?.error) {
            toast.error(result.message);
            return;
         }

         toast.success(FLASH_MESSAGE.CREATED);
         close()
         form.reset();
      } catch (error) {
         handleApiError(error);
      }
   }
   const {
      fields: questionFields,
      append: appendQuestion,
      remove: removeQuestion,
   } = useFieldArray({
      control: form.control,
      name: "questions",
   });


   function handleAddQuestion() {
      appendQuestion(createEmptyQuestion());
   }

   function handleRemoveQuestion(index: number) {
      removeQuestion(index);
   }
   const onInvalid = (errors: unknown) => {
      console.error("Validation Errors:", errors);
   };

   return (
      <div className="min-h-screen ">
         <div className="px-6 py-10">
            <div className="mb-8 flex items-end justify-between">
               <div>
                  <h1 className="mt-1 text-2xl font-semibold">
                     {isEditing ? "Editar enunciado" : "Criar enunciado"}
                  </h1>
                  <p className="mt-1 text-sm">
                     Adicione uma ou mais perguntas. A pré-visualização à direita
                     atualiza-se em tempo real.
                  </p>
               </div>
               <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                  {questionFields.length} {questionFields.length === 1 ? "pergunta" : "perguntas"}
               </span>
            </div>

            <Form {...form}>
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="p-2 col-span-4">
                     <ScrollArea className="h-[800px]">

                        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-5">

                           {questionFields.map((field, index) => (
                              <QuestionFormCard
                                 key={field.id}
                                 form={form}
                                 qIndex={index}
                                 onRemove={() => handleRemoveQuestion(index)}
                                 canRemove={questionFields.length > 1}
                              />
                           ))}

                           <Button
                              type="button"
                              variant="outline"
                              className="w-full border-dashed rounded-lg"
                              onClick={handleAddQuestion}
                           >
                              + Adicionar pergunta
                           </Button>

                           <div className="flex justify-end gap-3 pt-2">
                              <Button type="button" variant="outline">
                                 Cancelar
                              </Button>
                              <Button type="submit" disabled={isSubmitting}>
                                 {isEditing ? "Guardar alterações" : "Criar enunciado"}
                              </Button>
                           </div>
                        </form>
                     </ScrollArea>
                  </div>
                  <div className="lg:sticky lg:top-10 self-start col-span-5">
                     <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-3">
                        Pré-visualização
                     </p>
                     <div className="rounded-2xl p-6 flex justify-center">
                        <ExamStatementPreview
                           data={liveData}
                           info={{ course, departments, disciplines }}
                        />
                     </div>
                  </div>
                  <div className="col-span-3">
                     <StatementToolbar
                        course={course}
                        sections={section}
                        departments={departments}
                        disciplines={disciplines}
                     />
                  </div>
               </div>
            </Form>
         </div>

      </div>
   );
}