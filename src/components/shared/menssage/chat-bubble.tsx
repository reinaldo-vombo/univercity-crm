"use client"


import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/helper"
import Avatar from "../avatar"
import { TContact, TMessage } from "./types"
import { CHANNEL_CONFIG } from "./constant"


export const MessageBubble = ({
   message,
   contact,
}: {
   message: TMessage
   contact: TContact
}) => {
   const isMe = message.sender === "me"
   const config = CHANNEL_CONFIG[message.channel]

   if (message.channel === "email") {
      return (
         <div
            className={cn(
               "max-w-[85%] rounded-lg border p-3 sm:max-w-[75%]",
               isMe ? "ml-auto bg-muted/50" : "bg-background"
            )}
         >
            <p className="truncate text-sm font-medium">
               {message.subject || "(sem assunto)"}
            </p>

            <p className="text-sm text-muted-foreground">{message.content}</p>
            <p className="mt-2 text-[10px] text-muted-foreground">
               {formatDate(message.sentAt, "DD/MM HH:mm")}
            </p>
         </div>
      )
   }

   return (
      <div
         className={cn(
            "flex items-end gap-2",
            isMe ? "flex-row-reverse" : "flex-row"
         )}
      >
         {!isMe && (
            <Avatar photo={contact.avatarUrl} name={contact.name} className="size-6 shrink-0"></Avatar>
         )}
         <div
            className={cn(
               "flex max-w-[80%] flex-col gap-1 sm:max-w-[65%]",
               isMe ? "items-end" : "items-start"
            )}
         >
            <div
               className={cn(
                  "rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                  isMe
                     ? cn(config.accent, "rounded-br-sm")
                     : "rounded-bl-sm bg-muted"
               )}
            >
               {message.content}
            </div>
            <span className="px-1 text-[10px] text-muted-foreground">
               {formatDate(message.sentAt, "HH:mm")}
            </span>
         </div>
      </div>
   )
}




