import GetStudentPayments from "@/components/forms/post/get-payment";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Pagamentos'
}
export default function Payments() {
  return (
    <section className="col-span-12 flex h-screen">
      <GetStudentPayments />
    </section>
  )
}
