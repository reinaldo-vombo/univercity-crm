

import { TFaculty } from "@/types/global";
import PersenalInfo from "./persenal-info";
import AcademicInfo from "./academic-info";

type TProps = {
   data: TFaculty
}

const FalcultyDetails = ({ data }: TProps) => {
   return (
      <div>
         <div className="border rounded-lg p-2">
            <div className="grid grid-cols-12 gap-2">
               <PersenalInfo info={data} />
               <AcademicInfo info={data} />
            </div>
         </div>

      </div>
   )
}

export default FalcultyDetails;
