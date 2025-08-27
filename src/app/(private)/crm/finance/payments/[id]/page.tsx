import Breadcrumb from "@/components/shared/breadcrumb"
import { TabsNav } from "@/components/shared/toggle-tabs"
import { ROUTES } from "@/constants/mock-data"
import { PaymentTableServer } from "../table-wrapper"
type TSearchParams = {
   params: Promise<{ id: string }>
}

const student = {
   id: '123456789',
   firstName: 'Reginalde',
   lastName: 'Baggle',
   semesterPayment: [
      {
         payment: [
            {
               paymentType: 'EXPRESS',
               paymentMethod: 'REFENCE',
               TotalAmount: 45000,
               status: 'PAID',
               approved: true,
               atendent: 'Maria Sousar',
               message: 'Pagamento aprovado',
               createAt: new Date()
            }
         ]
      }
   ]
}
const tabs = [
   {
      id: '1',
      lable: 'Propinas',
      value: 'propinas',
      tabContent: <PaymentTableServer />,
      description: 'Propinas mensal',
   },
   {
      id: '2',
      lable: 'Outros pagamentos',
      value: 'pagamentos',
      tabContent: <PaymentTableServer />,
      description: 'Propinas mensal',
   },
]
export default function StudentSemesterPaymentPage({ params }: TSearchParams) {
   console.log(params);

   if (!student) {
      return 'Not found'
   }
   return (
      <section className="col-span-12">
         <Breadcrumb
            root={ROUTES.DASHBOARD}
            pageUrl={`${ROUTES.DASHBOARD}/finace/payments/${student.id}`}
            pageName="Payments" name={student.firstName} />
         <div className="mt-12">
            <TabsNav tabList={tabs} defaultValue={tabs[0].value} />
         </div>
      </section>
   )
}
