import Avatar from '@/components/shared/avatar';
import { DropdownMenu } from '@/components/shared/dropdwon';
import { serverUser } from '@/lib/helper/auth/user';
import UserSetting from './user-setting';

const DropDownWrapper = async () => {
   const user = await serverUser()
   return (
      <DropdownMenu
         className="border-none shadow-none"
         showLogOut={true}
         lable={user?.name || 'John Doe'}
         trigger={
            <div className="flex items-center gap-2">
               <Avatar name={user?.name || 'John Doe'} photo={user?.avatar || "https://github.com/shadcn.png"} />
               <span>{user?.name}</span>
            </div>
         }
      >
         <UserSetting />
      </DropdownMenu>
   )
}

export default DropDownWrapper;
