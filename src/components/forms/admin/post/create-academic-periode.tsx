// components/CreateServicePeriodForm.tsx
"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, PlusCircle } from "lucide-react";
import { createPeriodSchema } from "@/lib/validation/secretary";
import SubmitBtn from "@/components/shared/submit-btn";
import { useTransition } from "react";
import { CreateServicePeriod } from "@/actions/secretary";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { useSheet } from "@/providers/sheet-provider";
import { handleApiError } from "@/services/error-handler";
const defaultPeriod = {
   type: "RESIT" as const,
   startDate: "",
   endDate: "",
   isActive: true,
};

export function CreateServicePeriodForm() {
   const { close } = useSheet();
   const form = useForm<z.infer<typeof createPeriodSchema>>({
      resolver: zodResolver(createPeriodSchema),
      defaultValues: {
         periods: [defaultPeriod],
      },
   });

   const { fields, append, remove } = useFieldArray({
      control: form.control,
      name: "periods",
   });
   const [isPending, startTransition] = useTransition();
   const onSubmit = async (values: z.infer<typeof createPeriodSchema>) => {
      const formData: any = new FormData();
      Object.entries(values).forEach(([key, value]) => {
         if (Array.isArray(value) && typeof value[0] === "object") {
            formData.append(key, JSON.stringify(value));
            return;
         }
      });

      startTransition(async () => {
         try {
            const result = await CreateServicePeriod(formData);
            if (result.error) {
               toast.error(result.message);
               return
            }

            toast.success(FLASH_MESSAGE.CREATED)
            form.reset();
            close()
         } catch (err) {
            toast.error(FLASH_MESSAGE.UNESPECTED_ERROR);
            handleApiError(err);
         }

      })
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {fields.map((field, index) => (
               <Card key={field.id}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                     <CardTitle className="text-sm font-medium">
                        Período {index + 1}
                     </CardTitle>
                     {fields.length > 1 && (
                        <Button
                           type="button"
                           variant="ghost"
                           size="icon"
                           onClick={() => remove(index)}
                        >
                           <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                     )}
                  </CardHeader>

                  <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                     {/* Tipo */}
                     <FormField
                        control={form.control}
                        name={`periods.${index}.type`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Tipo</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Seleciona o tipo" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    <SelectItem value="NORMAL">Normal</SelectItem>
                                    <SelectItem value="RESIT">Recurso</SelectItem>
                                    <SelectItem value="SPECIAL">Especial</SelectItem>
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Data de Início */}
                     <FormField
                        control={form.control}
                        name={`periods.${index}.startDate`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Data de Início</FormLabel>
                              <FormControl>
                                 <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Data de Fim */}
                     <FormField
                        control={form.control}
                        name={`periods.${index}.endDate`}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Data de Fim</FormLabel>
                              <FormControl>
                                 <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </CardContent>
               </Card>
            ))}

            <div className="flex items-center justify-between pt-2">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() => append(defaultPeriod)}
               >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Adicionar período
               </Button>

               <SubmitBtn label="Registar" loading={isPending} />
            </div>
         </form>
      </Form>
   );
}