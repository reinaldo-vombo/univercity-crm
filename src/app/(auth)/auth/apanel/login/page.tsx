import AdminLogin from "@/components/forms/admin/log-in";

export default function AdminLoginPage() {
   return (
      <div className="col-span-3 px-5 my-auto">
         <div className="flex items-center justify-center">
            <h2 className="font-bold text-3xl">Admin</h2>
         </div>
         <AdminLogin />
      </div>
   )
}
