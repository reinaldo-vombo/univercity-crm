'use client'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const MESSAGE_TYPE = ['WhatsApp', 'System', 'SMS', 'Mail']
const COLORES = ['bg-green-500', 'bg-primary', 'bg-neutral-500', 'bg-red-500']
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
            {MESSAGE_TYPE.map((type, i) => {
               const bgColor = COLORES[i]
               return (
                  <Button variant='default' className={`${type === chanelType ? bgColor : 'bg-card'} text-white`}
                     onClick={() => onChange(type)} key={type}>{type}</Button>
               )
            })}
         </div>
         <ScrollArea className="h-44 ">
            <div className="p-2 rounded-t-full mb-6 ml-auto rounded-bl-full w-fit bg-primary text-white">
               hello
            </div>
            <div className="">
               <div className="p-2 rounded-t-full ml-auto rounded-bl-full w-fit bg-primary text-white">
                  Bom dia, Cara estudante
               </div>
               <p className="ml-auto text-sm w-fit text-neutral-500">Maria Souza - 1 minuto atras</p>
            </div>
         </ScrollArea>
         <Textarea placeholder="Escreva a mensagem" disabled={isSelected} />
      </div>
   )
}

export default MessageSender
