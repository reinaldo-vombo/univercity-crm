export function PreviewBubble({
   label,
   text,
   correct,
}: {
   label: string;
   text: string;
   correct: boolean;
}) {
   return (
      <div className="flex items-start gap-2 w-full">
         <span
            className={[
               "flex items-center justify-center shrink-0 w-5 h-5 rounded-full border text-[10px] font-semibold mt-0.5 transition-colors",
               correct
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                  : "border-slate-400 text-slate-600",
            ].join(" ")}
         >
            {label || "?"}
         </span>
         <span className="text-[13px] leading-snug text-slate-700 break-words">
            {text || <span className="italic text-slate-400">Texto da alternativa...</span>}
         </span>
      </div>
   );
}