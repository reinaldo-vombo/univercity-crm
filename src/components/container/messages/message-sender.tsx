'use client'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const MESSAGE_TYPE = ['WhatsApp', 'System', 'SMS', 'Mail']
const MessageSender = () => {
   const [chanelType, setChanelType] = useState<string | null>(null)
   const onChange = (type: string) => {
      setChanelType(type)
   }
   const isSelected = chanelType === null ? true : false
   return (
      <div className="space-y-6">
         <p>Selecione o canal de menssagem</p>
         <div className="flex items-center gap-4">
            {MESSAGE_TYPE.map((type) => (
               <Button variant='default' className={`${chanelType === 'WhatsApp' ? 'bg-green-500' : chanelType === 'System' ? 'bg-primary' : 'bg-red-500'}`}
                  onClick={() => onChange(type)} key={type}>{type}</Button>
            ))}
         </div>
         <ScrollArea className="h-24">
            <div className="p-1 rounded-t-full rounded-bl-full w-fit bg-primary text-white">
               hello
            </div>
         </ScrollArea>
         <Textarea placeholder="Escreva a mensagem" disabled={isSelected} />
      </div>
   )
}

export default MessageSender
