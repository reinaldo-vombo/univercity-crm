import { TUser } from "@/types/global"
import Link from "next/link";

type TProps = {
   data: {
      academicFaculty: string;
      director: TUser | undefined;
      id: string;
      title: string;
      createdAt?: Date;
      updatedAt?: Date;
      academicFacultyId: string;
      departmentHeadId: string | null;
   }
}
const DepartmenteDetails = ({ data }: TProps) => {
   const { academicFaculty, title, director } = data

   return (
      <div className="mt-6">
         <ul className="space-y-4">
            <li>Titulo: <b>{title}</b></li>
            <li>Unidade Acadêmica: <b>{academicFaculty}</b></li>
            <li>Director Geral: <b><Link href={'#'} prefetch={false}>{director?.name}</Link></b></li>
            <li>Cursos: <b>5</b></li>
            <li>professores: <b>20</b></li>
            <li>Alunos: <b>200</b></li>
            <li>Orçamento Total: <b>200.000$</b></li>
         </ul>
      </div>
   )
}

export default DepartmenteDetails
