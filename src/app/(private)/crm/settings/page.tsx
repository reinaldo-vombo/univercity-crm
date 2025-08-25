import AccountTab from "@/components/container/account-tab";
import SecurityTab from "@/components/container/security-tab";
import Breadcrumb from "@/components/shared/breadcrumb";
import { TabsNav } from "@/components/shared/toggle-tabs";
import { ROUTES } from "@/constants/mock-data";

const tabs = [
   {
      id: '1',
      lable: 'Conta',
      value: 'conta',
      tabContent: <AccountTab />,
      description: 'Gerencia as informações pessoais da tua conta'
   },
   {
      id: '2',
      lable: 'Segurança',
      value: 'segurança',
      tabContent: <SecurityTab />,
      description: 'Gerencia a segurança da tua conta com essas configurações'
   },
]
export default function SettingsPages() {

   return (
      <section className='col-span-12'>
         <Breadcrumb
            name="Configurações"
            pageName="Configurações"
            pageUrl={`${ROUTES.SETTINGS}`}
            root={`${ROUTES.SETTINGS}`} />
         <div className="mt-12">
            <TabsNav defaultValue={tabs[0].value} tabList={tabs} />
         </div>

      </section>
   )
}
