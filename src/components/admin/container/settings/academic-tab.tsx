// components/settings/tabs/academic-tab.tsx
"use client"

import type { Control } from "react-hook-form"
import {
   FormControl, FormField,
   FormItem, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { SettingsSection } from "./settings-section"
import { SettingsRow } from "./settings-row"
import { DatePickerWithRange } from "@/components/shared/DatePickerWithRange"

interface Props { control: Control<any> }

export function AcademicTab({ control }: Props) {
   return (
      <div className="flex flex-col gap-6">

         {/* Limites numéricos */}
         <SettingsSection
            title="Limites de progressão"
            description="Define os limites máximos que determinam a progressão académica do aluno."
         >
            <FormField
               control={control}
               name="maxFailedSubjectsToProgress"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Máx. disciplinas reprovadas para progredir"
                        description="Número máximo de disciplinas reprovadas que ainda permite ao aluno transitar de ano. Acima deste valor o aluno fica retido."
                        control={
                           <FormControl>
                              <Input type="number" className="w-20 text-center" {...field} />
                           </FormControl>
                        }
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="maxSubjectsPerSemester"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Máx. disciplinas por semestre"
                        description="Limite de disciplinas que um aluno pode estar inscrito simultaneamente num semestre."
                        control={
                           <FormControl>
                              <Input type="number" className="w-20 text-center" {...field} />
                           </FormControl>
                        }
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="minimumPassingGrade"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Nota mínima de aprovação"
                        description="Valor mínimo (em valores de 0–20) para que uma disciplina seja considerada aprovada."
                        control={
                           <FormControl>
                              <Input type="number" step="0.5" className="w-20 text-center" {...field} />
                           </FormControl>
                        }
                        last
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
         </SettingsSection>

         {/* Exames e recurso */}
         <SettingsSection
            title="Exames e recurso"
            description="Configura as regras de acesso a exames de recurso e especial."
         >
            <FormField
               control={control}
               name="maxSubjectsInResit"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Máx. disciplinas em recurso"
                        description="Número máximo de disciplinas em que o aluno pode realizar exame de recurso por semestre."
                        control={<FormControl><Input type="number" className="w-20 text-center" {...field} /></FormControl>}
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="maxSubjectsInSpecialExam"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Máx. disciplinas em exame especial"
                        description="Número máximo de disciplinas em que o aluno pode realizar exame especial."
                        control={<FormControl><Input type="number" className="w-20 text-center" {...field} /></FormControl>}
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="maxExamAttemptsTotal"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Máx. tentativas de exame de acesso (total)"
                        description="Total de vezes que o aluno pode realizar exame de acesso, em outras palavras número de tentativas, também define o número fase."
                        control={<FormControl><Input type="number" className="w-20 text-center" {...field} /></FormControl>}
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={control}
               name="maxExamAttemptsPerYear"
               render={({ field }) => (
                  <FormItem>
                     <SettingsRow
                        label="Máx. tentativas de exame por ano"
                        description="Limite de tentativas de exame que o aluno pode usar num único ano lectivo."
                        control={<FormControl><Input type="number" className="w-20 text-center" {...field} /></FormControl>}
                     />
                     <FormMessage />
                  </FormItem>
               )}
            />

            {/* date range — inscrição em recurso */}
            <FormField
               control={control}
               name="resitRegistrationStart"
               render={({ field: startField }) => (
                  <FormField
                     control={control}
                     name="resitRegistrationEnd"
                     render={({ field: endField }) => (
                        <FormItem>
                           <SettingsRow
                              label="Período de inscrição em recurso"
                              description="Datas de início e fim do período em que os alunos podem inscrever-se nos exames de recurso."
                              control={
                                 <FormControl>
                                    <DatePickerWithRange
                                       from={startField.value ?? undefined}
                                       to={endField.value ?? undefined}
                                       onSelect={(range) => {
                                          startField.onChange(range?.from ?? null)
                                          endField.onChange(range?.to ?? null)
                                       }}
                                    />
                                 </FormControl>
                              }
                              last
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               )}
            />
         </SettingsSection>

         {/* Switches académicos */}
         <SettingsSection
            title="Regras académicas"
            description="Comportamentos automáticos e restrições aplicadas ao percurso do aluno."
         >
            {[
               {
                  name: "allowOptionalCourses" as const,
                  label: "Permitir cadeiras opcionais",
                  desc: "Quando activo, os alunos podem inscrever-se em disciplinas opcionais além do plano curricular obrigatório.",
               },
               {
                  name: "allowRetryOnlyIfFailed" as const,
                  label: "Recurso apenas para reprovados",
                  desc: "Restringe o acesso ao exame de recurso a alunos que tenham reprovado. Alunos aprovados não podem realizar recurso.",
               },
               {
                  name: "allowSpecialExamOnlyForFinalYear" as const,
                  label: "Exame especial só para finalistas",
                  desc: "Limita o exame especial a alunos do último ano do curso.",
               },
               {
                  name: "blockIfPendingResult" as const,
                  label: "Bloquear se houver resultado pendente",
                  desc: "Impede a progressão do aluno enquanto existir alguma nota por lançar no semestre actual.",
               },
               {
                  name: "gradeSubmissionUpdate" as const,
                  label: "Permitir actualização de notas após submissão",
                  desc: "Quando activo, os docentes podem corrigir notas já submetidas. Recomenda-se desactivar após o fecho do semestre.",
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

      </div>
   )
}