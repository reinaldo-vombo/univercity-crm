// components/settings/university-config-form.tsx
"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AcademicTab } from "@/components/admin/container/settings/academic-tab"
import { PaymentsTab } from "@/components/admin/container/settings/payments-tab"
import { EnrollmentTab } from "@/components/admin/container/settings/enrollment-tab"
import { TransfersTab } from "@/components/admin/container/settings/transfers-tab"
import { TUniversityConfig } from "@/types/global"
import { universityConfigSchema } from "@/lib/validation/university-conf"
import { z } from "zod"


interface Props { defaultValues: TUniversityConfig }
// interface Props { defaultValues: TUniversityConfig }

export function UniversityConfigForm({ defaultValues }: Props) {
   const form = useForm<z.infer<typeof universityConfigSchema>>({
      resolver: zodResolver(universityConfigSchema),
      defaultValues,
   })

   function onSubmit(values: z.infer<typeof universityConfigSchema>) {
      console.log(values) // substituir pelo teu server action
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <Tabs defaultValue="academic">
               <TabsList className="w-full justify-start">
                  <TabsTrigger value="academic">Académico</TabsTrigger>
                  <TabsTrigger value="payments">Pagamentos</TabsTrigger>
                  <TabsTrigger value="enrollment">Matrícula</TabsTrigger>
                  <TabsTrigger value="transfers">Transferências</TabsTrigger>
               </TabsList>

               <TabsContent value="academic" className="mt-6"><AcademicTab control={form.control} /></TabsContent>
               <TabsContent value="payments" className="mt-6"><PaymentsTab control={form.control} /></TabsContent>
               <TabsContent value="enrollment" className="mt-6"><EnrollmentTab control={form.control} /></TabsContent>
               <TabsContent value="transfers" className="mt-6"><TransfersTab control={form.control} /></TabsContent>
            </Tabs>

            <div className="flex justify-end border-t pt-4">
               <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? "A guardar…" : "Guardar configurações"}
               </Button>
            </div>
         </form>
      </Form>
   )
}