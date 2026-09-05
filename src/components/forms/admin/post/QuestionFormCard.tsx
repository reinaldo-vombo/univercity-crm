import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, Trash2 } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
const LETTERS = "ABCDEFGH";
function getNextAvailableLabel(currentLabels: string[]) {
   const used = new Set(currentLabels);
   return LETTERS.split("").find((l) => !used.has(l)) ?? "?";
}
function resyncOrder(assertions: any["assertions"]) {
   return assertions.map((a: any, i: any) => ({ ...a, order: i + 1 }));
}
export function QuestionFormCard({
   form,
   qIndex,
   onRemove,
   canRemove,
}: {
   form: any;
   qIndex: number;
   onRemove: () => void;
   canRemove: boolean;
}) {
   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: `questions.${qIndex}.assertions`,
   });

   const liveAssertions = form.watch(`questions.${qIndex}.assertions`) ?? [];
   const correctIndex = fields.findIndex((_, i) => liveAssertions[i]?.correctValue);

   function handleAddAssertion() {
      const currentLabels = form.getValues(`questions.${qIndex}.assertions`).map(
         (a: any) => a.label,
      );
      append({
         label: getNextAvailableLabel(currentLabels),
         text: "",
         correctValue: false,
         order: fields.length + 1,
      });
   }

   function handleRemoveAssertion(index: number) {
      remove(index);
      const remaining = resyncOrder(
         form
            .getValues(`questions.${qIndex}.assertions`)
            .filter((_: any, i: any) => i !== index),
      );
      form.setValue(`questions.${qIndex}.assertions`, remaining);
   }

   function handleSetCorrect(selectedIndex: number) {
      const assertions = form
         .getValues(`questions.${qIndex}.assertions`)
         .map((a: any, i: any) => ({ ...a, correctValue: i === selectedIndex }));
      form.setValue(`questions.${qIndex}.assertions`, assertions, { shouldValidate: true });
   }

   return (
      <Card className="rounded-2xl border-card shadow-sm">
         <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
               <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-600">
                  {qIndex + 1}
               </span>
               <CardTitle className="text-base">Pergunta {qIndex + 1}</CardTitle>
            </div>
            <Button
               type="button"
               variant="ghost"
               size="icon"
               className="text-destructive hover:text-destructive rounded-full cursor-pointer"
               onClick={onRemove}
               disabled={!canRemove}
            >
               <Trash2 className="h-4 w-4" />
            </Button>
         </CardHeader>

         <CardContent className="space-y-5">
            <FormField
               control={form.control}
               name={`questions.${qIndex}.title`}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Enunciado</FormLabel>
                     <FormControl>
                        <Textarea
                           placeholder="Ex: Sobre APIs REST, analise as afirmações abaixo."
                           rows={3}
                           className="resize-none"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <FormField
               control={form.control}
               name={`questions.${qIndex}.value`}
               render={({ field }) => (
                  <FormItem className="max-w-[160px]">
                     <FormLabel>Valor (pontos)</FormLabel>
                     <FormControl>
                        <Input type="number" step="0.5" min={0.5} {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />

            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Alternativas</p>
                  <Button
                     type="button"
                     variant="outline"
                     size="sm"
                     onClick={handleAddAssertion}
                     disabled={fields.length >= LETTERS.length}
                  >
                     + Adicionar
                  </Button>
               </div>

               <RadioGroup
                  value={String(correctIndex)}
                  onValueChange={(value) => handleSetCorrect(Number(value))}
                  className="space-y-3"
               >
                  {fields.map((field, index) => {
                     const isCorrect = index === correctIndex;
                     return (
                        <div
                           key={field.id}
                           className={cn(
                              "flex items-center gap-3 rounded-xl border p-3 transition-colors",
                              isCorrect ? "border-emerald-300" : "border-card bg-card",
                           )}
                        >
                           <FormField
                              control={form.control}
                              name={`questions.${qIndex}.assertions.${index}.label`}
                              render={({ field }) => (
                                 <FormItem className="w-fit">
                                    <FormLabel className="text-xs"></FormLabel>
                                    <FormControl>
                                       <Input className="w-10" maxLength={1} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <FormField
                              control={form.control}
                              name={`questions.${qIndex}.assertions.${index}.text`}
                              render={({ field }) => (
                                 <FormItem className="flex-1">
                                    <FormLabel className="text-xs">Texto da alternativa</FormLabel>
                                    <FormControl>
                                       <Textarea rows={2} className="resize-none rounded-lg" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />

                           <div className="flex flex-col items-center gap-1 pt-6 w-16 shrink-0">
                              <FormLabel className="text-[10px] uppercase tracking-wide text-slate-400">
                                 Correta
                              </FormLabel>
                              <div className="flex items-center gap-1">
                                 {isCorrect && <Check className="h-3.5 w-3.5 text-emerald-600" />}
                                 <RadioGroupItem value={String(index)} />
                              </div>
                           </div>

                           <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="mt-6 shrink-0 text-destructive hover:text-destructive"
                              onClick={() => handleRemoveAssertion(index)}
                              disabled={fields.length <= 2}
                           >
                              <Trash2 className="h-4 w-4" />
                           </Button>
                        </div>
                     );
                  })}
               </RadioGroup>

               {form.formState.errors.questions?.[qIndex]?.assertions?.root && (
                  <p className="text-sm font-medium text-destructive">
                     {form.formState.errors.questions[qIndex].assertions.root.message?.toString()}
                  </p>
               )}
            </div>
         </CardContent>
      </Card>
   );
}
