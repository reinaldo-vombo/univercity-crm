
import { serverUser } from "@/lib/helper/auth/user";
import Avatar from "../../../shared/avatar";
import { Dropdown } from "./dropdwon";

const UserDropdownMenu = async () => {
   const user = await serverUser();

   if (!user) return 'Utilizador não encontrado'

   return (
      <Dropdown
         align="center"
         user={user}
         trigger={
            <div className="rounded-full">
               <Avatar name={user.name} photo={user.avatar || '/avatar-3.jpeg'} className="size-10 cursor-pointer" />
            </div>
         }
      />
   );
};

export default UserDropdownMenu;
