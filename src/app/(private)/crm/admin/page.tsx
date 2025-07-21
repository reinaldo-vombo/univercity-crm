import { SectionCards } from "@/components/admin/section-card";

export default function AdminDashboard() {
   return (
      <div className="col-span-12">
         <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
               <SectionCards />
               <div className="px-4 lg:px-6">

               </div>
            </div>
         </div>
      </div>
   )
}
