import { Eye, PenBox, PlusSquare, Trash } from "lucide-react"
import UpdatedUser from "../forms/admin/update/update-user"

type TUserDetail = {
   name: string
   email: string
   role: string
}
const UserDetails = ({ email, name, role }: TUserDetail) => {
   return (
      <div className="space-y-4">
         <ul className="space-y-4">
            <li>Nome: <b>{name}</b></li>
            <li>Email: <b>{email}</b></li>
            <li>Cargo: <b>{role}</b></li>
         </ul>
         <div>
            <p>Permisões:</p>
            <ul className="space-y-4">
               <li className="flex items-center gap-4"><PlusSquare /> <b>Publicar</b></li>
               <li className="flex items-center gap-4"><Eye className="text-blue-500" /> <b>Visualizar</b></li>
               <li className="flex items-center gap-4"><PenBox className="text-green-500" /> <b>Atualizar</b></li>
               <li className="flex items-center gap-4"><Trash className="text-red-500" /> <b>Excluir</b></li>
            </ul>
         </div>
         <div className="mt-4">
            <UpdatedUser userInf={{ email, name, role }} />
         </div>
      </div>
   )
}

export default UserDetails
