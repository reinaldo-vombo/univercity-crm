import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatDate } from "@/lib/helper"
import { TExamePayment } from "@/types/global"
// import { TAdmitionExame } from "@/types/global"
import { Check, Loader, X } from "lucide-react"
import Image from "next/image"

type TProps = {
   payment: TExamePayment
   candidateEmail: string
}

const AdmitionExamePaymentDetails = ({ payment, candidateEmail }: TProps) => {

   const uniAccount = payment.universityBankAccount;

   const showStatus = () => {
      if (payment.status === 'APROVE') return <Check className="size-3.5" />
      if (payment.status === 'PENDING') return <Loader className="size-3.5 animate-spin" />
      if (payment.status === 'DENIDE') return <X className="size-3.5" />
   }

   const statusStyles = {
      APROVE: 'bg-green-500/10 text-green-500 border border-green-500/20',
      PENDING: 'bg-orange-500/10 text-orange-500 border border-orange-500/20',
      DENIDE: 'bg-red-500/10 text-red-500 border border-red-500/20',
   } as const;

   return (
      <div className="space-y-8">

         {/* Resumo do pagamento */}
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <ul className="space-y-4">
               <li className="flex items-center justify-between sm:justify-start sm:gap-3">
                  <span className="text-neutral-500 text-sm">Método de Pagamento</span>
                  <b>{payment.method}</b>
               </li>
               <li className="flex items-center justify-between sm:justify-start sm:gap-3">
                  <span className="text-neutral-500 text-sm">Estado</span>
                  <Badge className={`gap-1.5 px-2.5 py-1 ${statusStyles[payment.status as keyof typeof statusStyles] ?? ''}`}>
                     {showStatus()} <span className="font-semibold text-xs">{payment.status}</span>
                  </Badge>
               </li>
               <li className="flex items-center justify-between sm:justify-start sm:gap-3">
                  <span className="text-neutral-500 text-sm">Moeda</span>
                  <b>{payment.currency}</b>
               </li>
            </ul>

            <ul className="space-y-4 sm:text-right">
               <li className="flex items-center justify-between sm:justify-end sm:gap-3">
                  <span className="text-neutral-500 text-sm">Total</span>
                  <b className="text-lg">{formatCurrency(payment.totalAmount || 0)}</b>
               </li>
               <li className="flex items-center justify-between sm:justify-end sm:gap-3">
                  <span className="text-neutral-500 text-sm">Crédito Extra</span>
                  <b>{formatCurrency(payment.extraAmount)}</b>
               </li>
               <li className="flex items-center justify-between sm:justify-end sm:gap-3">
                  <span className="text-neutral-500 text-sm">Data do Pagamento</span>
                  <b>{formatDate(payment.paidAt || '')}</b>
               </li>
            </ul>
         </div>

         <Separator />

         {/* Recibo */}
         <div className="rounded-xl border overflow-hidden">

            {/* Cabeçalho */}
            <div className="flex items-start justify-between p-6 bg-neutral-900/50">
               <div>
                  <h2 className="text-2xl font-bold">Recibo</h2>
                  <p className="text-neutral-500 text-sm mt-1">
                     Número do Recibo <span className="text-white font-medium">INV-0231</span>
                  </p>
               </div>
               <div className="rounded-lg bg-white p-1.5 w-fit shrink-0">
                  <Image src="/logo.svg" width={40} height={40} alt="App logo" />
               </div>
            </div>

            <Separator />

            {/* Remetente / Destinatário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
               <div className="space-y-3">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Enviado por</p>
                  <div className="space-y-1.5 text-sm">
                     <p className="font-semibold">{payment.payerName}</p>
                     <p className="text-neutral-400">{candidateEmail}</p>
                     <p className="text-neutral-400">{payment.payerBank}</p>
                     <p className="text-neutral-400">{payment.payerIban}</p>
                     <p className="text-neutral-400">Multicaixa Express · Transferência Bancária</p>
                  </div>
               </div>

               <div className="space-y-3 md:text-right">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Enviado para</p>
                  <div className="space-y-1.5 text-sm">
                     <p className="font-semibold">{uniAccount?.accountName}</p>
                     <p className="text-neutral-400">{uniAccount?.bankName}</p>
                     <p className="text-neutral-400">{uniAccount?.accountNumber}</p>
                     <p className="text-neutral-400">{uniAccount?.iban}</p>
                  </div>
               </div>
            </div>

            <Separator />

            {/* Datas */}
            <div className="grid grid-cols-2 gap-6 p-6">
               <div className="space-y-1.5">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Data de Emissão</p>
                  <b className="text-sm">{formatDate(payment.createdAt)}</b>
               </div>
               <div className="space-y-1.5 text-right">
                  <p className="text-xs uppercase tracking-wide text-neutral-500 font-medium">Data Limite</p>
                  <b className="text-sm">Jul 28, 2025</b>
               </div>
            </div>

            <Separator />

            {/* Itens do serviço */}
            <div className="p-6 space-y-4">
               <table className="w-full text-sm">
                  <thead>
                     <tr className="text-neutral-500 text-xs uppercase tracking-wide">
                        <th className="text-left font-medium pb-3">Serviço</th>
                        <th className="text-center font-medium pb-3 w-16">Qtd</th>
                        <th className="text-right font-medium pb-3 w-28">Preço</th>
                        <th className="text-right font-medium pb-3 w-28">Total</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                     {payment.paymentItems && payment.paymentItems.length > 0 ? (
                        payment.paymentItems.map((item) => (
                           <tr key={item.id}>
                              <td className="py-3 font-medium">{item.entityType}</td>
                              <td className="py-3 text-center text-neutral-400">1</td>
                              <td className="py-3 text-right text-neutral-400">{formatCurrency(item.amount)}</td>
                              <td className="py-3 text-right font-semibold">{formatCurrency(item.amount)}</td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan={4} className="py-6 text-center text-neutral-500">
                              Informações Bancárias ainda Não Foram Configuradas
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>

               <Separator />

               {/* Totais */}
               <div className="flex justify-end">
                  <div className="w-full sm:w-64 space-y-2">
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-500">Subtotal</span>
                        <span>{formatCurrency(40000)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-500">Amortização</span>
                        <span>{formatCurrency(4000)}</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="text-neutral-500">Desconto</span>
                        <span>{formatCurrency(0)}</span>
                     </div>
                     <Separator />
                     <div className="flex justify-between items-center pt-1">
                        <b>Total</b>
                        <b className="text-lg">{formatCurrency(40000)}</b>
                     </div>
                  </div>
               </div>
            </div>

            <Separator />

            <p className="text-center text-xs text-neutral-500 py-4">
               Este recibo foi gerado automaticamente pelo sistema
            </p>
         </div>
      </div>
   )
}

export default AdmitionExamePaymentDetails;
