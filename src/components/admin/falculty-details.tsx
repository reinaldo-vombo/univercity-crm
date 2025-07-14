
import Avatar from "../sheard/avatar";
import { Separator } from "../ui/separator";

type TProps = {
   data: {
      firstName: string;
      middleName: string | null;
      facultyId: string;
      lastName: string;
      contactNo: string | null;
      email: string | null;
      gender: string;
      profileImage: string;
      shift: string;
      designation: string;
      academicDepartment: string;
   };
}

const FalcultyDetails = ({ data }: TProps) => {
   const { firstName, middleName, lastName, contactNo, facultyId, email, gender, profileImage, shift, designation, academicDepartment } = data;
   const name = `${firstName} ${lastName}`;
   console.log(data);

   return (
      <div>
         <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <Avatar name={name} photo={profileImage} className="size-28" />
            <h2>{firstName} {middleName} {lastName}</h2>
            <Separator />
         </div>
         <div className="space-y-4">
            <span>Informações:</span>
            <ul className="space-y-6">
               <li>Email: <b>{email}</b></li>
               <li>Número: <b>{facultyId}</b></li>
               <li>Telefone: <b>{contactNo}</b></li>
               <li>Género: <b>{gender.toUpperCase()}</b></li>
               <li>turno: <b>{shift === "MORNING" ? "Manha" : "Tarde"}</b></li>
               <li>Departamento: <b>{academicDepartment}</b></li>
               <li>Designação: <b>{designation}</b></li>
            </ul>
         </div>
      </div>
   )
}

export default FalcultyDetails;
