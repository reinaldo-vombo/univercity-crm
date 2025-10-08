import InvoiceView from "@/components/container/receipt/invoice-view";
type TSeachParams = {
   params: Promise<{ id: string }>
}

const payment = {
   id: '1',
   customerName: "Reinaldo Álvaro João Vombo",
   customerEmail: "realvaro@outlook.com",
   amount: 45000,
   date: "2025-03-17",
};
export default async function InvoicePage({ params }: TSeachParams) {
   const { id } = await params
   return <InvoiceView payment={payment} id={id} />
}
