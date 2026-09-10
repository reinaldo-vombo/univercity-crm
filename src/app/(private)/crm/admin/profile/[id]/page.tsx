import AdminProfileSkeleton from "@/components/skeleton/prefile";
import { Suspense } from "react";
import ProfileWrapper from "../server-wrapper";


export default function Prefil({ params }: PageProps<'/crm/admin/profile/[id]'>) {
   return (
      <div className="col-span-12">
         <Suspense fallback={<AdminProfileSkeleton />}>
            <ProfileWrapper params={params} />
         </Suspense>
      </div>
   )
}
