import { File } from "lucide-react";

type TProps = {
   biFile?: string;
   gradeDeclarationFile?: string
}
const DocumentsPreview = ({ biFile = '/agradecimento.pdf', gradeDeclarationFile = '/agradecimento.pdf' }: TProps) => {
   return (
      <div className="grid grid-cols-12 gap-4 h-96">
         <div className="col-span-6 rounded-md border border-dashed shadow">
            <iframe src={biFile} width={'100%'} height={'100%'}></iframe>
         </div>
         <div className="col-span-6 rounded-md border border-dashed shadow">
            {gradeDeclarationFile ? (
               <iframe src={biFile} width={'100%'} height={'100%'}></iframe>
            ) : <File className="text-slate-200 size-9" />}
         </div>
      </div>
   )
}

export default DocumentsPreview;
