'use client'

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown } from "lucide-react"
import { useState, useEffect } from "react";
import QRCode from "qrcode";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GradesDocument } from "@/components/container/receipt/grades-document";

const GRADES = [
   { id: 1, descipline: 'Programação IV', value: 10, mac: 10, cpf: 9, cae: 8, exa: 7.5, cfe: 6, rec: 10 },
   { id: 2, descipline: 'Algoritimos E Estrutura De Dadodos', value: 12, mac: 10, cpf: 10, cae: 10, exa: 10, cfe: 10, rec: 10 },
   { id: 3, descipline: 'Sistemas Operativo', value: 4, mac: 10, cpf: 10, cae: 10, exa: 10, cfe: 10, rec: 10 },
   { id: 4, descipline: 'Engenharia E Analise De Software', value: 13, mac: 10, cpf: 10, cae: 10, exa: 10, cfe: 10, rec: 10 },
   { id: 5, descipline: 'Redes De Computadores I', value: 7.5, mac: 10, cpf: 10, cae: 10, exa: 10, cfe: 10, rec: 10 },
   { id: 6, descipline: 'Base De Dados II', value: 10, mac: 10, cpf: 10, cae: 10, exa: 10, cfe: 10, rec: 10 },
]

const GradeTable = () => {
   const [qrCodeUrl, setQrCodeUrl] = useState("");
   const [generatePdfFile, setGeneratePdfFile] = useState(false);

   useEffect(() => {
      const generateQr = async () => {
         const url = await QRCode.toDataURL("https://yourapp.com/grades/12345");
         setQrCodeUrl(url);
      };
      generateQr();
   }, []);

   return (
      <div className="py-10">
         <div className="mb-4">
            {!generatePdfFile ? (
               <Button onClick={() => setGeneratePdfFile(true)}>
                  <ChevronDown className="mr-2 h-4 w-4" /> Export
               </Button>
            ) : (
               <>
                  {qrCodeUrl && (
                     <PDFDownloadLink
                        document={
                           <GradesDocument
                              student={{
                                 name: "Reinaldo Álvaro João Vombo",
                                 course: "Licenciatura em Ciências da Computação",
                                 year: "2º Ano",
                                 email: "realvaro@outlook.com",
                                 phone: "927603115",
                              }}
                              grades={GRADES}
                              logoUrl="/logo.png"
                              qrCodeUrl={qrCodeUrl}
                           />
                        }
                        fileName="historico-notas.pdf"
                     >
                        {({ loading }) => (
                           <Button>
                              <ChevronDown className="mr-2 h-4 w-4" />
                              {loading ? "Gerando..." : "Exportar Histórico"}
                           </Button>
                        )}
                     </PDFDownloadLink>
                  )}
               </>
            )}
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Desciplinas</TableHead>
                  <TableHead>MACs(PP1)</TableHead>
                  <TableHead>CPF(PP2)</TableHead>
                  <TableHead>CAE(M.C)</TableHead>
                  <TableHead>EXA</TableHead>
                  <TableHead>CFE(M.E)</TableHead>
                  <TableHead>RECURSO</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {GRADES.map((grade) => (
                  <TableRow key={grade.id}>
                     <TableCell className="font-medium">{grade.descipline}</TableCell>
                     <TableCell><b>{grade.mac}</b></TableCell>
                     <TableCell><b>{grade.cpf}</b></TableCell>
                     <TableCell><b>{grade.cae}</b></TableCell>
                     <TableCell><b>{grade.exa}</b></TableCell>
                     <TableCell><b>{grade.cfe}</b></TableCell>
                     <TableCell><b>{grade.rec}</b></TableCell>

                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default GradeTable
