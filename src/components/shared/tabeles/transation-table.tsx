
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { TTrasition } from "@/types/global";
import { formatCurrency, formatDate } from "@/lib/helper";
type TProps = {
   data: TTrasition[] | null
}

const TransationTable = ({ data }: TProps) => {

   return (
      <div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Data do pagamento</TableHead>
                  <TableHead>Data de Publicação</TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {data && data.length < 0 ? (
                  <TableRow>
                     <TableCell
                        colSpan={5}
                        className="text-center text-muted-foreground"
                     >
                        Não há Nenhuma trasação Nessa Conta
                     </TableCell>
                  </TableRow>
               ) : (
                  data && data.map((tx) => (
                     <TableRow key={tx.id}>
                        <TableCell>
                           {`${tx.student.firstName} ${tx.student.middleName} ${tx.student.lastName}`}
                        </TableCell>
                        <TableCell>
                           {formatCurrency(tx.totalAmount)}
                        </TableCell>
                        <TableCell>
                           {formatDate(tx.paidAt ?? '')}
                        </TableCell>

                        <TableCell>
                           {formatDate(tx.createdAt)}
                        </TableCell>
                     </TableRow>
                  ))
               )}
            </TableBody>
         </Table>
      </div>
   )
}

export default TransationTable;
