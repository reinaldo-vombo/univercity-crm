import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/lib/helper"
import { TPayment } from "@/types/global"
import Image from "next/image"
type TProps = {
   data: TPayment
}

const InvoicePreview = ({ data }: TProps) => {
   const reciver = data.universityBankAccount;
   const paymentItem = data.paymentItems;
   return (
      <div className="rounded-md p-1">
         <div className="rounded-md p-4 space-y-6">
            <div className="flex items-center justify-between">
               <div>
                  <h2 className="text-2xl">Recibo</h2>
                  <p>Número do Recibo <b>INV-0231</b></p>
               </div>
               <div className="rounded-lg p-1 w-fit">
                  <Image src='/logo.svg' width={50} height={50} alt="App logo" />
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Enviado por:</p>
                  <ul className="space-y-3.5">
                     <li><b>{data.payerName}</b></li>
                     <li>{data.payerBank}</li>
                     <li>{data.payerIban}</li>
                     <li>{formatDate(data.paidAt || '')}</li>
                  </ul>
               </div>
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Enviado para:</p>
                  <ul className="space-y-3.5">
                     <li><b>{reciver.accountName}</b></li>
                     <li>{reciver.bankName}</li>
                     <li>{reciver.iban}</li>
                     <li>{reciver.accountNumber}</li>
                  </ul>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Data de Emissão</p>
                  <b>{formatDate(data.createdAt)}</b>
               </div>
               <div className="w-full md:w-1/2">
                  <div className="w-full md:w-1/2 space-y-2">
                     <p>Data Limite</p>
                     <b>Jul 28, 2025</b>
                  </div>
               </div>
            </div>
            <div className="space-y-3">
               <div className="flex items-center justify-between">
                  <div className="w-full md:w-1/2">
                     <p>Serviço</p>
                  </div>
                  <ul className="flex items-center justify-between w-full md:w-1/2">
                     <li>QTY</li>
                     <li>Preço</li>
                     <li>Total</li>
                  </ul>
               </div>
               <div className="flex items-center justify-between">
                  <div className="w-1/2">
                     <b>Propina</b>
                  </div>
                  <ul className="flex items-center justify-between w-full md:w-1/2">
                     <li>{paymentItem.length}</li>
                     <li>{formatCurrency(paymentItem[0].amount)}</li>
                  </ul>
               </div>
               <Separator />
               <div className="flex ml-auto">
                  <div className="w-1/2">
                     <div className="flex justify-between items-center">
                        <span>SubTotal</span>
                        <span>{formatCurrency(paymentItem[0].amount)}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span>Amortização</span>
                        <span>$4000</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span>Desconto</span>
                        <span>$0.00</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <b>Total</b>
                        <b>$40000</b>
                     </div>
                  </div>
               </div>
            </div>
            {data.ReceiptUrl ? (
               <iframe src={data.ReceiptUrl} width={'100%'} height={500}></iframe>
            ) : null}
            <p>Esté recibo foi gerado automaticamente pelo sistema</p>
         </div>
      </div>
   )
}

export default InvoicePreview
