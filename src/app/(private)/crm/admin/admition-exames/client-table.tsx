"use client";

import { DataTable } from "@/components/shared/data-table";
import { TAdmitionExame } from "@/types/global";
import { AdmitionExameColumns } from "./columns";

interface Props {
   exames: TAdmitionExame[];
}

const herader = {
   id: "ID",
   applicantName: "Full Name",
   exameDate: "Data do exame",
   fase: "Fase do exame",
   paymentAmoute: "Valor pago",
   exameResults: "Resultado do exame",
   passed: "Situacao"
}

export function AdmitionExameTable({ exames, }: Props) {

   const columns = AdmitionExameColumns();

   return <DataTable
      fileHerderes={herader}
      fileName="exame-de-admisao"
      columns={columns}
      data={exames}
      filterColumn="applicantName" />;
}
