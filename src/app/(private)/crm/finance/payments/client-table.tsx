"use client";

import { DataTable } from "@/components/shared/data-table";
import { PaymentColumns } from "./columns";


const herader = {
   title: "Nome do curso",
}
const student = [{
   id: '123456789',
   firstName: 'Reginalde',
   lastName: 'Baggle',
   semesterPayment: [
      {
         payment: [
            {
               paymentType: 'EXPRESS',
               paymentMethod: 'REFENCE',
               TotalAmount: 45000,
               status: 'PAID',
               approved: true,
               atendent: 'Maria Sousar',
               message: 'Pagamento aprovado',
               createAt: new Date().getDate()
            }
         ]
      }
   ]
}]

export function PaymentTable() {
   const columns = PaymentColumns();

   return <DataTable
      fileHerderes={herader}
      fileName="Pagamentos"
      columns={columns}
      data={student}
      filterColumn="title" />;
}
