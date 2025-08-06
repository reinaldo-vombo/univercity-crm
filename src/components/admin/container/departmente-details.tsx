import { TUser } from "@/types/global"

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
      <div>
         <ul className="space-y-4">
            <li>Titulo: <b>{title}</b></li>
            <li>Unidade Acadêmica: <b>{academicFaculty}</b></li>
            <li>Director: <b>{director?.name}</b></li>
         </ul>
      </div>
   )
}

export default DepartmenteDetails
