import { ChartPieInteractive } from "@/components/shared/chart/pie-chart";
import TransationTable from "@/components/shared/tabeles/transation-table";
import { TBankAccountAnalitycs } from "@/types/global"
import Link from "next/link";

type TProps = {
   data: TBankAccountAnalitycs
}


const BankAccountInfo = ({ data }: TProps) => {
   const { accountNumber, bankName, totalReceived, totalTransactions, accountName, iban, transactions } = data;
   return (
      <div>
         <div className="border border-card rounded-md p-4">
            <h2 className="text-2xl">{accountName}</h2>
            <div className="grid col-end-2 gap-6">
               <ul className="space-y-4 mt-4">
                  <li><span className="text-neutral-500">Nome</span> {bankName}</li>
                  <li><span className="text-neutral-500">Número</span> {accountNumber}</li>
                  <li><span className="text-neutral-500">Iban</span> {iban}</li>
                  <li><span className="text-neutral-500">Transações</span> {totalTransactions}</li>
                  <li><span className="text-neutral-500">Recebido</span> {totalReceived}</li>
               </ul>
               <div>
                  <ChartPieInteractive />
               </div>
            </div>
         </div>
         <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
               <h2 className="text-2xl">Últimas Transações</h2>
               <Link href={'#'}>Ver mais</Link>
            </div>
            <TransationTable data={transactions} />
         </div>
      </div>
   )
}

export default BankAccountInfo;
