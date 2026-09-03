export function Bubbles({ label, text }: any) {
   return (
      <div className="flex items-start gap-2 w-full">
         <span className="flex items-center justify-center shrink-0 w-5 h-5 rounded-full border border-slate-400 text-[10px] font-semibold text-slate-600 mt-0.5">
            {label}
         </span>
         <span className="text-[13px] leading-snug text-slate-700">{text}</span>
      </div>
   );
}