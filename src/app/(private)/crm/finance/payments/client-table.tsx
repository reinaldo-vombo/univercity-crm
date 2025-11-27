"use client";

import { DataTable } from "@/components/shared/data-table";
import { PaymentColumns } from "./columns";


const herader = {
   title: "Nome do curso",
}
const payments = [
   {
      paymentId: 'PTM-001',
      paymentType: 'EXPRESS',
      transactionRef: '09776',
      paymentMethod: 'RECEIPT',
      extraAmount: 5000,
      TotalAmount: 45000,
      status: 'PAID',
      approved: true,
      atendent: 'Maria Sousar',
      currency: 'AOA',
      paymentPurpose: {
         entity: 'Propina Mensal',
         description: 'Pagemento da propina'
      },
      message: 'Pagamento aprovado',
      createAt: new Date()
   }
]

export function PaymentTable() {
   const columns = PaymentColumns();

   return <DataTable
      fileHerderes={herader}
      fileName="Pagamentos"
      columns={columns}
      data={payments}
      filterColumn="paymentId" />;
}
