export interface InvoiceClassicData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  payerName: string;
  subtitle: string;
  payerAddress: string;
  payerEmail: string;
  billTo: {
    name: string;
    address: string;
    email: string;
    phone: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
  }[];
  summary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  paymentTerms: {
    dueDate: string;
    method: string;
    gst: string;
  };
  notes?: string;
}
