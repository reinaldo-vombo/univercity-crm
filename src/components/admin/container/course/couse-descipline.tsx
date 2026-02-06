'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from '../../../ui/button'
import { ChevronDown, User } from 'lucide-react'
import { Input } from '../../../ui/input'

type TProps = {
   discipline: {
      name: string;
      CourseDisciplineFaculty: {
         faculty: {
            firstName: string;
            lastName: string;
            profileImage: string | null;
         };
      }[];
   } & {
      id: string;
      yearLevel: 'FIRST' | 'SECOND' | 'THIRD' | 'FOURTH' | 'FIFTH';
      courseId: string;
      disciplineId: string;
      semesterId: string;
   }[]
}

const CouseDescipline = ({ discipline }: TProps) => {
   return (
      <div className="py-10">
         <div className="flex justify-between items-center mb-4">
            <Input
               placeholder="Search orders..."
               className="max-w-sm"
            />
            <Button>
               <ChevronDown className="mr-2 h-4 w-4" /> Export
            </Button>
         </div>
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Professors</TableHead>
                  <TableHead>Turno</TableHead>
                  <TableHead>Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {discipline.map((assiment) => (
                  <TableRow key={assiment.id}>
                     <TableCell className="font-medium">Propina</TableCell>
                     <TableCell className="flex">
                        <User className="text-red-500" />
                        <h3></h3>
                     </TableCell>
                     <TableCell>

                     </TableCell>
                     <TableCell>$</TableCell>
                     <TableCell></TableCell>
                     <TableCell className="flex gap-2">
                        {/* View Online */}

                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default CouseDescipline
