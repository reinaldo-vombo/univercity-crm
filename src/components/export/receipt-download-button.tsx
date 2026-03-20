'use client'


import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoiceDocument from "./pdfs/invoice-document";
import { useEffect, useState } from "react";
import QRCode from "qrcode";

type TPayment = {
   student: {
      name: string;
      course: string;
      year: string;
      email: string;
      phone: number;
   }
   payment: {
      id: string;
      date: Date;
      status: string;
      amount: number;
      month: string;
   }
}
const py = [
   {
      id: 1,
      academicYear: '2025',
      service: 'Propina',
      description: 'Pagamento de propina',
      amount: 40000,
      currency: 'AOA',
      status: 'Pago',
   }
]

const ReceiptDownloadButton = ({ payment, student }: TPayment) => {
   const [showPdf, setShowPdf] = useState(false);
   const receiptNumber = `INV-${payment.id}`;
   const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

   useEffect(() => {
      const generateQr = async () => {
         try {
            const url = await QRCode.toDataURL(
               `https://yourapp.com/invoice/${receiptNumber}`
            );
            setQrCodeUrl(url);
         } catch (err) {
            console.error("Failed to generate QR code", err);
         }
      };
      generateQr();
   }, [receiptNumber])

   if (!qrCodeUrl) return null;
   return (
      <div>
         {!showPdf ? (
            <Button onClick={() => setShowPdf(true)}>Gerar recibo</Button>
         ) : (
            <>
               <PDFDownloadLink
                  document={
                     <InvoiceDocument
                        receiptNumber={receiptNumber}
                        student={{
                           name: student.name,
                           email: student.email,
                           course: 'Ciencia da computação',
                           year: '2025',
                           phone: 923456789
                        }}
                        payments={py}

                        totals={{
                           totalPaid: 40000,
                           balance: 4000
                        }}
                        qrCodeUrl={qrCodeUrl}
                     />
                  }
                  fileName={`${receiptNumber}.pdf`}
               >
                  {({ loading }) => (
                     <Button variant="outline" size="sm">
                        <FileDown className="mr-2 h-4 w-4" />
                        {loading ? "Gerando..." : "Baixar Fatura"}
                     </Button>
                  )}
               </PDFDownloadLink>
            </>
         )}
      </div>
   )
}

export default ReceiptDownloadButton
