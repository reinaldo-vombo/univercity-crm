
'use client';
import { SessionGuard } from "@/lib/helper/auth/auth-guard";
import SessionWrapper from "./SessionWrapper";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SheetProvider } from "./sheet-provider";
import { DUMMY_DATA } from "@/constants/mock-data";
import { ThemeProvider } from "./theme-provider";
import QueryProvider from "./query-provider";


export default function RootProvider({ children }: { children: React.ReactNode }) {
   return (
      <SessionWrapper>
         <QueryProvider>
            <NuqsAdapter>
               <SessionGuard />
               <ThemeProvider
                  attribute="class"
                  defaultTheme={'system'}
                  enableColorScheme
                  enableSystem
                  disableTransitionOnChange
                  storageKey="theme"
                  themes={DUMMY_DATA.themes}
               >
                  <SheetProvider>
                     {children}
                  </SheetProvider>
               </ThemeProvider>
            </NuqsAdapter>

         </QueryProvider>
      </SessionWrapper>
   )
}
