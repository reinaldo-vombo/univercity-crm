
import { ArrowRight, Building, EqualNotIcon, Hash, Mail, Phone, Sun } from "lucide-react";
import Avatar from "../../shared/avatar";
import { Separator } from "../../ui/separator";

// type TProps = {
//    data: {
//       firstName: string;
//       middleName: string | null;
//       facultyId: string;
//       lastName: string;
//       contactNo: string | null;
//       email: string | null;
//       gender: string;
//       profileImage: string;
//       shift: string;
//       designation: string;
//       academicDepartment: string;
//    };
// }

const FalcultyDetails = ({ data }: any) => {
   const { firstName, middleName, lastName, contactNo, facultyId, email, gender, profileImage, shift, designation, academicDepartment } = data;
   const name = `${firstName} ${lastName}`;

   return (
      <div>
         <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <Avatar name={name} photo={profileImage || '/default.jpeg'} className="size-28" />
            <h2>{firstName} {middleName} {lastName}</h2>
            <Separator />
         </div>
         <ul className="space-y-6">
            <li>Email:<div className='rounded-md border p-2 flex gap-2 items-center'>
               <Mail className='text-red-500 size-4' /><b>{email}</b>
            </div> </li>
            <li>Número:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Hash className='text-orange-500 size-4' /><b>{facultyId}</b>
               </div>
            </li>
            <li>Telefone:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Phone className='text-blue-500 size-4' /><b>{contactNo}</b>
               </div>
            </li>
            <li>Género:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <EqualNotIcon className='text-pink-500 size-4' />{gender.toUpperCase()}
               </div>
            </li>
            <li>turno:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Sun className='text-yellow-500 size-4' /><b>{shift === "MORNING" ? "Manha" : "Tarde"}</b>
               </div>
            </li>
            <li>Departamento:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <Building className='text-green-500 size-4' /> <b>{academicDepartment}</b>
               </div>
            </li>
            <li>Designação:
               <div className='rounded-md border p-2 flex gap-2 items-center'>
                  <ArrowRight className='text-green-500 size-4' /> <b>{designation}</b>
               </div>
            </li>
            <li>Desciplinas: <b>Matematica</b> <b>Eletronica</b></li>
         </ul>
      </div>
   )
}

export default FalcultyDetails;
