'use client'
import { createContext, ReactNode, useContext, useState } from 'react';

type TSheetContextType = {
   openSheetId: string | null;
   open: (id: string) => void;
   close: () => void;
}

const SheetContext = createContext<TSheetContextType | null>(null);

export function SheetProvider({ children }: { children: ReactNode }) {
   const [openSheetId, setOpenSheetId] = useState<string | null>(null);

   return (
      <SheetContext.Provider
         value={{
            openSheetId,
            open: (id) => setOpenSheetId(id),
            close: () => setOpenSheetId(null),
         }}
      >
         {children}
      </SheetContext.Provider>
   )
}

export const useSheet = () => {
   const ctx = useContext(SheetContext);
   if (!ctx) throw new Error("useSheet must be inside <SheetProvider>");
   return ctx;
}