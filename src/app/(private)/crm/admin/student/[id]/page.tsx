
import PagePreview from "@/components/admin/container/student/page-preview";
import StudentPageSkeleton from "@/components/skeleton/student";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";


export default function SigleStudentPage({ params }: {
   params: Promise<{ id: string }>
}) {
   return (
      <section className="col-span-12">
         <div className="flex gap-3 mb-12">
            <Button variant={'link'}><ArrowLeft /></Button>
            <h2 className="text-3xl font-bold">Detalhes do Estudante</h2>
         </div>
         <Suspense fallback={<StudentPageSkeleton />}>
            <PagePreview params={params} />
         </Suspense>

      </section>
   )
}
