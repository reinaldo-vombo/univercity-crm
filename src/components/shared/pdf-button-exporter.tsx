'use client'

import { useState, ReactElement, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "../ui/button";
import { FileDown } from "lucide-react";

type PDFExporterProps = {
   document: ReactElement<any>;      // <-- aqui entra QUALQUER PDF
   fileName: string;
   label?: string;
   loadingLabel?: string;
};

export function PDFExporter({
   document,
   fileName,
   label = "Baixar PDF",
   loadingLabel = "Gerando PDF...",
}: PDFExporterProps) {

   const [generate, setGenerate] = useState(false);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true)
   }, [])


   if (!isClient) return null;
   return (
      <div>
         {!generate ? (
            <Button
               onClick={() => setGenerate(true)}
               className="btn btn-primary"
            >
               {label}
            </Button>
         ) : (
            <PDFDownloadLink document={document} fileName={fileName}>
               {({ loading }) => (
                  <Button variant="outline" size="sm">
                     <FileDown className="mr-2 h-4 w-4" />
                     {loading ? loadingLabel : "Baixar Arquivo"}
                  </Button>
               )}
            </PDFDownloadLink>
         )}

      </div>
   );
}
