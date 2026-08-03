"use client";

import { DataTable } from "@/components/shared/tabeles/data-table";
import { PaymentColumns } from "./columns";


const herader = {
   title: "Nome do curso",
}
const payments = [
   {
      id: '1',
      paymentId: 'PTM-001',
      paymentType: 'EXPRESS',
      transactionRef: '09776',
      paymentMethod: 'RECEIPT',
      extraAmount: 5000,
      TotalAmount: 45000,
      status: 'PAID',
      approved: true,
      entity: 'Reginalde Baggle',
      atendent: 'Maria Sousar',
      currency: 'AOA',
      paymentPurpose: {
         entity: 'Propina Mensal',
         description: 'Pagemento da propina'
      },
      message: 'Pagamento aprovado',
      createdAt: new Date()
   },
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
