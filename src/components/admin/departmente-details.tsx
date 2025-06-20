import { TAcademicFaculty, TDepartemant, TUser } from "@/lib/types/global"

type TProps = {
   users: TUser[]
   department: TDepartemant
   academicFaculty: TAcademicFaculty[]
}
const DepartmenteDetails = ({ users, academicFaculty, department }: TProps) => {
   const departmentHead = users.filter((user) => user.id === department.departmentHeadId)
   const faculty = academicFaculty.filter((faculty) => faculty.id === department.academicFacultyId)

   return (
      <div>
         <ul className="space-y-4">
            <li>Titulo: <b>{department.title}</b></li>
            <li>Unidade Acadêmica: <b>{faculty[0].title}</b></li>
            <li>Director: <b>{departmentHead[0].name}</b></li>
         </ul>
      </div>
   )
}

export default DepartmenteDetails
