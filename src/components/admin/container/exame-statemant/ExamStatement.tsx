import { ExamStatementFormValues } from "@/lib/validation/exame-statemant";
import { PreviewHeader } from "./preview-header";
import { PreviewQuestion } from "./preview-question";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function ExamStatementPreview({ data, info }: { data: ExamStatementFormValues, info: any }) {

   return (
      <div className="w-full max-w-2xl bg-white shadow-md ring-1 ring-slate-200 rounded-2xl px-10 py-8">
         <PreviewHeader data={data} info={info} />

         {data.questions.length === 0 ? (
            <p className="text-center text-[12px] italic text-slate-400 py-10">
               Adicione o enunciado e as alternativas para ver a pré-visualização.
            </p>
         ) : (
            <ScrollArea className="divide-y divide-slate-100 h-[400px]">
               {data.questions.map((q, i) => (
                  <PreviewQuestion key={i} number={i + 1} data={q} />
               ))}
            </ScrollArea>
         )}
         <Separator />
         <div className="text-center text-black text-sm">
            <p>Campus da Universidade Manuel Xavier, Travessa do Talatona S/N, Morro Bento</p>
            <p>Contatos: +244 923456789</p>
         </div>
      </div>
   );
}