'use client'

import dynamic from "next/dynamic";
import Modal from "@/components/shared/Modal";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/lib/helper";
import { TDocumentType } from "@/types/enum";
import { TStudentDocuments } from "@/types/global";
import { Pen } from "lucide-react";
import FormLoading from "@/components/skeleton/form";
const ReviewDocumentForm = dynamic(() => import("@/components/forms/admin/update/review-document"),
   { ssr: false, loading: () => <FormLoading /> })

type TProps = {
   data: TStudentDocuments[]
}
const showDocType = (docType: TDocumentType) => {
   const type = docType === 'BI' ? 'Bilhete de indentidade' : docType === 'CERTIFICATE' ? 'Certificado' : docType === 'GRADE_DECLARATION' ? 'Declaração de Notas' : 'Outros';

   return type;
}
const DocumentsPreview = ({ data }: TProps) => {
   return (
      <div className="grid grid-cols-12 gap-4">
         {data.length > 0 ? data.map((doc) => (
            <div className="col-span-6 rounded-md border border-dashed shadow space-y-4" key={doc.id}>
               <div className=" h-[30rem]">
                  <iframe src={doc.fileUrl} width={'100%'} height={'100%'}></iframe>

               </div>
               <div className="p-4">
                  <ul className="space-y-4">
                     <li className="space-x-3">
                        <b>Tipo:</b>
                        <span>{showDocType(doc.type)}</span>
                     </li>
                     <li className="space-x-3">
                        <b>Stado:</b>
                        <Badge variant={doc.status === 'REJECTED' ? 'destructive' : 'default'}>
                           {doc.status === 'APPROVED' ? 'APROVADO' : 'REJEITADO'}
                        </Badge>
                     </li>
                     <li className="space-x-3">
                        <b>Revisado por:</b>
                        <span>{doc.reviewedBy} - {formatTimeAgo(doc.reviewedAt || '')}</span>
                     </li>
                  </ul>
                  <Modal
                     title={showDocType(doc.type)}
                     description="Atualização do documento"
                     trigger={<div className="border rounded-md p-2 cursor-pointer"><Pen className="size-4" /></div>}>
                     {doc.rejectedReason ? (
                        <>
                           <div className="space-y-3">
                              <h2>Motivo da rejeição:</h2>
                              <p className="text-red-300">``{doc.rejectedReason}``</p>
                           </div>
                           <ReviewDocumentForm />
                        </>
                     ) : null}
                  </Modal>
               </div>
            </div>
         )) : <p>Sem documentos enviados</p>}

      </div>
   )
}

export default DocumentsPreview;
