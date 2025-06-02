'use client'
import { Button } from "@/components/ui/button";
import {
   FileUploader,
   FileUploaderContent,
   FileUploaderItem,
   FileInput,
} from "@/components/ui/file-uploader";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";


const Uploader = () => {
   const [files, setFiles] = useState<File[] | null>([]);
   const dropzone = {
      accept: {
         "image/*": [".jpg", ".jpeg", ".png"],
      },
      multiple: true,
      maxFiles: 4,
      maxSize: 1 * 1024 * 1024,
   } satisfies DropzoneOptions;
   return (
      <FileUploader
         value={files}
         onValueChange={setFiles}
         dropzoneOptions={dropzone}
         className="relative max-w-xs space-y-1"
      >
         <FileInput className="border border-dashed border-gray-500">
            <Button variant={"outline"}>Upload a file</Button>
         </FileInput>
         <FileUploaderContent className="h-48 ">
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
