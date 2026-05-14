

import { AtaGenerator } from "@/components/admin/container/retake/ata-generator";
import { RetakeExameTable } from "./client-table";
import { getAllAtaDataByCourse, getAllRetakes, getRetakeAtaData, getRetakeSectionsByDiscipline } from "@/constants/data/retake";
import { TabsNav } from "@/components/shared/toggle-tabs";

export async function RetakeExameTableServer() {

   const exames = await getAllRetakes()
   const atasData = await getRetakeAtaData()
   const sections = await getRetakeSectionsByDiscipline()
   const disciplines = await getAllAtaDataByCourse()
   const tabs = [
      {
         id: '1',
         lable: 'Lista dos recursos',
         value: 'rules',
         tabContent: <RetakeExameTable exames={exames} />,
         description: 'Listagem dos recursos'
      },
      {
         id: '2',
         lable: 'Atas do Exame de recurso',
         value: 'atas',
         tabContent: <AtaGenerator
            sections={sections}
            data={atasData}
            disciplines={disciplines}
            courseName="Ciencia da Computação"
            academicSemesterId={atasData?.semester?.id || ''} />,
         description: ''
      },
   ]

   return <TabsNav defaultValue={tabs[0].value} tabList={tabs} />;
}
