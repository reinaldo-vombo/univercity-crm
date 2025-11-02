import { TFaculty } from "@/types/global"
import { Building, MailCheck, PersonStanding, PhoneCall, SunMoon } from "lucide-react"
type TProps = {
   info: TFaculty
}
const AcademicInfo = ({ info }: TProps) => {
   const { academicDepartment, shift, contactNo, email } = info;
   const department: any = academicDepartment
   return (
      <div className="col-span-6">
         <ul className="text-foreground space-y-6">
            <li className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <Building className="size-6" />
                  <span>Departamento</span>
               </div>
               <span>{department}</span>
            </li>
            <li className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <PersonStanding className="size-6" />
                  <span>Cargo</span>
               </div>
               <span>Professor</span>
            </li>
            <li className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <SunMoon className="size-6" />
                  <span>Periodo</span>
               </div>
               <span>{shift.name}</span>
            </li>
            <li className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <PhoneCall className="size-6" />
                  <span>Telefone</span>
               </div>
               <span><b>(+244) </b>{contactNo}</span>
            </li>
            <li className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <MailCheck className="size-6" />
                  <span>Email</span>
               </div>
               <span>{email}</span>
            </li>
         </ul>
      </div>
   )
}

export default AcademicInfo
