
import { AdmitionExameTable } from "./client-table";
import { getAllAdmitionExames } from "@/lib/helper/db/querys";


export async function AdmitionExameTableServer() {

   const exames = await getAllAdmitionExames()

   return <AdmitionExameTable exames={exames} />;
}
