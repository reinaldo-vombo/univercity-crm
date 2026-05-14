
import { SessionGuard } from "@/lib/helper/auth/auth-guard";
import SessionWrapper from "./SessionWrapper";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SheetProvider } from "./sheet-provider";
import { ThemeProvider } from "./theme-provider";
import { DUMMY_DATA } from "@/constants/mock-data";


export default function RootProvider({ children }: { children: React.ReactNode }) {
   return (
      <SessionWrapper>
         <NuqsAdapter>
            <SessionGuard />
            <ThemeProvider
               attribute="class"
               defaultTheme='dafault'
               enableColorScheme
               enableSystem
               disableTransitionOnChange
               themes={DUMMY_DATA.themes}>
               <SheetProvider>
                  {children}
               </SheetProvider>
            </ThemeProvider>
         </NuqsAdapter>
      </SessionWrapper>
   )
}
