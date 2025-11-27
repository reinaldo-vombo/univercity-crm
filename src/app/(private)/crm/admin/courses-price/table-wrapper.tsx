
import { getAllPrice } from "@/services/data/prices";
import { CoursesPriceTable } from "./client-table";


export async function CoursesPricingTableServer() {

   const prices = await getAllPrice()

   return <CoursesPriceTable prices={prices} />;
}
