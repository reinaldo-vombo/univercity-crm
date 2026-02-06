"use client";

import { DataTable } from "@/components/shared/data-table";
import { PaymentColumns } from "./columns";


const herader = {
   title: "Nome do curso",
}
const payments = [
   {
      paymentId: 'PTM-001',
      paymentMonth: 'Julho',
      paymentYear: '2026',
      lateFee: 0,
      baseAmount: 45000,
      totalPayment: 45000,
      paymentType: 'EXPRESS',
      transactionRef: '09776',
      paymentMethod: 'RECEIPT',
      extraAmount: 5000,
      TotalAmount: 45000,
      status: 'PAID',
      approved: true,
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
