'use client'

import { ChangeEvent, useState } from "react";
import Card from "@/components/shared/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES } from "@/constants/mock-data";
import { User } from "lucide-react";
import Link from "next/link";

const GetStudentPayments = () => {
   const [studentNumber, setStudentNumber] = useState('')
   function searchStudent(event: ChangeEvent<HTMLInputElement>) {
      setStudentNumber(event.target.value)
   }
   return (
      <div className="w-[38rem] m-auto">
         <Card lable="Informações financera do aluno" showTitle={true}>
            <div className="flex items-center justify-center">
               <User />
            </div>
            <div className="space-y-4 mb-6">
               <Label>Número do estudante</Label>
               <Input placeholder="Ex: 20208965" onChange={(e) => searchStudent(e)} />
            </div>
            <div className="flex">
               <Link href={`${ROUTES.DASHBOARD}/finance/payments/${studentNumber}`} className="bg-primary m-auto text-black rounded-md text-center p-2">
                  Buscar
               </Link>
            </div>
         </Card>
      </div>
   )
}

export default GetStudentPayments;
