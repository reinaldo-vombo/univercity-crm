import { TAdmitionExame } from '@/types/global'
import { formatCurrency, formatDate } from "@/lib/helper";
import Image from "next/image";
import { Separator } from "../../../ui/separator"
import { ScrollArea } from "../../../ui/scroll-area";
import { Calendar, DollarSign, List, Mail, Phone, Star, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type TAdmitionExameDetailsProps = {
   data: TAdmitionExame
}
const AdmitionExameInfo = ({ data }: TAdmitionExameDetailsProps) => {
   const { applicantName, exameDate, email, phoneNumber, fase, document, paymentAmoute, aprovePayment, exameResults } = data;
   const payment = paymentAmoute ? paymentAmoute : 0;
   return (
      <ScrollArea className="space-y-4 h-[700px]">
         <ul className="space-y-4">
            <li className='grid gap-2'>Nome do aplicante:
               <div className='rounded-md border p-2 flex items-center gap-2'>
                  <User className='text-green-500 size-4' /><b>{applicantName}</b>
               </div>
            </li>
            <li>Email:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Mail className='text-red-500 size-4' /><b>{email}</b>
               </div>
            </li>

            <li>Número do telefone:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Phone className='text-blue-500 size-4' /><b>(+244) {phoneNumber}</b>
               </div>
            </li>
            <li>Data do exame:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Calendar className='text-orange-500 size-4' /> <b>{formatDate(exameDate, 'DD/MM/YYYY')}</b>
               </div>
            </li>
            <li>Fase do exame:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <List className='text-violet-500 size-4' /> <b>{fase.ordem}</b>
               </div>
            </li>
            <li>Resultado do exame:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Star className='text-yellow-500 size-4' />
                  <Badge className={exameResults >= 10 ? 'bg-green-500' : 'bg-red-500'}>{exameResults || 'Pendente'}</Badge>
               </div>
            </li>
            <li>Valor Pago:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <DollarSign className='text-yellow-500 size-4' />
                  <Badge className={payment >= 5000 ? 'bg-green-500' : 'bg-red-500'}>{formatCurrency(payment)}</Badge>
               </div>
            </li>
            <li>Estado do pagamento:
               <Badge className={aprovePayment ? 'bg-green-500' : 'bg-red-500'}>
                  <b>{aprovePayment ? 'provado' : 'Nao provado'}</b>
               </Badge>
            </li>
         </ul>
         <Separator />
         <div className="relative group mt-6">
            <p>Bilhete de indentidade:</p>
            <div className="absolute inset-0 hover:group-hover:bg-black/50 flex">
               <div className="m-auto">
                  <Image
                     src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${document}`}
                     alt="BiDocumentUrl"
                     width={500}
                     height={500} />
               </div>
            </div>
            <Image
               src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${document}`}
               alt="BiDocumentUrl"
               width={500}
               height={500} />
         </div>
      </ScrollArea>
   )
}

export default AdmitionExameInfo
