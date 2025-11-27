import { Separator } from "@/components/ui/separator"
import Image from "next/image"


const InvoicePreview = () => {
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
                     <li><b>Reginalde Baggle</b></li>
                     <li>reinginalde@gmail.com</li>
                     <li>Multicaixa Express</li>
                     <li>Trasferencia Bancaria</li>
                     <li>BFA</li>
                     <li>AOO6. 0044. 0000. 4152</li>
                  </ul>
               </div>
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Enviado para:</p>
                  <ul className="space-y-3.5">
                     <li><b>Enigmax Univ</b></li>
                     <li>enigmax@gmail.com</li>
                     <li>BAI</li>
                     <li>AOO6. 0044. 0000. 4152</li>
                  </ul>
               </div>
            </div>
            <div className="flex items-center justify-between">
               <div className="w-full md:w-1/2 space-y-2">
                  <p>Data de Emissão</p>
                  <b>Jul 28, 2025</b>
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
                     <li>1</li>
                     <li>$40000</li>
                     <li>$40000</li>
                  </ul>
               </div>
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

export default InvoicePreview
