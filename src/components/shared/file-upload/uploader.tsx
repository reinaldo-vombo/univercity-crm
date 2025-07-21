'use client'
import { Button } from "@/components/ui/button";
import {
   FileUploader,
   FileUploaderContent,
   FileUploaderItem,
   FileInput,
} from "@/components/ui/file-uploader";
import { Upload } from "lucide-react";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";

type TUploaderProps = {
   field: any;
   multiple?: boolean;
   maxFiles?: number;
}
const Uploader = ({ field, multiple = false, maxFiles = 4 }: TUploaderProps) => {
   const [files, setFiles] = useState<File[]>(
      Array.isArray(field.value) ? field.value : field.value ? [field.value] : []
   );
   const handleChange = (newFiles: File[] | null) => {
      const file = newFiles?.[0] ?? null;
      setFiles(file ? [file] : []);
      field.onChange(file);
   };

   // const handleRemove = (index: number) => {
   //    const updated = [...files];
   //    updated.splice(index, 1);
   //    handleChange(updated);
   // };
   const dropzone = {
      accept: {
         "image/*": [".jpg", ".jpeg", ".png"],
      },
      multiple,
      maxFiles,
      maxSize: 1 * 1024 * 1024,
   } satisfies DropzoneOptions;
   return (
      <FileUploader
         value={files}
         onValueChange={handleChange}
         dropzoneOptions={dropzone}
         className="relative max-w-xs space-y-1"
      >
         <FileInput className="border border-dashed flex justify-center border-gray-500 p-1">
            <Button type="button" variant={"outline"} className="w-full">
               <Upload />
               <span>Carregar arquivo</span>
            </Button>
         </FileInput>
         <FileUploaderContent >
            {files?.map((file, i) => (
               <FileUploaderItem key={i} index={i}>
                  {file.name}
               </FileUploaderItem>
            ))}
         </FileUploaderContent>
      </FileUploader>
   )
}

export default Uploader
