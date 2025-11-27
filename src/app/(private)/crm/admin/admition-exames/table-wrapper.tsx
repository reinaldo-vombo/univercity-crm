
import { getAllAdmitionExames } from "@/services/data/academic";
import { AdmitionExameTable } from "./client-table";

export async function AdmitionExameTableServer() {

   const exames = await getAllAdmitionExames()

   return <AdmitionExameTable exames={exames} />;
}
