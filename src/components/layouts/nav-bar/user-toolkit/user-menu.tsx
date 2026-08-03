
import { serverUser } from "@/lib/helper/auth/user";
import Avatar from "../../../shared/avatar";
import { Dropdown } from "./dropdwon";
import { redirect } from "next/navigation"
import { ROUTES } from "@/constants/routes";

const UserDropdownMenu = async () => {
   const user = await serverUser();

   if (!user) return redirect(ROUTES.LOGIN)

   return (
      <Dropdown
         align="center"
         user={user}
         trigger={
            <div className="rounded-full">
               {/* <Image src={user.avatar || ''} width={60} height={60} alt="f" /> */}
               <Avatar name={user.name} photo={user.avatar || '/avatar-3.jpeg'} className="size-10 cursor-pointer" />
            </div>
         }
      />
   );
};

export default UserDropdownMenu;
