
import { getAllAccounts } from "@/services/data/bank-account";
import CreditCard from "@/components/layouts/cards/credite-card";
import Ping from "@/components/shared/ping";
import { Plus } from "lucide-react";
import SheetModal from "@/components/shared/sheet-modal";
import { createUniqueId } from "@/lib/helper";
import CreateNewBankAccount from "@/components/forms/admin/post/create-bank-account"
import BankAccountInfo from "@/components/admin/container/bank-account-info";

const uid = createUniqueId("create");
const uid2 = createUniqueId("view");
export async function AccountsServer() {
   const accounts = await getAllAccounts()
   return (
      <div className="grid grid-cols-12 gap-3">
         {accounts.map((account) => (
            <div key={account.id} className="col-span-3 p-4 space-y-4">
               {/* <Link href={`${ROUTES.DASHBOARD}/finance/accounts/${account.id}`} className="block">
                  <CreditCard />
               </Link> */}
               <SheetModal trigger={<CreditCard />}
                  side="right"
                  title="Detalhes da Conta"
                  className="sm:max-w-5xl"
                  id={uid2}>
                  <BankAccountInfo data={account} />
               </SheetModal>
               <ul className="space-y-4">
                  <li>Conta: <b>{account.accountName}</b></li>
                  <li>Número<b>{account.accountNumber}</b></li>
                  <li>Banco: <b>{account.bankName}</b></li>
                  <li>Iban: <b>{account.iban}</b></li>
                  <li className={`${account.isActive ? 'text-green-500' : 'text-amber-500'} flex items-center gap-2`}>
                     <b>{account.isActive ? 'Activo' : 'Inactivo'}</b>
                     <Ping />
                  </li>
               </ul>
            </div>
         ))}
         <div className="col-span-3 p-4">
            <SheetModal trigger={
               <div className="visa-card border-dashed">
                  <div className="logoContainer">
                     <Plus />
                  </div>
               </div>
            }
               side="right"
               className="sm:max-w-md"
               title="Adicionar Nova Conta Bancaria"
               id={uid}>
               <CreateNewBankAccount />
            </SheetModal>

         </div>
      </div>
   )
}
