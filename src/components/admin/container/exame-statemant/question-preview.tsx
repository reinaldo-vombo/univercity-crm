import { PreviewBubble } from "./bubbles-preview";

export function QuestionPreview({ data }: { data: any }) {
   const rows: (typeof data.assertions)[] = [];
   for (let i = 0; i < data.assertions.length; i += 2) {
      rows.push(data.assertions.slice(i, i + 2));
   }

   return (
      <div className="w-full max-w-[520px] bg-white shadow-md ring-1 ring-slate-200 rounded-lg">
         <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-start gap-2">
               <span className="text-[13px] font-bold text-slate-900 w-5 shrink-0">1.</span>
               <span className="text-[13px] font-medium text-slate-900 leading-snug">
                  {data.title || (
                     <span className="italic text-slate-400">Enunciado da questão...</span>
                  )}
               </span>
            </div>
            <div className="pl-7 mt-1">
               <span className="text-[11px] text-slate-400">
                  Vale {data.value || 0} ponto(s)
               </span>
            </div>
         </div>

         <div className="px-6 py-4 pl-9 space-y-2.5">
            {rows.map((row, i) => (
               <div key={i} className="grid grid-cols-2 gap-x-6">
                  {row.map((opt: any, j: any) => (
                     <PreviewBubble
                        key={j}
                        label={opt.label}
                        text={opt.text}
                        correct={opt.correctValue}
                     />
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}