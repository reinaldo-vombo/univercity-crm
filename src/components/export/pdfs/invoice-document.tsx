'use client'
import { StyleSheet, Document, Page, View, Image, Text } from "@react-pdf/renderer"
import { formatCurrency } from "@/lib/helper";
import Link from "next/link";

export type ReceiptProps = {
   receiptNumber: string;
   semesterYear?: string;
   student: {
      name: string;
      course: string;
      year: string;
      email: string;
      phone: number;
   };
   qrCodeUrl?: string;
   payments: Array<{
      id: number;
      academicYear: string;
      service: string;
      description: string;
      amount: number;
      currency: string;
      status: string;
   }>;
   totals: {
      totalPaid: number;
      balance: number;
   };
};

const styles = StyleSheet.create({
   page: {
      padding: 40,
      fontSize: 11,
      fontFamily: "Helvetica",
      color: "#333"
   },
   header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 20,
      borderBottom: "1 solid #444",
      paddingBottom: 8
   },
   th: {
      flex: 1,
      padding: 4,
      fontWeight: "bold",
      fontSize: 10,
   },
   td: {
      flex: 1,
      padding: 4,
      fontSize: 10,
   },
   logo: {
      width: 60,
      height: 60
   },
   institution: {
      textAlign: "right"
   },
   title: {
      fontSize: 16,
      textAlign: "center",
      marginVertical: 10,
      fontWeight: "bold"
   },
   section: {
      marginVertical: 10
   },
   label: {
      fontWeight: "bold",
      color: "#555"
   },
   row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4
   },
   tableHeader: {
      flexDirection: "row",
      backgroundColor: "#f3f4f6",
      borderBottom: "1 solid #ccc"
   },
   summary: {
      marginTop: 12,
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 8,
      backgroundColor: "#f3f4f6",
      borderRadius: 4
   },
   table: {
      marginTop: 10,
      border: "1 solid #ccc",
   },
   footer: {
      marginTop: 30,
      textAlign: "center",
      fontSize: 9,
      color: "grey"
   },
   footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginTop: 30,
   },
   qrCode: {
      width: 80,
      height: 80,
   },
})

const InvoiceDocument = ({ qrCodeUrl, semesterYear, payments, receiptNumber, student, totals }: ReceiptProps) => {

   return (
      <Document>
         <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
               <Image src={'/logo.svg'} style={styles.logo} />
               <View style={styles.institution}>
                  <Text>{process.env.NEXT_APP_SITE_NAME}</Text>
               </View>
            </View>

            {/* Title */}
            <Text style={styles.title}>Recibo de Pagamento – Ano Lectivo {semesterYear?.slice(0, 4) || '2024/2025'}</Text>

            {/* Student Info */}
            <View style={styles.section}>
               <View style={styles.row}>
                  <Text style={styles.label}>Recibo Nº:</Text>
                  <Text>{receiptNumber}</Text>
               </View>
               <View style={styles.row}>
                  <Text style={styles.label}>Nome:</Text>
                  <Text>{student.name}</Text>
               </View>
               <View style={styles.row}>
                  <Text style={styles.label}>Curso:</Text>
                  <Text>{student.course}</Text>
               </View>
               <View style={styles.row}>
                  <Text style={styles.label}>Ano:</Text>
                  <Text>{student.year}</Text>
               </View>
               <View style={styles.row}>
                  <Text style={styles.label}>Telefone:</Text>
                  <Text>{student.phone}</Text>
               </View>
               <View style={styles.row}>
                  <Text style={styles.label}>Email:</Text>
                  <Text>{student.email}</Text>
               </View>
            </View>

            {/* Payments Table */}
            <View style={styles.section}>
               <Text style={styles.label}>Descrição de Pagamentos</Text>
               <View style={styles.table}>
                  <View style={styles.tableHeader}>
                     <Text style={styles.th}>Ord.</Text>
                     <Text style={styles.th}>Ano</Text>
                     <Text style={styles.th}>Serviço</Text>
                     <Text style={styles.th}>Descrição</Text>
                     <Text style={styles.th}>Valor</Text>
                     <Text style={styles.th}>Moeda</Text>
                     <Text style={styles.th}>Estado</Text>
                  </View>
                  {payments.map((p) => (
                     <View style={styles.row} key={p.id}>
                        <Text style={styles.td}>{p.id}</Text>
                        <Text style={styles.td}>{p.academicYear}</Text>
                        <Text style={styles.td}>{p.service}</Text>
                        <Text style={styles.td}>{p.description}</Text>
                        <Text style={styles.td}>{formatCurrency(p.amount)} {p.currency}</Text>
                        <Text style={styles.td}>{p.currency}</Text>
                        <Text style={styles.td}>{p.status}</Text>
                     </View>
                  ))}
               </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.section}>
               <Text style={styles.label}>Formas de Pagamento</Text>
               <View style={styles.table}>
                  <View style={styles.tableHeader}>
                     <Text style={styles.th}>Data</Text>
                     <Text style={styles.th}>Método</Text>
                     <Text style={styles.th}>Referência</Text>
                     <Text style={styles.th}>Valor</Text>
                     <Text style={styles.th}>Moeda</Text>
                     <Text style={styles.th}>Estado</Text>
                  </View>
                  <View style={styles.row} >
                     <Text style={styles.td}>10/10/2025</Text>
                     <Text style={styles.td}>Recibo</Text>
                     <Text style={styles.td}>348976</Text>
                     <Text style={styles.td}>{formatCurrency(40000)}</Text>
                     <Text style={styles.td}>AOA</Text>
                     <Text style={styles.td}>Pago</Text>
                  </View>
               </View>
            </View>

            {/* Summary */}
            <View style={styles.summary}>
               <Text style={styles.label}>Total Pago: {formatCurrency(totals.totalPaid)} AOA</Text>
               <Text style={styles.label}>Saldo: {formatCurrency(totals.balance)} AOA</Text>
            </View>

            {/* Footer with QR */}
            <View style={styles.footerRow}>
               <Text style={styles.footer}>
                  Este recibo foi gerado automaticamente. Para verificar a autenticidade, utilize o QR code.
               </Text>
               {qrCodeUrl ? <Image src={qrCodeUrl} style={styles.qrCode} /> : <Link href={'#'}>Ver codigo QR</Link>}
            </View>
         </Page>
      </Document>
   )
}

export default InvoiceDocument
