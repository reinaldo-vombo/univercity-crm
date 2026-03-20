import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/lib/helper"
import { TExamePayment } from "@/types/global"
// import { TAdmitionExame } from "@/types/global"
import { Check, Loader, X } from "lucide-react"
import Image from "next/image"

type TProps = {
   payment: TExamePayment
}

const AdmitionExamePaymentDetails = ({ payment }: TProps) => {

   const uniAccount = payment.universityBankAccount;
   const showStatus = () => {
      if (payment.status === 'APROVE') return <Check className="text-green-500" />
      if (payment.status === 'PENDING') return <Loader className="animate-spin text-white" />
      if (payment.status === 'DENIDE') return <X className="text-red-500" />
   }
   return (
      <div className="space-y-8">
         <div className="grid grid-cols-2">
            <div>
               <ul className="space-y-5">
                  <li><span className="text-neutral-500">Metodo de Pagamento:</span> <b>{payment.method}</b></li>
                  <li><span className="text-neutral-500">Estado:</span> <Badge
                     className={payment.status === 'APROVE' ? 'bg-green-500' : payment.status === 'PENDING' ? 'bg-orange-500 text-white' : 'bg-red-500'}>
                     {showStatus()} <b>{payment.status}</b> </Badge>
                  </li>
                  <li><span className="text-neutral-500">Moeda:</span> {payment.currency}</li>

               </ul>
            </div>
            <div>
               <ul className="space-y-6 text-neutral-500">
                  <li>Total: <span className="text-white">{formatCurrency(payment.totalAmount || 0)}</span></li>
                  <li>Credito Extra: <span className="text-white">{formatCurrency(payment.extraAmount)}</span></li>
                  <li>Data do Pagamento: <span className="text-white">{formatDate(payment.paidAt || '')}</span></li>
               </ul>
            </div>
         </div>
         <Separator />
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
                     <li><b>{payment.payerName}</b></li>
                     <li><b>{payment.payerBank}</b></li>
                     <li><b>{payment.payerIban}</b></li>
                     <li>reinginalde@gmail.com</li>
                     <li>Multicaixa Express</li>
                     <li>Trasferencia Bancaria</li>
                  </ul>
               </div>
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Enviado para:</p>
                  <ul className="space-y-3.5">
                     <li><b>{uniAccount?.accountName}</b></li>
                     <li>{uniAccount?.accountNumber}</li>
                     <li>{uniAccount?.bankName}</li>
                     <li>{uniAccount?.iban}</li>
                  </ul>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Data de Emissão</p>
                  <b>{formatDate(payment.createdAt)}</b>
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
               {payment.paymentItems && payment.paymentItems.length > 0 ? payment.paymentItems.map((item) => (
                  <div className="flex items-center justify-between" key={item.id}>
                     <div className="w-1/2">
                        <b>{item.entityType}</b>
                     </div>
                     <ul className="flex items-center justify-between w-full md:w-1/2">
                        <li>{payment.paymentItems.length}</li>
                        <li>${formatCurrency(item.amount)}</li>
                     </ul>
                  </div>
               )) : <p>Informações Bancarias ainda Não Foram Configuradas</p>}
               <Separator />
               <div className="flex ml-auto">
                  <div className="w-1/2">
                     <div className="flex justify-between items-center">
                        <span>SubTotal</span>
                        <span>$40000</span>
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
            <p>Esté recibo foi gerado automaticamente pelo sistema</p>
         </div>
      </div>
   )
}

export default AdmitionExamePaymentDetails;
