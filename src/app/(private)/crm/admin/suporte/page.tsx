// 'use client'
// import { useMemo, useState, useTransition } from "react";
// import { toast } from "sonner";
// // import SubmitBtn from "@/components/shared/submit-btn";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { formatDate, formatTimeAgo } from "@/lib/helper";
// import { CheckCircle2, CircleDot, Inbox, Loader, Paperclip, Search } from "lucide-react";

// type TTicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
// type TTicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

// type TTicket = {
//    id: string;
//    subject: string;
//    message: string;
//    status: TTicketStatus;
//    priority: TTicketPriority;
//    requester: {
//       name: string;
//       email: string;
//       avatarUrl?: string;
//    };
//    assignedTo?: {
//       name: string;
//       avatarUrl?: string;
//    };
//    messages: {
//       id: string;
//       author: string;
//       authorType: 'ADMIN' | 'USER';
//       content: string;
//       createdAt: string;
//    }[];
//    createdAt: string;
//    updatedAt: string;
// };
// const tickets: TTicket[] = [
//    {
//       id: '2222',
//       subject: 'Trasferencia de curso',
//       message: 'Hello world',
//       status: 'IN_PROGRESS',
//       priority: 'LOW',
//       requester: {
//          name: 'Reginalde Baggle',
//          email: 'reginalde@baggle.com',
//          avatarUrl: '/avatar-1.jpg',
//       },
//       assignedTo: {
//          name: 'Hanna Maria',
//          avatarUrl: '/avatar-2.jpg',
//       },
//       messages: [{
//          id: '1111',
//          author: 'Reinaldo',
//          authorType: 'ADMIN',
//          content: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint distinctio sed temporibus assumenda, non quas ullam? Placeat sit consectetur deserunt cumque repellat aliquam tempore ducimus eligendi eaque modi, dolorum aut!',
//          createdAt: new Date().toISOString(),
//       }],

//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//    }
// ]



// const statusConfig: Record<TTicketStatus, { label: string; className: string }> = {
//    OPEN: { label: 'Aberto', className: 'bg-blue-500/10 text-blue-500 border border-blue-500/20' },
//    IN_PROGRESS: { label: 'Em Andamento', className: 'bg-orange-500/10 text-orange-500 border border-orange-500/20' },
//    RESOLVED: { label: 'Resolvido', className: 'bg-green-500/10 text-green-500 border border-green-500/20' },
//    CLOSED: { label: 'Fechado', className: 'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20' },
// };

// const priorityConfig: Record<TTicketPriority, { label: string; className: string }> = {
//    LOW: { label: 'Baixa', className: 'bg-neutral-500/10 text-neutral-400' },
//    MEDIUM: { label: 'Média', className: 'bg-yellow-500/10 text-yellow-500' },
//    HIGH: { label: 'Alta', className: 'bg-orange-500/10 text-orange-500' },
//    URGENT: { label: 'Urgente', className: 'bg-red-500/10 text-red-500' },
// };

// export default function SupportPage() {

//    const [search, setSearch] = useState('');
//    const [statusFilter, setStatusFilter] = useState<TTicketStatus | 'ALL'>('ALL');
//    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id ?? null);
//    const [reply, setReply] = useState('');
//    const [isPending, startTransition] = useTransition();

//    const filteredTickets = useMemo(() => {
//       return tickets.filter((ticket) => {
//          const matchesSearch =
//             ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
//             ticket.requester.name.toLowerCase().includes(search.toLowerCase());
//          const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;
//          return matchesSearch && matchesStatus;
//       });
//    }, [tickets, search, statusFilter]);

//    const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

//    const stats = useMemo(() => ({
//       total: tickets.length,
//       open: tickets.filter((t) => t.status === 'OPEN').length,
//       inProgress: tickets.filter((t) => t.status === 'IN_PROGRESS').length,
//       resolved: tickets.filter((t) => t.status === 'RESOLVED').length,
//    }), [tickets]);

//    const handleSendReply = () => {
//       if (!reply.trim() || !selectedTicket) return;
//       startTransition(async () => {
//          try {
//             // await replyToTicket(selectedTicket.id, reply);
//             toast.success('Resposta enviada');
//             setReply('');
//          } catch (error) {
//             toast.error('Erro ao enviar resposta');
//             console.error(error);
//          }
//       });
//    };

