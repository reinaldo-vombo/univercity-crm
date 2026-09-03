export function PreviewQuestion({
   number,
   data,
}: {
   number: number;
   data: any["questions"][number];
}) {
   const rows: (typeof data.assertions)[] = [];
   for (let i = 0; i < data.assertions.length; i += 2) {
      rows.push(data.assertions.slice(i, i + 2));
   }

   return (
      <div className="py-4">
         <div className="flex items-start gap-2">
            <span className="text-[13px] font-bold text-slate-900 w-6 shrink-0">
               {number}.
            </span>
            <div className="flex-1">
               <p className="text-[13px] font-medium text-slate-900 leading-snug">
                  {data.title || (
                     <span className="italic text-slate-400">
                        Enunciado da pergunta {number}...
                     </span>
                  )}
               </p>
               <p className="text-[11px] text-slate-400 mt-1">
                  Vale {data.value || 0} ponto(s)
               </p>

               {data.type === "BOOLEAN" && (
                  <div className="mt-3 space-y-2">
                     {rows.map((row, i) => (
                        <div key={i} className="grid grid-cols-2 gap-x-6">
                           {row.map((opt: any, j: any) => (
                              <div key={j} className="flex items-start gap-2">
                                 <span
                                    className={[
                                       "flex items-center justify-center shrink-0 w-5 h-5 rounded-full border text-[10px] font-semibold mt-0.5",
                                       opt.correctValue
                                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                          : "border-slate-400 text-slate-600",
                                    ].join(" ")}
                                 >
                                    {opt.label || "?"}
                                 </span>
                                 <span className="text-[13px] leading-snug text-slate-700 break-words">
                                    {opt.text || (
                                       <span className="italic text-slate-400">
                                          Texto da alternativa...
                                       </span>
                                    )}
                                 </span>
                              </div>
                           ))}
                        </div>
                     ))}
                  </div>
               )}

               {data.type === "WRITTEN" && (
                  <div className="mt-3 border border-dashed border-slate-300 rounded h-16 flex items-center justify-center text-[11px] text-slate-400 italic">
                     Espaço para resposta dissertativa
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}