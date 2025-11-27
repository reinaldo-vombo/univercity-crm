
import Breadcrumb from "@/components/shared/breadcrumb";
import { ROUTES } from "@/constants/mock-data";
import SecurityTab from "@/components/container/security-tab";
import AccountTab from "@/components/container/account-tab";
import { TabsNav } from "@/components/shared/toggle-tabs";
import { serverUser } from "@/lib/helper/auth/user";
import Notification from "@/components/container/notification-settings";
import ApperenceTab from "@/components/container/apperence-tab";
import { getUserSeesionLogs, getUserNotificationsPreference } from "@/services/data/history-logs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: 'Cofigurações'
}

export default async function SettingsPages() {
   // console.log('params', params);

   const currentUser = await serverUser();
   const [preferenceSettings, sessionLogs] = await Promise.all([
      getUserNotificationsPreference(currentUser?.id || ''),
      getUserSeesionLogs(currentUser?.id || '')
   ])

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
         tabContent: <SecurityTab sessionHistory={sessionLogs} />,
         description: 'Gerencia a segurança da tua conta com essas configurações'
      },
      {
         id: '3',
         lable: 'Notifições',
         value: 'Notifições',
         tabContent: <Notification config={preferenceSettings} />,
         description: 'Seja notificado quando algo aconteça'
      },
      {
         id: '4',
         lable: 'Aspecto',
         value: 'Aspecto',
         tabContent: <ApperenceTab />,
         description: 'Personalize o aspecto da tua conta'
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
