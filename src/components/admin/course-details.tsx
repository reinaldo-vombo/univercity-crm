import { TCourse } from "@/lib/types/global"

type TProps = {
   data: TCourse
}

const CourseDetails = ({ data }: TProps) => {
   const { title, code, credits, } = data;
   return (
      <div>
         <ul className="space-y-4">
            <li>Temporada: <b>{title}</b></li>
            <li>Codigo: <b>{code}</b></li>
            <li>Valor: <b>{credits}</b></li>
         </ul>
      </div>
   )
}

export default CourseDetails
