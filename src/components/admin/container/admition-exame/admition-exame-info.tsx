import { TAdmitionExame } from '@/types/global'
import { formatDate } from "@/lib/helper";
import { Separator } from "../../../ui/separator"
import { ScrollArea } from "../../../ui/scroll-area";
import { Badge } from '@/components/ui/badge';
// import ExpandebalForm from '@/components/shared/popover-form';

type TAdmitionExameDetailsProps = {
   data: TAdmitionExame
}
const AdmitionExameInfo = ({ data }: TAdmitionExameDetailsProps) => {
   const { firstName, middleName, lastName, building, room, exameDate, status, email, phoneNumber, fase, document, exameResults, } = data;

   return (
      <ScrollArea className="h-[700px]">
         <div className='flex items-center justify-between mb-4'>
            <ul className='space-y-5'>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Nome do aplicante:</span>
                  <b>{`${firstName} ${middleName} ${lastName}`}</b>
               </li>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Email:</span>
                  <b>{email}</b>
               </li>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Telefone:</span>
                  <b>(+244) {phoneNumber}</b>
               </li>
            </ul>
            <ul className='space-y-5'>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Data do exame:</span>
                  <b>{formatDate(exameDate, 'DD/MM/YYYY')}</b>
               </li>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Fase do exame:</span>
                  <b>{fase.name}</b>
               </li>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Fase do exame:</span>
                  <b>{fase.name}</b>
               </li>
            </ul>
         </div>
         <Separator />
         <div className='mt-4'>
            <ul className="space-y-4">
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Resultado:</span>
                  <Badge className={exameResults >= 10 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}>{exameResults || 'Pendente'}</Badge>
               </li>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Localização</span>
                  <b>{building} - {room}</b>
               </li>
               <li className='space-x-4'>
                  <span className='text-neutral-500'>Registro:</span>
                  <Badge className={status ? 'bg-green-500' : 'bg-red-500'}>
                     <b>{status}</b>
                  </Badge>
               </li>
            </ul>
         </div>
         <Separator className='my-4' />
         <div className="relative group mt-6 space-y-4">
            <p>Documentos Enviar:</p>
            <div className="grid grid-cols-12 gap-4">
               <div className="col-span-6 rounded-md border border-dashed shadow space-y-4">
                  <iframe src={document || '/agradecimento.pdf'} width={'100%'} height={500}></iframe>
               </div>
            </div>

         </div>
      </ScrollArea>
   )
}

export default AdmitionExameInfo
