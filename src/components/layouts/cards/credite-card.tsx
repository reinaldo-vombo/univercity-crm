import { CreditCardIcon, Landmark } from "lucide-react";
import Image from "next/image";

type TCreditCardProps = {
   accountName?: string;
   accountNumber?: string;
   bankName?: string;
   bankLogoUrl?: string;
   variant?: 'dark' | 'blue' | 'green' | 'purple';
};

const variantStyles: Record<NonNullable<TCreditCardProps['variant']>, string> = {
   dark: 'from-neutral-900 via-neutral-800 to-neutral-900',
   blue: 'from-blue-950 via-blue-900 to-neutral-900',
   green: 'from-emerald-950 via-emerald-900 to-neutral-900',
   purple: 'from-purple-950 via-purple-900 to-neutral-900',
};

const maskNumber = (number?: string) => {
   if (!number) return '•••• •••• •••• ••••';
   const clean = number.replace(/\s/g, '');
   const last4 = clean.slice(-4);
   return `•••• •••• •••• ${last4}`;
};


const CreditCard = ({
   accountName = 'NOME DO TITULAR',
   accountNumber,
   bankName = 'Banco',
   bankLogoUrl,
   variant = 'dark',
}: TCreditCardProps) => {
   return (
      <div
         className={`relative w-full aspect-[16/10] rounded-2xl bg-gradient-to-br ${variantStyles[variant]} p-5 flex flex-col justify-between overflow-hidden shadow-lg`}
      >
         {/* Textura / brilho decorativo */}
         <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-16 -right-16 size-48 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-20 -left-10 size-40 rounded-full bg-white/[0.03] blur-2xl" />
            <div
               className="absolute inset-0 opacity-[0.04]"
               style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 8px)',
               }}
            />
         </div>

         {/* Topo: chip + logo do banco */}
         <div className="relative flex items-start justify-between">
            {/* Chip */}
            <svg width={42} height={32} viewBox="0 0 42 32" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect x="0.5" y="0.5" width="41" height="31" rx="5" fill="url(#chip-gradient)" stroke="#8a6d1f" strokeWidth="0.5" />
               <rect x="0.5" y="10.5" width="41" height="1" stroke="#8a6d1f" strokeOpacity="0.5" />
               <rect x="0.5" y="20.5" width="41" height="1" stroke="#8a6d1f" strokeOpacity="0.5" />
               <rect x="14" y="0.5" width="1" height="31" stroke="#8a6d1f" strokeOpacity="0.5" />
               <rect x="27" y="0.5" width="1" height="31" stroke="#8a6d1f" strokeOpacity="0.5" />
               <rect x="14" y="10.5" width="13" height="10" rx="1.5" fill="url(#chip-gradient)" stroke="#8a6d1f" strokeWidth="0.6" />
               <defs>
                  <linearGradient id="chip-gradient" x1="0" y1="0" x2="42" y2="32" gradientUnits="userSpaceOnUse">
                     <stop stopColor="#f4d374" />
                     <stop offset="0.5" stopColor="#d4af37" />
                     <stop offset="1" stopColor="#a3812a" />
                  </linearGradient>
               </defs>
            </svg>

            {/* Logo do banco */}
            <div className="flex items-center gap-2">
               {bankLogoUrl ? (
                  <Image
                     src={bankLogoUrl}
                     width={58}
                     height={58}
                     alt={bankName}
                     style={{ width: 'auto', height: 'auto' }}
                  />
               ) : (
                  <>
                     <div className="flex items-center justify-center size-7 rounded-full bg-white/10 border border-white/10">
                        <Landmark className="size-3.5 text-white/70" />
                     </div>
                     <span className="text-white/70 text-xs font-semibold tracking-wide uppercase truncate max-w-24">
                        {bankName}
                     </span>
                  </>
               )}
            </div>
         </div>

         {/* Número do cartão */}
         <div className="relative">
            <p className="text-white text-lg sm:text-xl font-mono tracking-widest select-none">
               {maskNumber(accountNumber)}
            </p>
         </div>

         {/* Rodapé: titular */}
         <div className="relative flex items-end justify-between">
            <div className="min-w-0">
               <p className="text-[9px] text-white/40 tracking-widest mb-1">TITULAR</p>
               <p className="text-white text-sm font-medium uppercase truncate max-w-48">
                  {accountName}
               </p>
            </div>
            <CreditCardIcon className="size-6 text-white/30" />
         </div>
      </div>
   );
}

export default CreditCard;