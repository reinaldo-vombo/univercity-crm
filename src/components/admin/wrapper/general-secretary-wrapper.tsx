import { RequestskSheetTable } from "@/app/(private)/crm/admin/general-secretary/client-table";

import { getAllRequests } from "@/constants/data/secretary";

const GeneralSecretaryWrapper = async () => {
   const request = await getAllRequests()
   return (
      <div>
         <RequestskSheetTable data={request} />
      </div>
   )
}

export default GeneralSecretaryWrapper;
