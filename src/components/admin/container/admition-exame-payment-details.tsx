import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/helper"
import { TAdmitionExame } from "@/types/global"
import { Check, Loader, X } from "lucide-react"

type TAdmitionExameDetailsProps = {
   data: TAdmitionExame
}
const payment = {
   id: '1',
   paymentRecipt: '',
   totalAmount: 45000,
   approved: false,
   paymentType: 'REFERNCE',
   status: 'PENDING',
   method: 'EXPRESS'
}
const AdmitionExamePaymentDetails = ({ data }: TAdmitionExameDetailsProps) => {
   console.log(data);

   const showStatus = () => {
      if (payment.status === 'APROVED') return <Check className="text-green-500" />
      if (payment.status === 'PENDING') return <Loader className="animate-spin text-white" />
      if (payment.status === 'NOT_APROVED') return <X className="text-red-500" />
   }
   return (
      <div>
         <ul className="space-y-6">
            <li>Tipo de pagamento: <b>{payment.paymentType}</b></li>
            <li>Metodo: <b>{payment.method}</b></li>
            <li>Estado: <Badge
               className={payment.status === 'APROVED' ? 'bg-green-500' : payment.status === 'PENDING' ? 'bg-orange-500 text-white' : 'bg-red-500'}>
               {showStatus()} <b>{payment.status}</b> </Badge>
            </li>
            <li>Total: {formatCurrency(payment.totalAmount)}</li>
         </ul>
      </div>
   )
}

export default AdmitionExamePaymentDetails;
