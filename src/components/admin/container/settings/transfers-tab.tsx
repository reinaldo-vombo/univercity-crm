// components/settings/tabs/transfers-tab.tsx
"use client"

import type { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import {
   Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { SettingsSection } from "./settings-section"
import { SettingsRow } from "./settings-row"
import Selector from "@/components/shared/selector"

interface Props { control: Control<any> }

const COURSE_TRANFER_TYPE = [
   {
      id: '1',
      label: 'Fim do semestre',
      value: 'END_OF_SEMESTER'
   },
   {
      id: '2',
      label: 'Início do semestre',
      value: 'ENROLLMENT_PERIOD'
   },
   {
      id: '3',
      label: 'A qualquer momento',
      value: 'ANYTIME'
   },
]

export function TransfersTab({ control }: Props) {
   return (
      <div className="flex flex-col gap-6">

         <SettingsSection
            title="Permissões de transferência"
            description="Define se os alunos podem solicitar transferências de curso ou turno."
         >
            {[
               {
                  name: "allowCourseTransfer" as const,
                  label: "Permitir transferência de curso",
                  desc: "Autoriza que os alunos solicitem transferência para outro curso dentro da instituição.",
               },
               {
                  name: "allowShiftTransfer" as const,
                  label: "Permitir transferência de turno",
                  desc: "Autoriza que os alunos solicitem mudança de turno (ex: manhã para noite) sem mudar de curso.",
               },
               {
                  name: "courseTransferRequiresApproval" as const,
                  label: "Transferência requer aprovação",
                  desc: "Quando activo, cada pedido de transferência fica pendente até ser aprovado manualmente por um administrador.",
               },
            ].map((item, i, arr) => (
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
                                 <Switch checked={field.value as boolean} onCheckedChange={field.onChange} />
                              </FormControl>
                           }
                           last={i === arr.length - 1}
                        />
                     </FormItem>
                  )}
               />
            ))}
         </SettingsSection>

         <SettingsSection
            title="Custos e condições"
            description="Configura se a transferência tem custo associado e em que período pode ser solicitada."
         >
            <FormField
               control={control}
               name="courseTransferHasCost"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Transferência tem custo"
                        description="Quando activo, é cobrada uma taxa ao aluno que solicita transferência de curso."
                        control={<FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>}
                     />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="courseTransferFee"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Valor da taxa de transferência (Kz)"
                        description="Montante cobrado ao aluno aquando da aprovação do pedido de transferência. Apenas aplicável se 'Transferência tem custo' estiver activo."
                        control={<FormControl><Input type="number" className="w-32 text-right" {...field} /></FormControl>}
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="courseTransferPeriod"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Período de transferência"
                        description="Define em que momento do ano lectivo os pedidos de transferência podem ser submetidos."
                        control={
                           <FormControl>
                              <Selector
                                 formField={field}
                                 options={COURSE_TRANFER_TYPE}
                                 placeholder="Periodo de tranferencia" />
                           </FormControl>
                        }
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="courseTransferKeepGrades"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Notas após transferência"
                        description="Define o que acontece às notas do aluno quando a transferência é aprovada. 'Admin decide' permite caso a caso."
                        control={
                           <FormControl>
                              <Select value={field.value} onValueChange={field.onChange}>
                                 <SelectTrigger className="w-48">
                                    <SelectValue />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="KEEP">Manter notas</SelectItem>
                                    <SelectItem value="RESET">Reiniciar notas</SelectItem>
                                    <SelectItem value="ADMIN_DECIDES">Admin decide</SelectItem>
                                 </SelectContent>
                              </Select>
                           </FormControl>
                        }
                        last
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
         </SettingsSection>

      </div>
   )
}