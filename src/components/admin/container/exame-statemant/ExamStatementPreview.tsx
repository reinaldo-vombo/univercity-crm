import { questions } from "./constatnts";
import { FieldLine } from "./field-line";
import { Question } from "./QuestionPreview";

export default function ExamPreview() {
   return (
      <div className="min-h-screen bg-slate-100 py-10 px-4 flex justify-center">
         <div className="w-full max-w-[820px] bg-white shadow-md ring-1 ring-slate-200">
            {/* Header */}
            <div className="px-10 pt-8 pb-5 text-center border-b-2 border-slate-800">
               <div className="mx-auto mb-2 w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center">
                  <span className="text-white text-[11px] font-bold tracking-wide">
                     SIGU
                  </span>
               </div>
               <h1 className="text-[15px] font-bold uppercase tracking-wide text-slate-900">
                  Departamento Académico
               </h1>
               <p className="text-[9px] text-slate-500 mt-1">
                  contacto@instituicao.ao
               </p>
               <div className="mt-3 py-2 border-t border-b border-slate-300">
                  <p className="text-[13px] font-bold uppercase tracking-wide text-slate-900">
                     Retake &mdash; 1º Semestre &mdash; Ano Lectivo: 2025
                  </p>
               </div>
            </div>

            {/* Student info */}
            <div className="px-10 py-5 space-y-3 border-b border-slate-200">
               <FieldLine label="Nome do Aluno" />
               <div className="flex gap-6">
                  <FieldLine label="Disciplina" flex={2} />
                  <FieldLine label="Professor" flex={1} />
               </div>
               <div className="flex gap-6">
                  <FieldLine label="Curso" flex={2} />
                  <FieldLine label="Turma" flex={1} />
                  <FieldLine label="Variante" flex={1} />
               </div>
               <div className="pl-[calc(2rem+0.5rem)] -mt-1">
                  <span className="text-[11px] text-slate-500">
                     Professor: <span className="text-slate-800 font-medium">Root Admin</span> &middot; Variante: <span className="text-slate-800 font-medium">A</span>
                  </span>
               </div>
            </div>

            {/* Instructions */}
            <div className="px-10 py-4 bg-slate-50 border-b border-slate-200">
               <p className="text-[10px] font-bold uppercase tracking-wide text-slate-700 mb-2">
                  Instruções / Regras
               </p>
               <ol className="text-[11px] text-slate-600 space-y-1 list-decimal list-inside">
                  <li>Leia atentamente cada questão antes de responder.</li>
                  <li>Selecione apenas uma alternativa por questão.</li>
                  <li>Preencha completamente o círculo correspondente à resposta escolhida.</li>
                  <li>Não faça marcas fora das áreas destinadas às respostas.</li>
               </ol>
            </div>

            {/* Questions */}
            <div className="px-10">
               {questions.map((q) => (
                  <Question key={q.number} {...q} />
               ))}
            </div>

            {/* Footer */}
            <div className="px-10 py-4 flex items-center justify-between text-[9px] text-slate-400 border-t border-slate-200">
               <span>Tel.: &mdash;</span>
               <span>SIGU &mdash; Sistema Integrado de Gestão Universitária</span>
               <span>Página 1 de 2</span>
            </div>
         </div>
      </div>
   );
}