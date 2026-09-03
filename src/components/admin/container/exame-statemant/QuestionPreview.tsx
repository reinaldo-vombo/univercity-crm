import { Bubbles } from "./bubble";

export function Question({ number, statement, options }: any) {
   const rows = [
      [options[0], options[1]],
      [options[2], options[3]],
   ];

   return (
      <div className="py-4 border-b border-slate-200 last:border-b-0">
         <div className="flex items-start gap-2 mb-3">
            <span className="text-[13px] font-bold text-slate-900 w-5 shrink-0">
               {number}.
            </span>
            <span className="text-[13px] font-medium text-slate-900 leading-snug">
               {statement}
            </span>
         </div>
         <div className="pl-7 space-y-2.5">
            {rows.map((row, i) => (
               <div key={i} className="grid grid-cols-2 gap-x-6">
                  {row.map((opt) => (
                     <Bubbles key={opt.label} label={opt.label} text={opt.text} />
                  ))}
               </div>
            ))}
         </div>
      </div>
   );
}