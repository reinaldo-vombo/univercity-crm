import { BellOff } from "lucide-react"

const NoNotification = () => {
   return (
      <div className="flex items-center justify-center flex-col space-y-4">
         <BellOff fill="red" className="size-9" />
         <p>Sem notificações</p>
      </div>
   )
}

export default NoNotification
