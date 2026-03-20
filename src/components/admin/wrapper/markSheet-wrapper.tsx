import { getMockMarkSheet } from "@/constants/data/student"
import { MarkSheetView } from "../container/student/mark-sheet-view";
type TProps = {
   studentId: string;
   year: number;
   semester: '1º Semestre' | '2º Semestre'
}

const MarkSheetWrapper = async ({ studentId, semester, year }: TProps) => {
   const data = await getMockMarkSheet(studentId, year, semester)
   return (
      <MarkSheetView data={data} />
   )
}

export default MarkSheetWrapper;
