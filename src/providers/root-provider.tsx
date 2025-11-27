
import SessionWrapper from "./SessionWrapper";
import { SheetProvider } from "./sheet-provider";
import { ThemeProvider } from "./theme-provider";
import { DUMMY_DATA } from "@/constants/mock-data";


export default function RootProvider({ children }: { children: React.ReactNode }) {
   return (
      <SessionWrapper>
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
      </SessionWrapper>
   )
}