//    return (
//       <section className="space-y-6 col-span-12">
//          <div className="flex items-center justify-between">
//             <div>
//                <h1 className="text-2xl font-bold">Suporte</h1>
//                <p className="text-sm text-neutral-500">Gerencie os tickets de suporte dos utilizadores</p>
//             </div>
//          </div>

//          {/* Cards de métricas */}
//          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="rounded-xl border p-5 space-y-1">
//                <div className="flex items-center justify-between">
//                   <p className="text-sm text-neutral-500">Total de Tickets</p>
//                   <Inbox className="size-4 text-neutral-500" />
//                </div>
//                <p className="text-2xl font-bold">{stats.total}</p>
//             </div>
//             <div className="rounded-xl border p-5 space-y-1">
//                <div className="flex items-center justify-between">
//                   <p className="text-sm text-neutral-500">Abertos</p>
//                   <CircleDot className="size-4 text-blue-500" />
//                </div>
//                <p className="text-2xl font-bold">{stats.open}</p>
//             </div>
//             <div className="rounded-xl border p-5 space-y-1">
//                <div className="flex items-center justify-between">
//                   <p className="text-sm text-neutral-500">Em Andamento</p>
//                   <Loader className="size-4 text-orange-500" />
//                </div>
//                <p className="text-2xl font-bold">{stats.inProgress}</p>
//             </div>
//             <div className="rounded-xl border p-5 space-y-1">
//                <div className="flex items-center justify-between">
//                   <p className="text-sm text-neutral-500">Resolvidos</p>
//                   <CheckCircle2 className="size-4 text-green-500" />
//                </div>
//                <p className="text-2xl font-bold">{stats.resolved}</p>
//             </div>
//          </div>

//          {/* Painel principal: lista + detalhe */}
//          <div className="grid grid-cols-12 gap-4 h-[calc(100vh-320px)] min-h-[500px]">

//             {/* Lista de tickets */}
//             <div className="col-span-12 lg:col-span-4 rounded-xl border flex flex-col overflow-hidden">
//                <div className="p-4 space-y-3 border-b">
//                   <div className="relative">
//                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
//                      <Input
//                         placeholder="Buscar por assunto ou nome..."
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className="pl-9"
//                      />
//                   </div>
//                   <div className="flex gap-1.5 overflow-x-auto">
//                      {(['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'] as const).map((status) => (
//                         <button
//                            key={status}
//                            onClick={() => setStatusFilter(status)}
//                            className={`shrink-0 text-xs font-medium px-2.5 py-1.5 rounded-full transition-colors ${statusFilter === status
//                               ? 'bg-white text-black'
//                               : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
//                               }`}
//                         >
//                            {status === 'ALL' ? 'Todos' : statusConfig[status].label}
//                         </button>
//                      ))}
//                   </div>
//                </div>

//                <div className="flex-1 overflow-y-auto divide-y">
//                   {filteredTickets.length > 0 ? filteredTickets.map((ticket) => (
//                      <button
//                         key={ticket.id}
//                         onClick={() => setSelectedTicketId(ticket.id)}
//                         className={`w-full text-left p-4 space-y-2 transition-colors hover:bg-neutral-900 ${selectedTicketId === ticket.id ? 'bg-neutral-900' : ''
//                            }`}
//                      >
//                         <div className="flex items-start justify-between gap-2">
//                            <p className="font-medium text-sm line-clamp-1">{ticket.subject}</p>
//                            <span className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityConfig[ticket.priority].className}`}>
//                               {priorityConfig[ticket.priority].label}
//                            </span>
//                         </div>
//                         <p className="text-xs text-neutral-500 line-clamp-1">{ticket.message}</p>
//                         <div className="flex items-center justify-between">
//                            <div className="flex items-center gap-1.5">
//                               <Avatar className="size-5">
//                                  <AvatarImage src={ticket.requester.avatarUrl} />
//                                  <AvatarFallback className="text-[10px]">{ticket.requester.name[0]}</AvatarFallback>
//                               </Avatar>
//                               <span className="text-xs text-neutral-400">{ticket.requester.name}</span>
//                            </div>
//                            <span className="text-[11px] text-neutral-500">{formatTimeAgo(ticket.updatedAt)}</span>
//                         </div>
//                      </button>
//                   )) : (
//                      <div className="p-8 text-center text-sm text-neutral-500">
//                         Nenhum ticket encontrado
//                      </div>
//                   )}
//                </div>
//             </div>

