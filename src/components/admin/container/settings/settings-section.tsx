// components/settings/settings-section.tsx

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface Props {
   title: string
   description?: string
   children: ReactNode
}

export function SettingsSection({ title, description, children }: Props) {
   return (
      <Card>
         <CardHeader className="pb-2">
            <CardTitle className="text-base">{title}</CardTitle>
            {description && (
               <CardDescription>{description}</CardDescription>
            )}
         </CardHeader>
         <CardContent className="px-6 py-0 pb-2">
            {children}
         </CardContent>
      </Card>
   )
}