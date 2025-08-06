import { TAdmitionExame } from "@/types/global";
import { formatCurrency, formatDate } from "@/lib/helper";
import Image from "next/image";
import { Separator } from "../../ui/separator"
import { ScrollArea } from "../../ui/scroll-area";
import Modal from "../../shared/Modal";
import { Eye } from "lucide-react";
import config from '@/config/env'

type TAdmitionExameDetailsProps = {
   data: TAdmitionExame
}

const AdmitionExameDetails = ({ data }: TAdmitionExameDetailsProps) => {
   const { applicantName, paymentRecipt, exameDate, fase, document, paymentAmoute, aprovePayment, exameResults } = data;
   const payment = paymentAmoute ? paymentAmoute : 0;

   return (
      <div className="space-y-4">
         <ul className="space-y-4">
            <li>Nome do aplicante: <b>{applicantName}</b></li>
            <li>Número de inscrição: <b># 1111</b></li>
            <li>Número do telefone: <b>9251-1111</b></li>
            <li>Data do exame: <b>{formatDate(exameDate, 'DD/MM/YYYY')}</b></li>
            <li>Fase do exame: <b>{fase.ordem}</b></li>
            <li>Resultado do exame: <b>{exameResults}</b></li>
            <li>Valor Pago: <b>{formatCurrency(payment)}</b></li>
            <li>Estado do pagamento: <b>{aprovePayment ? 'provado' : 'Nao provado'}</b></li>
         </ul>
         <Separator />
         <h2>Documentos</h2>
         <ScrollArea className="h-[300px] space-y-4">
            <div>
               <p>Bilhete de indentidade:</p>
               <div className="relative group">
                  <div className="absolute inset-0 hover:group-hover:bg-black/50 flex">
                     <div className="m-auto">
                        <Modal trigger={<Eye className="text-white cursor-pointer opacity-0 group-hover:opacity-100" />} title="Bilhete de indentidade" description="Bilhete de indentidade" >
                           <Image
                              src={`${config.API_ASSETS_URL}/${document}`}
                              alt="BiDocumentUrl"
                              width={500}
                              height={500} />
                        </Modal>
                     </div>
                  </div>
                  <Image
                     src={`${config.API_ASSETS_URL}/${document}`}
                     alt="BiDocumentUrl"
                     width={500}
                     height={500} />
               </div>
            </div>
            <div>
               <p>Recibo de pagamento:</p>
               <div className="relative group">
                  <div className="absolute inset-0 hover:group-hover:bg-black/50 flex">
                     <div className="m-auto">
                        <Modal trigger={<Eye className="text-white cursor-pointer opacity-0 group-hover:opacity-100" />} title="Recibo de pagamento" description="Recibo de pagamento" >
                           <Image
                              src={`${config.API_ASSETS_URL}/${paymentRecipt}`}
                              alt="PaymentReciptUrl"
                              width={500}
                              height={500} />
                        </Modal>
                     </div>
                  </div>
                  <Image
                     src={`${config.API_ASSETS_URL}/${paymentRecipt}`}
                     alt="BiDocumentUrl"
                     width={500}
                     height={500} />
               </div>
            </div>
         </ScrollArea>
      </div>
   )
}

export default AdmitionExameDetails;
