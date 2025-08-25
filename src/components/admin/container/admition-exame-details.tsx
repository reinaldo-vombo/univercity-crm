import { TAdmitionExame } from "@/types/global";
import AdmitionExameInfo from "./admition-exame-info";
import AdmitionExamePaymentDetails from "./admition-exame-payment-details";
import { TabsNav } from "@/components/shared/toggle-tabs";

type TAdmitionExameDetailsProps = {
   data: TAdmitionExame
}

const AdmitionExameDetails = ({ data }: TAdmitionExameDetailsProps) => {
   const tabs = [
      {
         id: '1',
         lable: 'Informção',
         value: 'informcao',
         tabContent: <AdmitionExameInfo data={data} />,
         description: ''
      },
      {
         id: '2',
         lable: 'Pagamento',
         value: 'pagamento',
         tabContent: <AdmitionExamePaymentDetails data={data} />,
         description: ''
      },
   ]

   return (
      <TabsNav tabList={tabs} defaultValue={tabs[0].value} />
   )
}

export default AdmitionExameDetails;
