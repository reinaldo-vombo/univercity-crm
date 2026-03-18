'use client'

import { PDFViewer } from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import InvoiceDocument from "./invoice-document";
import QRCode from "qrcode";

const InvoiceView = ({ payment, id }: any) => {
   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
   const invoiceNumber = `INV-${payment.id}`;

   useEffect(() => {
      const load = async () => {

         const qr = await QRCode.toDataURL(
            `https://yourapp.com/invoice/${id}`
         );

         setQrCodeUrl(qr);
      };
      load();
   }, [id]);

   if (!payment || !qrCodeUrl) {
      return <p className="p-6">Carregando recibo...</p>;
   }

   return (
      <div className="w-full h-screen">
         <PDFViewer width="100%" height="100%">
            <InvoiceDocument
               receiptNumber={invoiceNumber}
               student={{
                  name: payment.customerName,
                  course: "Licenciatura em Ciências da Computação",
                  year: "2º Ano",
                  email: payment.customerEmail,
                  phone: 927603115,
               }}
               payments={[
                  {
                     id: 1,
                     academicYear: "2024/2025",
                     service: "Propina",
                     description: "Março",
                     amount: payment.amount,
                     currency: "AOA",
                     status: "Pago",
                  },
                  {
                     id: 2,
                     academicYear: "2024/2025",
                     service: "Amortização",
                     description: "Março",
                     amount: 4452,
                     currency: "AOA",
                     status: "Pago",
                  },
               ]}
               totals={{
                  totalPaid: payment.amount,
                  balance: 1439,
               }}
               qrCodeUrl={qrCodeUrl}
            />
         </PDFViewer>
      </div>
   )
}

export default InvoiceView
