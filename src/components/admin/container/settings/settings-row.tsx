// components/settings/settings-row.tsx
// componente base reutilizável — padrão "linha de definição" estilo telemóvel

import type { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"

interface Props {
   label: string
   description: string
   control: ReactNode
   last?: boolean
}

export function SettingsRow({ label, description, control, last }: Props) {
   return (
      <>
         <div className="flex items-center justify-between gap-8 py-4">
            <div className="flex flex-col gap-0.5">
               <span className="text-sm font-medium leading-none">{label}</span>
               <span className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                  {description}
               </span>
            </div>
            <div className="shrink-0">{control}</div>
         </div>
         {!last && <Separator />}
      </>
   )
}