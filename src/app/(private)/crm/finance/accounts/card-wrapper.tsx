
import { getAllAccounts } from "@/services/data/bank-account";
import CreditCard from "@/components/layouts/cards/credite-card";
import { Copy, Landmark, Plus } from "lucide-react";
import SheetModal from "@/components/shared/sheet-modal";
import CreateNewBankAccount from "@/components/forms/admin/post/create-bank-account"
import BankAccountInfo from "@/app/(private)/crm/finance/accounts/bank-account-info";
import { Separator } from "@/components/ui/separator";

const logos = [
   {
      sign: 'BFA',
      logo: '/bfa.png'
   },
   {
      sign: 'BAI',
      logo: '/bai-w.png'
   },
]
export async function AccountsServer() {
   const accounts = await getAllAccounts()

   return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
         {accounts.map((account, i) => (
            <div
               key={account.id}
               className="group rounded-2xl border overflow-hidden hover:border-neutral-700 transition-colors"
            >
               {/* Cartão visual */}
               <SheetModal
                  trigger={
                     <div className="p-4 cursor-pointer">
                        <CreditCard
                           accountName={account.accountName}
                           accountNumber={account.accountNumber}
                           bankName={account.bankName}
                           bankLogoUrl={logos[i].logo}
                        />
                     </div>
                  }
                  side="right"
                  title="Detalhes da Conta"
                  className="sm:max-w-2xl"
                  id={`account-${account.id}`}
               >
                  <BankAccountInfo data={account} />
               </SheetModal>

               {/* Dados da conta */}
               <div className="px-5 pb-5 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="min-w-0">
                        <p className="text-xs text-neutral-500">Conta</p>
                        <b className="text-sm truncate block">{account.accountName}</b>
                     </div>
                     <span
                        className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${account.isActive
                           ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                           : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                           }`}
                     >
                        <span className={`size-1.5 rounded-full ${account.isActive ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
                        {account.isActive ? 'Ativo' : 'Inativo'}
                     </span>
                  </div>

                  <Separator />

                  <ul className="space-y-2.5 text-sm">
                     <li className="flex items-center justify-between">
                        <span className="text-neutral-500">Banco</span>
                        <b className="truncate max-w-[60%] text-right">{account.bankName}</b>
                     </li>
                     <li className="flex items-center justify-between">
                        <span className="text-neutral-500">Número</span>
                        <b>{account.accountNumber}</b>
                     </li>
                     <li className="flex items-center justify-between gap-2">
                        <span className="text-neutral-500 shrink-0">IBAN</span>
                        <button
                           className="flex items-center gap-1.5 text-right group/copy"
                        >
                           <b className="truncate max-w-40">
                              {account.iban.slice(0, 6)}••••{account.iban.slice(-4)}
                           </b>
                           <Copy className="size-3 text-neutral-500 group-hover/copy:text-white transition-colors shrink-0" />
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         ))}

         {/* Adicionar nova conta */}
         <SheetModal
            trigger={
               <button className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed p-4 min-h-[280px] w-full hover:border-neutral-600 hover:bg-neutral-900/30 transition-colors">
                  <div className="flex items-center justify-center size-12 rounded-full bg-neutral-900 border group-hover:bg-neutral-800 transition-colors">
                     <Plus className="size-5 text-neutral-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-center">
                     <b className="text-sm">Adicionar Conta</b>
                     <p className="text-xs text-neutral-500 mt-0.5">Registar nova conta bancária</p>
                  </div>
               </button>
            }
            side="right"
            className="sm:max-w-md"
            title="Adicionar Nova Conta Bancaria"
            id="new-bank-account"
         >
            <CreateNewBankAccount />
         </SheetModal>

         {accounts.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed p-12 text-center text-neutral-500">
               <Landmark className="size-8 mx-auto mb-3 text-neutral-600" />
               Nenhuma conta bancária registada ainda
            </div>
         )}
      </div>
   )
}
