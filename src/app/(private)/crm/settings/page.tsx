
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import SecurityTab from "@/components/container/security-tab";
import AccountTab from "@/components/container/account-tab";
import { TabsNav } from "@/components/shared/toggle-tabs";
import { serverUser } from "@/lib/helper/auth/user";
// import { getUserLogs } from "@/services/data/user";


export default async function SettingsPages() {
   const currentUser = await serverUser();
   const currentUserLogs: [] = []
   // const currentUserLog = await getUserLogs(currentUser?.id)
   // console.log('currentUserLog', currentUserLog);

   const tabs = [
      {
         id: '1',
         lable: 'Conta',
         value: 'conta',
         tabContent: <AccountTab user={currentUser} />,
         description: 'Gerencia as informações pessoais da tua conta'
      },
      {
         id: '2',
         lable: 'Segurança',
         value: 'segurança',
         tabContent: <SecurityTab sessionHistory={currentUserLogs} />,
         description: 'Gerencia a segurança da tua conta com essas configurações'
      },
   ]

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
