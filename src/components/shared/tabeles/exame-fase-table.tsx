'use client'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TAdmitionExameFase, TBuilding } from "@/types/global";
import { formatDate } from "@/lib/helper";
import { toast } from "sonner";
import { FLASH_MESSAGE } from "@/constants/flash-message";
import { deleteAdmitionExameFase } from "@/actions/admition-exame";
import { CloseBage, CompleteBage } from "@/components/shared/bages";
import SheetModal from "../sheet-modal";
import { PenBoxIcon } from "lucide-react";
import UpdateAdmitionExameFase from "../../forms/update/update.admition-exame-fase";
type TProps = {
   data: TAdmitionExameFase[];
   buildings: TBuilding[]
}
const now = new Date()
const ExameFaseTable = ({ data, buildings }: TProps) => {

   const handleDelete = async (id: number) => {

      try {
         const res = await deleteAdmitionExameFase(id);
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
   const faseStatus = (faseDate: Date | string) => {
      const isClosed = now > new Date(faseDate);

      return isClosed ? (
         <CloseBage title="Encerrado" />
      ) : (
         <CompleteBage title="Decorrendo" />
      );
   };
   return (
      <div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Abertura</TableHead>
                  <TableHead>Encerramento</TableHead>
                  <TableHead>Data do Exame</TableHead>
                  <TableHead>Teriodo</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Localização</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ação</TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {data.length < 0 ? (
                  <TableRow>
                     <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                     >
                        Fase para os Exames de Acesso Ainda não Foram Definidas
                     </TableCell>
                  </TableRow>
               ) : (
                  data.map((fase) => (
                     <TableRow key={fase.id}>
                        <TableCell>
                           {fase.name}
                        </TableCell>
                        <TableCell>
                           {formatDate(fase.startDate)}
                        </TableCell>
                        <TableCell>
                           {formatDate(fase.endDate)}
                        </TableCell>
                        <TableCell>
                           {formatDate(fase.duoDate ?? '')}
                        </TableCell>

                        <TableCell>Mãnha</TableCell>

                        <TableCell>09:00</TableCell>

                        <TableCell>
                           {fase?.building?.title} - Sala {fase.room?.roomNumber}
                        </TableCell>
                        <TableCell>
                           {faseStatus(fase.endDate)}
                        </TableCell>

                        <TableCell className="text-right">
                           <SheetModal
                              trigger={<PenBoxIcon className="h-4 w-4 text-green-500" />}
                              side="right"
                              id={`edit-${fase.id}`}
                              className="sm:max-w-md"
                              title="Atualizar fase do exame de acesso"
                              description='Atualizar fase'>
                              <UpdateAdmitionExameFase building={buildings} defaultValues={fase} />
                           </SheetModal>
                           <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(fase.id)}
                           >
                              Excluir
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
      </div>
   )
}

export default ExameFaseTable;
