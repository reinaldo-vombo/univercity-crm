import { TFaculty } from "@/lib/types/global"
import Avatar from "../sheard/avatar";
import { Separator } from "../ui/separator";

type TProps = {
   data: TFaculty
}

const StudentDetails = ({ data }: TProps) => {
   const { firstName, middleName, lastName, contactNo, email, gender, profileImage, shift, designation, academicDepartment } = data;
   const name = `${firstName} ${lastName}`;
   return (
      <div>
         <div className="flex flex-col items-center justify-center gap-3">
            <Avatar name={name} photo={profileImage} />
            <h2>{firstName} {middleName} {lastName}</h2>
            <Separator />
         </div>
         <div className="space-y-4">
            <span>Informações:</span>
            <ul className="flex items-center justify-between">
               <li>Email: <b>{email}</b></li>
               <li>Telefone: <b>{contactNo}</b></li>
            </ul>
            <ul className="flex items-center justify-between">
               <li>Género: <b>{gender}</b></li>
               <li>turno: <b>{shift}</b></li>
            </ul>
            <ul className="flex items-center justify-between">
               <li>Departamento: <b>{academicDepartment.title}</b></li>
               <li>Designação: <b>{designation}</b></li>
            </ul>
         </div>
      </div>
   )
}

export default StudentDetails;
