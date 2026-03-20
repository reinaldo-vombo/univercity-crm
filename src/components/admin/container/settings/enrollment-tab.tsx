// components/settings/tabs/enrollment-tab.tsx
"use client"

import type { Control } from "react-hook-form"
import { FormControl, FormField, FormItem } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { SettingsSection } from "./settings-section"
import { SettingsRow } from "./settings-row"

interface Props { control: Control<any> }

export function EnrollmentTab({ control }: Props) {
   const items = [
      {
         name: "autoCreateSemesterRegistration" as const,
         label: "Criar registo semestral automaticamente",
         desc: "Quando activo, o sistema cria automaticamente o registo semestral para todos os alunos activos no início de cada semestre, sem intervenção manual.",
      },
      {
         name: "autoAssignDisciplines" as const,
         label: "Atribuir disciplinas automaticamente",
         desc: "O sistema inscreve automaticamente os alunos nas disciplinas obrigatórias do semestre com base no plano curricular e ano em que se encontram.",
      },
      {
         name: "autoConfirmStudents" as const,
         label: "Confirmar alunos automaticamente",
         desc: "Confirma automaticamente a inscrição dos alunos no semestre sem necessitar de aprovação manual por parte da secretaria.",
      },
   ]

   return (
      <div className="flex flex-col gap-6">
         <SettingsSection
            title="Automatização de matrícula"
            description="Controla os processos automáticos no início de cada semestre. Activar estas opções reduz o trabalho manual mas requer que os dados curriculares estejam correctos."
         >
            {items.map((item, i) => (
               <FormField
                  key={item.name}
                  control={control}
                  name={item.name}
                  render={({ field }) => (
                     <FormItem>
                        <SettingsRow
                           label={item.label}
                           description={item.desc}
                           control={
                              <FormControl>
                                 <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                           }
                           last={i === items.length - 1}
                        />
                     </FormItem>
                  )}
               />
            ))}
         </SettingsSection>
      </div>
   )
}