import { Badge } from "@/components/ui/badge"
import { ChatComposer } from "./chat-composer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { TChannel, TContact, TMessage } from "./types"
import Avatar from "../avatar"
import { CHANNEL_CONFIG } from "./constant"
import { MessageBubble } from "./chat-bubble"

type TChatBoxProps = {
   contact: TContact
   messages: TMessage[]
   models?: string[]
   defaultModel?: string
   onSendMessage?: (content: string, channel: TChannel) => void
   className?: string
}

export const ChatBox = ({
   contact,
   messages,
   onSendMessage,
   className,
}: TChatBoxProps) => {

   const [channel, setChannel] = useState<TChannel>("whatsapp")
   const bottomRef = useRef<HTMLDivElement>(null)

   const filteredMessages = messages.filter((m) => m.channel === channel)

   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
   }, [filteredMessages.length, channel])

   return (
      <div
         className={cn(
            "flex h-[100dvh] w-full flex-col overflow-hidden border-0 bg-background sm:h-[600px] sm:rounded-2xl sm:border md:h-[680px] md:max-w-md lg:max-w-lg",
            className
         )}
      >
         {/* Header */}
         <div className="flex shrink-0 items-center justify-between gap-3 border-b p-3 sm:p-4">
            <div className="flex min-w-0 items-center gap-2.5">
               <div className="relative shrink-0">
                  <Avatar name={contact.name?.[0]} photo={contact.avatarUrl} className="size-9" />
                  {contact.isOnline && (
                     <span className="absolute right-0 bottom-0 size-2.5 rounded-full border-2 border-background bg-emerald-500" />
                  )}
               </div>
               <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                     {contact.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                     {contact.isOnline ? "Online" : "Offline"}
                  </p>
               </div>
            </div>

            <Tabs value={channel} onValueChange={(v) => setChannel(v as TChannel)}>
               <TabsList className="h-8 p-0.5">
                  {(Object.keys(CHANNEL_CONFIG) as TChannel[]).map((key) => {
                     const { icon: Icon } = CHANNEL_CONFIG[key]
                     return (
                        <TabsTrigger
                           key={key}
                           value={key}
                           className="h-7 cursor-pointer px-2 data-[state=active]:shadow-none"
                           aria-label={CHANNEL_CONFIG[key].label}
                        >
                           <Icon className="size-3.5" />
                           <span className="hidden md:inline">
                              {CHANNEL_CONFIG[key].label}
                           </span>
                        </TabsTrigger>
                     )
                  })}
               </TabsList>
            </Tabs>
         </div>

         {/* Mensagens */}
         <ScrollArea className="flex-1 px-3 sm:px-4">
            <div className="flex flex-col gap-4 py-4">
               {filteredMessages.length === 0 ? (
                  <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center">
                     <Badge variant="secondary" className="mb-1">
                        {CHANNEL_CONFIG[channel].label}
                     </Badge>
                     <p className="text-sm text-muted-foreground">
                        Nenhuma mensagem por aqui ainda.
                     </p>
                  </div>
               ) : (
                  filteredMessages.map((message) => (
                     <MessageBubble
                        key={message.id}
                        message={message}
                        contact={contact}
                     />
                  ))
               )}
               <div ref={bottomRef} />
            </div>
         </ScrollArea>

         {/* Composer */}
         <div className="shrink-0 border-t p-3 sm:p-4">
            <ChatComposer
               channel={channel}
               onChannelChange={setChannel}
               contactName={contact.name}
               history={filteredMessages.map((m) => ({
                  content: m.content,
                  sender: m.sender,
               }))}
               onSend={(content) => onSendMessage?.(content, channel)}
            />
         </div>
      </div>
   )
}
export default ChatBox;