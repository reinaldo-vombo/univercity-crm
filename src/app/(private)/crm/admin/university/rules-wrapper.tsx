
import { UniversityConfigForm } from "@/components/forms/admin/update/university-config-form"
import { getUniversityRules } from "@/services/data/university-config"

export default async function RulesWrapper() {
   const rules = await getUniversityRules()
   return (
      <div>
         <UniversityConfigForm defaultValues={rules} />
      </div>
   )
}
