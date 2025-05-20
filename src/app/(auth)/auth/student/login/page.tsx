import StudentLogin from "@/components/forms/studente/log-in";


export default function StudentLoginPage() {
   return (
      <div className="col-span-3 px-5 my-auto">
         <div className="flex items-center justify-center">
            <h2 className="font-bold text-3xl">Entra</h2>
         </div>
         <StudentLogin />
      </div>
   )
}
