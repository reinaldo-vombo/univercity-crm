'use client'
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { createQueryString } from "@/lib/helper"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const MESSAGE_TYPE = ['system', 'sms', 'mail']
const MessageSender = () => {
   const router = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const query = searchParams.get('type');
   const generateQueryString = useCallback(
      (name: string, value: string) => createQueryString(searchParams, name, value),
      [searchParams]
   );
   const onChange = (queryName: string, queryValue: string) => {
      router.push(pathname + '?' + generateQueryString(queryName, queryValue), { scroll: false })
   }
   return (
      <div className="space-y-6">
         <p>Selecione o canal de menssagem</p>
         <div className="flex items-center gap-4">
            {MESSAGE_TYPE.map((type) => (
               <Button variant={query === type ? 'secondary' : 'ghost'}
                  onClick={() => onChange('type', type)} key={type}>{type}</Button>
            ))}
         </div>
         <ScrollArea className="h-24">
            message
         </ScrollArea>
         <Input className="h-9" placeholder="Escreva a menssagem" />
         {/* <div className="grid w-full gap-3">
            <Label htmlFor="message-2">Your Message</Label>
            <Textarea placeholder="Type your message here." id="message-2" />
            <p className="text-muted-foreground text-sm">
               Your message will be copied to the support team.
            </p>
         </div> */}
      </div>
   )
}

export default MessageSender
