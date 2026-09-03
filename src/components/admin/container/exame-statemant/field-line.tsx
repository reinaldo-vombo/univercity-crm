export function FieldLine({ label, flex = 1 }: any) {
   return (
      <div className="flex items-baseline gap-2" style={{ flex }}>
         <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
            {label}:
         </span>
         <span className="flex-1 border-b border-slate-400 h-4" />
      </div>
   );
}