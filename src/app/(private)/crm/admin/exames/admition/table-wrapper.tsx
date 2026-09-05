
import { getAllAdmitionExames } from "@/services/data/academic";
import { AdmitionExameTable } from "./client-table";
import MetricsCard from "@/components/layouts/cards/metrics-card";
import { Check, TimerReset, X } from "lucide-react";

export async function AdmitionExameTableServer() {

   const exames = await getAllAdmitionExames()
   const cadidatesCount = (status: string) => {
      const filter = exames.filter((item) => item.status === status);
      return filter.length
   }

   const cadidatesStatus = [
      { id: '1', icon: Check, title: 'Confirmados', className: 'text-green-500', total: cadidatesCount('CONFIRMED') || 0 },
      { id: '2', icon: TimerReset, title: 'Pendentes', className: 'text-amber-500', total: cadidatesCount('WAITING_LIST') || 0 },
      { id: '3', icon: X, title: 'Cancelados', className: 'text-red-500', total: cadidatesCount('CANCELLED') || 0 },
   ]

   return (
      <div>
         <MetricsCard data={cadidatesStatus} />
         <AdmitionExameTable exames={exames} />
      </div>
   );
}
