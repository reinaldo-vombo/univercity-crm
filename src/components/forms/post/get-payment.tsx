'use client'

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/mock-data";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

const GetStudentPayments = () => {
   const [studentNumber, setStudentNumber] = useState('')
   function searchStudent(event: ChangeEvent<HTMLInputElement>) {
      setStudentNumber(event.target.value)
   }
   return (
      <div>
         <div className="flex items-center justify-center">
            <div className="space-y-4">
               <div className="space-y-4">
                  <Label>Número do estudante</Label>
                  <Input placeholder="Ex: 20208965" onChange={(e) => searchStudent(e)} />
               </div>
               <div>
                  <Link href={`/${ROUTES.DASHBOARD}/invoice/${studentNumber}`} className="bg-primary rounded-md text-center p-2">
                     Buscar
                  </Link>
               </div>
            </div>
         </div>
      </div>
   )
}

export default GetStudentPayments;
