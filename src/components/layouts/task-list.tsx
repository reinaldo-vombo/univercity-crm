import { TriangleAlert } from "lucide-react";
import { ProgressBage } from "../shared/bages";

const TaskList = () => {
   return (
      <div className="grid space-y-4">
         <div className="flex gap-4">
            <div className="bg-amber-400 rounded-md p-2 flex w-12">
               <TriangleAlert className="text-amber-700 m-auto" />
            </div>
            <div>
               <h2 className="font-semibold text-2xl line-clamp-1">Assing teacher to curse</h2>
               <ProgressBage title="Urgente" />
            </div>
         </div>
         <div className="flex gap-4">
            <div className="bg-amber-400 rounded-md p-2 flex w-12">
               <TriangleAlert className="text-amber-700 m-auto" />
            </div>
            <div>
               <h2 className="font-semibold text-2xl line-clamp-1">Create a new Departament for Engeneri</h2>
               <ProgressBage title="Urgente" />
            </div>
         </div>
      </div>
   )
}

export default TaskList;
