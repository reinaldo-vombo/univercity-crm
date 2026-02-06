
import { getAllAdmitionExames, getAllAdmitionExamesFase, getAllBuilding } from "@/services/data/academic";
import { AdmitionExameTable } from "./client-table";
import AdmitionExameFases from "./admition-exame-fases";

export async function AdmitionExameTableServer() {

   const [exames, fases, buildings] = await Promise.all([
      getAllAdmitionExames(),
      getAllAdmitionExamesFase(),
      getAllBuilding()
   ])

   return (
      <>
         <AdmitionExameTable exames={exames} />
         <AdmitionExameFases fases={fases} buildings={buildings} />
      </>
   );
}
