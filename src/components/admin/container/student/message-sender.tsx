import { Input } from "@/components/ui/input"
import { ScrollBar } from "@/components/ui/scroll-area"


const MessageSender = () => {
   return (
      <div>
         <ScrollBar className="h-24">
            message
         </ScrollBar>
         <Input className="h-9" placeholder="Escreva a menssagem" />
      </div>
   )
}

export default MessageSender
