'use client'

import { TAdmitionExame } from '@/types/global'
import { formatDate } from "@/lib/helper";
import { Separator } from "../../../ui/separator"
import { ScrollArea } from "../../../ui/scroll-area";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Card, } from '@/components/ui/card';
import { Building2, CalendarDays, Clock, FileText, Mail, MapPin, Phone } from 'lucide-react';
import { Avatar } from '@/components/ui/avatar';
import { InfoItem } from './info-item';
import ChatBox from '@/components/shared/menssage/chat-box';
// import ExpandebalForm from '@/components/shared/popover-form';

type TAdmitionExameDetailsProps = {
   data: TAdmitionExame;
   messages?: any[]
}
const AdmitionExameInfo = ({ data, messages = [] }: TAdmitionExameDetailsProps) => {
   const { firstName, middleName, lastName, building, room, exameDate, status, startTime, endTime, email, phoneNumber, fase, gradeDeclarationUrl, exameResults, } = data;
   const fullName = `${firstName} ${middleName} ${lastName}`


   return (
      <ScrollArea className="h-[700px]">
         <div className="space-y-6 pr-2">
            {/* Cabeçalho do candidato */}
            <div className="flex items-center justify-between gap-4">
               <div className="flex items-center gap-3">
                  <Avatar className="size-12" />
                  <div>
                     <p className="font-semibold leading-tight">{fullName}</p>
                     <p className="text-sm text-muted-foreground">{email}</p>
                  </div>
               </div>
               <Badge
                  className={cn(
                     "text-white",
                     status ? "bg-green-500" : "bg-red-500"
                  )}
               >
                  {status ? "Registrado" : "Pendente"}
               </Badge>
            </div>

            <Separator />

            {/* Informações de contato e exame */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               <div className="space-y-4">
                  <InfoItem icon={Mail} label="Email" value={email} />
                  <InfoItem
                     icon={Phone}
                     label="Telefone"
                     value={`(+244) ${phoneNumber}`}
                  />
                  <InfoItem
                     icon={Building2}
                     label="Localização"
                     value={`${building} - ${room}`}
                  />
               </div>
               <div className="space-y-4">
                  <InfoItem
                     icon={CalendarDays}
                     label="Data do exame"
                     value={formatDate(exameDate, "DD/MM/YYYY")}
                  />
                  <InfoItem icon={Clock} label="Hora" value={`${startTime} - ${endTime}`} />
                  <InfoItem
                     icon={MapPin}
                     label="Fase do exame"
                     value={fase.name}
                  />
               </div>
            </div>

            <Separator />

            {/* Resultado */}
            <div className="flex items-center justify-between rounded-lg border bg-muted/40 p-4">
               <div>
                  <p className="text-sm text-muted-foreground">
                     Resultado do exame
                  </p>
                  <p className="text-2xl font-bold">
                     {exameResults ?? "—"}
                     {exameResults !== undefined && (
                        <span className="ml-1 text-sm font-normal text-muted-foreground">
                           /20
                        </span>
                     )}
                  </p>
               </div>
               <Badge
                  className={cn(
                     "text-white",
                     (exameResults ?? 0) >= 10 ? "bg-green-500" : "bg-red-500"
                  )}
               >
                  {exameResults !== undefined ? "Aprovado" : "Pendente"}
               </Badge>
            </div>

            <Separator />

            {/* Documento + Chat lado a lado */}
            <div>
               <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                  <FileText className="size-4 text-muted-foreground" />
                  Documentos e mensagens
               </p>

               <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* Documento */}
                  <Card className="overflow-hidden p-0">
                     <div className="border-b bg-muted/40 px-4 py-2 text-xs font-medium text-muted-foreground">
                        Documento enviado
                     </div>
                     <div className="h-[420px] bg-muted/20">
                        <iframe
                           src={gradeDeclarationUrl || "/agradecimento.pdf"}
                           className="h-full w-full"
                           title="Documento do candidato"
                        />
                     </div>
                  </Card>

                  {/* Chat / mensagens */}
                  <ChatBox messages={messages} contact={{
                     name: 'Reinaldo',
                     avatarUrl: '/avatar-1.jpg',
                     isOnline: true
                  }}

                  />
                  {/* <Card className="flex flex-col overflow-hidden p-0">
                     <CardHeader className="border-b bg-muted/40 px-4 py-2">
                        <p className="text-xs font-medium text-muted-foreground">
                           Mensagens sobre o candidato
                        </p>
                     </CardHeader>

                     <CardContent className="flex h-[420px] flex-col gap-0 p-0">
                        <div className="flex-1 space-y-3 overflow-y-auto p-4">
                           {messages?.length === 0 && (
                              <p className="text-sm text-muted-foreground">
                                 Nenhuma mensagem ainda.
                              </p>
                           )}
                           {messages ? messages.map((msg) => (
                              <div
                                 key={msg.id}
                                 className={cn(
                                    "flex flex-col gap-1 max-w-[85%]",
                                    msg.isOwn ? "ml-auto items-end" : "items-start"
                                 )}
                              >
                                 <div
                                    className={cn(
                                       "rounded-lg px-3 py-2 text-sm",
                                       msg.isOwn
                                          ? "bg-primary text-primary-foreground"
                                          : "bg-muted"
                                    )}
                                 >
                                    {msg.content}
                                 </div>
                                 <span className="text-[10px] text-muted-foreground">
                                    {msg.author} ·{" "}
                                    {formatDate(msg.sentAt, "DD/MM HH:mm")}
                                 </span>
                              </div>
                           )) : (<p>Sem mensagem</p>)}
                        </div>

                        <div className="flex items-end gap-2 border-t p-3">
                           <Textarea
                              value={draft}
                              onChange={(e) => setDraft(e.target.value)}
                              onKeyDown={(e) => {
                                 if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSend()
                                 }
                              }}
                              placeholder="Escreva uma mensagem..."
                              className="min-h-9 resize-none"
                              rows={1}
                           />
                           <Button
                              size="icon"
                              className="shrink-0 cursor-pointer"
                              onClick={handleSend}
                              disabled={!draft.trim()}
                           >
                              <SendHorizonal className="size-4" />
                           </Button>
                        </div>
                     </CardContent>
                  </Card> */}
               </div>
            </div>
         </div>
      </ScrollArea>
   )
}

export default AdmitionExameInfo
