import AccountTab from '@/components/container/account-tab'
import SecurityTab from '@/components/container/security-tab'
import { TabsNav } from '@/components/shared/toggle-tabs'
import { serverUser } from '@/lib/helper/auth/user'
import { getUserLogs } from '@/services/data/user'

export default async function ServerWrapper() {
   const currentUser = await serverUser()
   const currentUserLogs = await getUserLogs(currentUser?.id)
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
      <div className="mt-12">
         <TabsNav defaultValue={tabs[0].value} tabList={tabs} />
      </div>
   )
}
