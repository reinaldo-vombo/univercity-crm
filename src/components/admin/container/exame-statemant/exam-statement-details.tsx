import { clientEnv } from "@/config/env/client"
import { ExamType } from "@/types/enum"
import { TExameStatemant } from "@/types/global"
import Image from "next/image"

type TProps = {
   data: TExameStatemant
}

function exameType(type: ExamType) {
   const t = type === 'FREQUENCI' ? 'Frequencia' : type === 'RETAKE' ? 'Recurso' : 'Recuperação';
   return t
}

const ExameStatementDetails = ({ data }: TProps) => {
   return (
      <div className="space-y-4">
         {/* Ações */}
         <div className="flex justify-end gap-2">
            <a
               href={data.statementUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="rounded-md border px-4 py-2 text-sm font-medium"
            >
               Visualizar PDF
            </a>

            <a
               href={data.statementUrl}
               download
               className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white"
            >
               Baixar PDF
            </a>
         </div>

         {/* Documento */}
         <div className="">
            {/* Cabeçalho */}
            <div className="border-b pb-6">
               <div className="flex">
                  <Image src='/logo.svg'
                     className="mx-auto size-11 dark:invert"
                     width={90}
                     height={90}
                     alt={clientEnv.NEXT_PUBLIC_UNIVERCITY_NAME}
                     style={{ width: 'auto', height: 'auto' }}
                  />
               </div>
               <h1 className="text-center text-lg font-bold uppercase">
                  {clientEnv.NEXT_PUBLIC_UNIVERCITY_NAME}
               </h1>
               <p className="mt-0.5 text-center">
                  {data.context === "ADMISSION" ? "Exame de Admissão" : "Exame de Curso"}
                  {data.type ? ` · ${exameType(data.type)}` : ""}
               </p>
               <h1 className="text-center text-lg font-bold uppercase">
                  Departamento Académico
               </h1>

               <div className="mt-4 dark:text-neutral-500 text-sm space-y-6">
                  <p>
                     <strong>Nome do Aluno:</strong> ___________________________________________
                  </p>
                  <p>
                     <strong>Disciplina:</strong> {data.discipline || 'Não atribuida'}
                  </p>

                  <p>
                     <strong>Professor:</strong> {data.faculty || data.createdBy}
                  </p>

                  <p>
                     <strong>Curso:</strong> {data.course || ''}
                  </p>

                  <p>
                     <strong>Turma:</strong> {data.offeredCourseSection || ''}
                  </p>

                  <p>
                     <strong>Variante:</strong> A
                  </p>
               </div>
            </div>

            {/* Instruções */}
            <div className="border-b py-6">
               <h2 className="mb-3 text-base font-bold">
                  INSTRUÇÕES / REGRAS
               </h2>

               <ol className="list-decimal space-y-1 pl-5 text-sm">
                  <li>
                     Leia atentamente cada questão antes de responder.
                  </li>

                  <li>
                     Selecione apenas uma alternativa por questão.
                  </li>

                  <li>
                     Preencha completamente o círculo correspondente à resposta
                     escolhida.
                  </li>

                  <li>
                     Não faça marcas fora das áreas destinadas às respostas.
                  </li>
               </ol>
            </div>

            {/* Questões */}
            <div className="space-y-6 py-6">
               {data.questions?.map((question, index) => (
                  <div key={question.id} className="space-y-3">
                     <p className="font-medium">
                        {index + 1}. {question.title}
                     </p>

                     <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                        {question.assertions.map((option) => (
                           <div
                              key={option.id}
                              className="flex items-start gap-2 text-sm"
                           >
                              <span className="font-semibold">
                                 {option.order || ''}
                              </span>

                              <span>{option.text}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default ExameStatementDetails
