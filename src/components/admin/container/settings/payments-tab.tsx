// components/settings/tabs/payments-tab.tsx
"use client"

import type { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SettingsSection } from "./settings-section"
import { SettingsRow } from "./settings-row"

interface Props { control: Control<any> }

export function PaymentsTab({ control }: Props) {
   return (
      <div className="flex flex-col gap-6">
         <SettingsSection
            title="Propinas e cobranças"
            description="Define as regras de pagamento e os bloqueios por dívida."
         >
            <FormField
               control={control}
               name="monthlyPaymentDueDay"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Dia limite de pagamento mensal"
                        description="Dia do mês até ao qual o aluno deve efectuar o pagamento da propina sem incorrer em multa de atraso. Ex: 10 = até ao dia 10 de cada mês."
                        control={<FormControl><Input type="number" min={1} max={31} className="w-20 text-center" {...field} /></FormControl>}
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="blockEnrollmentOnDebt"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Bloquear inscrição por dívida"
                        description="Impede que o aluno se inscreva em novos semestres ou disciplinas enquanto tiver propinas em atraso."
                        control={<FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>}
                     />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="blockEnrollmentIfDebt"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Bloquear matrícula anual por dívida"
                        description="Bloqueia a renovação da matrícula anual quando o aluno tem dívidas pendentes do ano anterior."
                        control={<FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>}
                        last
                     />
                  </FormItem>
               )}
            />
         </SettingsSection>
      </div>
   )
}