//             {/* Detalhe do ticket */}
//             <div className="col-span-12 lg:col-span-8 rounded-xl border flex flex-col overflow-hidden">
//                {selectedTicket ? (
//                   <>
//                      {/* Cabeçalho do ticket */}
//                      <div className="p-5 border-b space-y-3">
//                         <div className="flex items-start justify-between gap-4">
//                            <div>
//                               <h2 className="font-semibold text-lg">{selectedTicket.subject}</h2>
//                               <p className="text-xs text-neutral-500 mt-1">
//                                  Ticket #{selectedTicket.id} · Aberto em {formatDate(selectedTicket.createdAt)}
//                               </p>
//                            </div>
//                            <div className="flex items-center gap-2 shrink-0">
//                               <Select defaultValue={selectedTicket.status}>
//                                  <SelectTrigger className="w-40 h-8 text-xs">
//                                     <SelectValue />
//                                  </SelectTrigger>
//                                  <SelectContent>
//                                     {Object.entries(statusConfig).map(([key, cfg]) => (
//                                        <SelectItem key={key} value={key} className="text-xs">{cfg.label}</SelectItem>
//                                     ))}
//                                  </SelectContent>
//                               </Select>
//                            </div>
//                         </div>

//                         <div className="flex items-center gap-4">
//                            <div className="flex items-center gap-2">
//                               <Avatar className="size-7">
//                                  <AvatarImage src={selectedTicket.requester.avatarUrl} />
//                                  <AvatarFallback className="text-xs">{selectedTicket.requester.name[0]}</AvatarFallback>
//                               </Avatar>
//                               <div className="leading-tight">
//                                  <p className="text-sm font-medium">{selectedTicket.requester.name}</p>
//                                  <p className="text-xs text-neutral-500">{selectedTicket.requester.email}</p>
//                               </div>
//                            </div>
//                            <Separator orientation="vertical" className="h-8" />
//                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityConfig[selectedTicket.priority].className}`}>
//                               Prioridade {priorityConfig[selectedTicket.priority].label}
//                            </span>
//                         </div>
//                      </div>

//                      {/* Conversa */}
//                      <div className="flex-1 overflow-y-auto p-5 space-y-5">
//                         {selectedTicket.messages.map((msg) => (
//                            <div
//                               key={msg.id}
//                               className={`flex gap-3 ${msg.authorType === 'ADMIN' ? 'flex-row-reverse' : ''}`}
//                            >
//                               <Avatar className="size-8 shrink-0">
//                                  <AvatarFallback className="text-xs">{msg.author[0]}</AvatarFallback>
//                               </Avatar>
//                               <div className={`max-w-[75%] space-y-1 ${msg.authorType === 'ADMIN' ? 'items-end text-right' : ''}`}>
//                                  <div className="flex items-center gap-2">
//                                     <span className="text-xs font-medium">{msg.author}</span>
//                                     <span className="text-[11px] text-neutral-500">{formatTimeAgo(msg.createdAt)}</span>
//                                  </div>
//                                  <div
//                                     className={`rounded-xl px-4 py-2.5 text-sm ${msg.authorType === 'ADMIN'
//                                        ? 'bg-blue-600 text-white'
//                                        : 'bg-neutral-800 text-neutral-100'
//                                        }`}
//                                  >
//                                     {msg.content}
//                                  </div>
//                               </div>
//                            </div>
//                         ))}
//                      </div>

//                      {/* Caixa de resposta */}
//                      <div className="p-4 border-t space-y-3">
//                         <Textarea
//                            placeholder="Escreva uma resposta..."
//                            value={reply}
//                            onChange={(e) => setReply(e.target.value)}
//                            className="resize-none min-h-20"
//                         />
//                         <div className="flex items-center justify-between">
//                            <div className="flex gap-2">
//                               <Button variant="outline" size="sm">
//                                  <Paperclip className="size-3.5" />
//                                  Anexar
//                               </Button>
//                            </div>
//                            {/* <SubmitBtn
//                               label="Enviar"
//                               loading={isPending}
//                               onClick={handleSendReply}
//                            /> */}
//                            <Button disabled={isPending} onClick={handleSendReply}>Enviar</Button>
//                         </div>
//                      </div>
//                   </>
//                ) : (
//                   <div className="flex-1 flex flex-col items-center justify-center text-neutral-500 gap-2">
//                      <Inbox className="size-8" />
//                      <p className="text-sm">Selecione um ticket para ver os detalhes</p>
//                   </div>
//                )}
//             </div>
//          </div>
//       </section>
//    )
// }


export default function SupportPage() {
   return (
      <div>
         hello
      </div>
   )
}
