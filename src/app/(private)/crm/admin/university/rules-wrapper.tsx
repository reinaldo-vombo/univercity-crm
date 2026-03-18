import { getUniversityRules } from "@/services/data/university-config"

export default async function RulesWrapper() {
   const rules = await getUniversityRules()
   return (
      <div>
         <ul>
            <li>{rules.allowRetryOnlyIfFailed}</li>
            <li>{rules.allowSpecialExamOnlyForFinalYear}</li>
            <li>{rules.blockEnrollmentIfDebt}</li>
            <li>{rules.blockIfPendingResult}</li>
            <li>{rules.gradeSubmissionUpdate}</li>
            <li>{rules.maxExamAttemptsPerYear}</li>
            <li>{rules.maxExamAttemptsTotal}</li>
            <li>{rules.maxFailedSubjectsToProgress}</li>
            <li>{rules.maxSubjectsInResit}</li>
         </ul>
      </div>
   )
}
