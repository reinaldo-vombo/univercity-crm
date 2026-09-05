import MarkSheetWrapper from "@/components/admin/wrapper/markSheet-wrapper";
import { Suspense } from "react";


export default function StudentMarks() {
   return (
      <section className="col-span-12">
         <Suspense>
            <MarkSheetWrapper studentId={'jjj'} semester={'1º Semestre'} year={2024} />
         </Suspense>
      </section>
   )
}
