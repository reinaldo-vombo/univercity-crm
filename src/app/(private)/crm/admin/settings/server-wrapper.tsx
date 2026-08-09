import AccountTab from '@/app/(private)/crm/admin/settings/account-tab'
import SecurityTab from '@/app/(private)/crm/admin/settings/security-tab'
import { TabsNav } from '@/components/shared/toggle-tabs'
import { serverUser } from '@/lib/helper/auth/user'
import { getUserSeesionLogs } from '@/services/data/history-logs'
import { getUserById } from '@/services/data/user'

export default async function ServerWrapper() {
   const currentUser = await serverUser()
   const [userProfile, currentUserLogs] = await Promise.all([
      getUserById(),        // 👈 dados frescos do backend
      getUserSeesionLogs(currentUser?.id || ''),
   ]);
   // console.log(currentUser);

   const tabs = [
      {
         id: '1',
         lable: 'Conta',
         value: 'conta',
         tabContent: <AccountTab user={userProfile} />,
         description: 'Gerencie as informações pessoais e os dados da sua conta.'
      },
      {
         id: '2',
         lable: 'Segurança',
         value: 'segurança',
         tabContent: <SecurityTab sessionHistory={currentUserLogs} />,
         description: 'Gerencie as configurações de segurança e acompanhe o histórico de sessões da sua conta.'
      },
   ]
   return (
      <div className="mt-12">
         <TabsNav defaultValue={tabs[0].value} tabList={tabs} />
      </div>
   )
}
