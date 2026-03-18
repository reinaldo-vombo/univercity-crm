import { getAcademicServices } from "@/services/data/university-config"

export default async function ServiceWrapper() {
   const services = await getAcademicServices()
   return (
      <div>
         <ul>
            {services.length > 0 ? services.map((service) => (
               <li key={service.id} className="flex items-center justify-between">
                  <span>{service.title}</span>
                  <b>{service.price.amount}</b>
               </li>
            )) : <p>Sem Serviços</p>}
         </ul>
      </div>
   )
}
