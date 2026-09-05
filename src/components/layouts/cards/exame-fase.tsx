'use client'
import { Building2, Calendar1, CalendarCheck, Hash, Pen, SunDimIcon, Timer, Trash, UserCheck } from "lucide-react"
import AlertModal from "@/components/shared/alert-modal"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/helper"
import { CloseBage, CompleteBage } from "@/components/shared/bages"
import { TAdmitionExameFase, TBuilding } from "@/types/global"
import SheetModal from "@/components/shared/sheet-modal"
import UpdateAdmitionExameFase from "@/components/forms/update/update.admition-exame-fase"
import { deleteAdmitionExameFase } from "@/actions/admition-exame"
import { toast } from "sonner"
import { FLASH_MESSAGE } from "@/constants/flash-message"

type TProps = {
   fases: TAdmitionExameFase[];
   building: TBuilding[]
}
const now = new Date()
const faseStatus = (faseDate: Date) => {
   if (now > faseDate) {
      return <CloseBage title="Encerrado" />
   } else {
      return <CompleteBage title="Decorrendo" />
   }
}
const ExameFaseCard = ({ fases, building }: TProps) => {
   const handleDelete = async (id: number) => {
      const st = String(id)
      try {
         const res = await deleteAdmitionExameFase(st);
         if (res.error) {
            toast.error(res.message);
            return;
         }
         toast.success(FLASH_MESSAGE.DELETED);
         // Optionally refresh UI or mutate local state
      } catch (err) {
         toast.error(FLASH_MESSAGE.SERVER_ERROR);
         console.error(err);
      }
   };
   return (
      <div className="grid grid-cols-12 gap-4">
         {fases && fases.length > 0 ? fases.map((fase) => (
            <div className="rounded-md col-span-4 bg-card p-2 space-y-4" key={fase.id}>
               <div className="flex items-center justify-between">
                  <h2>{fase.name}</h2>
                  {faseStatus(fase.endDate)}
                  <span className="flex items-center"><Hash className="size-4 text-blue-400" /> {fase.ordem}</span>
               </div>
               <Separator />
               <div className="space-y-5">
                  <ul className="flex items-center justify-between">
                     <li className="flex items-center gap-2">
                        <Calendar1 className="text-green-400 size-4" /> <b>Inicio</b> - {formatDate(fase.startDate)}
                     </li>
                     <li className="flex items-center gap-2">
                        <Calendar1 className="text-red-400 size-4" /> <b>Ternino</b> - {formatDate(fase.endDate)}
                     </li>
                  </ul>
                  <div>
                     <ul className="space-y-4">
                        <li className="flex items-center gap-2">
                           <UserCheck className="text-green-500 size-4" /> <b>Candidatos (20)</b>
                        </li>
                        <li className="flex items-center gap-2">
                           <CalendarCheck className="text-green-500 size-4" /> <b>Data do exame {fase.duoDate ? formatDate(fase.duoDate) : 'Sem data definida'}</b>
                        </li>
                        <li className="flex items-center gap-2">
                           <SunDimIcon className="text-green-300 size-4" /> <b>Teriodo </b>Mãnha
                        </li>
                        <li className="flex items-center gap-2">
                           <Timer className="text-green-300 size-4" /> <b>Hora </b>08:00h
                        </li>
                        <li className="flex items-center gap-2">
                           <Building2 className="text-green-300 size-4" /> <b>Localização </b>{fase?.building?.title} - Sala {fase.room?.roomNumber}
                        </li>
                     </ul>
                  </div>
                  <Separator />
                  <div className="flex items-center gap-2">
                     <SheetModal
                        trigger={<Pen className="h-4 w-4 text-green-500 cursor-pointer" />}
                        side="right"
                        id={`edit-${fase.id}`}
                        title="Detalhes do exame de admisão"
                        className="sm:max-w-3xl"
                        description='Detalhes do exame de admisão'>
                        <UpdateAdmitionExameFase defaultValues={fase} building={building} />
                     </SheetModal>
                     <AlertModal
                        trigger={<Trash className="h-4 w-4 text-red-500 cursor-pointer" />}
                        action={() => handleDelete(fase.id)} />
                  </div>
               </div>
            </div>
         ))
            : (<p>Sem fase para exame de admição</p>)}
      </div>
   )
}

export default ExameFaseCard;
