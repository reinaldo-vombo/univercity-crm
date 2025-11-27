"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

interface PdfTableDocumentProps<T extends object> {
   data: T[];
   headers: Record<keyof T, string>;
   institution: {
      name: string;
      email: string;
      logoUrl: string; // URL pública ou base64
   };
}

// --- Estilos PDF ---
const styles = StyleSheet.create({
   page: {
      padding: 32,
      fontSize: 11,
      fontFamily: "Helvetica",
   },
   header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      gap: 12,
   },
   logo: {
      width: 60,
      height: 60,
      objectFit: "contain",
   },
   institutionInfo: {
      flexDirection: "column",
   },
   title: {
      fontSize: 18,
      marginBottom: 16,
      fontWeight: "bold",
   },
   table: {
      width: "100%",
      borderWidth: 1,
      borderColor: "#ccc",
   },
   tableRow: {
      flexDirection: "row",
   },
   tableHeaderCell: {
      flex: 1,
      backgroundColor: "#f3f3f3",
      padding: 6,
      borderRightWidth: 1,
      borderRightColor: "#ddd",
      fontWeight: "bold",
   },
   tableCell: {
      flex: 1,
      padding: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      borderRightWidth: 1,
      borderRightColor: "#eee",
   },
});

export default function PdfTableDocument<T extends object>({
   data,
   headers,
   institution,
}: PdfTableDocumentProps<T>) {
   const headerKeys = Object.keys(headers) as (keyof T)[];

   return (
      <Document>
         <Page size="A4" style={styles.page}>

            {/* LOGO + INFO */}
            <View style={styles.header}>
               <Image style={styles.logo} src={institution.logoUrl} />
               <View style={styles.institutionInfo}>
                  <Text>{process.env.NEXT_APP_SITE_NAME}</Text>
                  <Text>{process.env.NEXT_PUBLIC_AUTHOR_NAME}</Text>
               </View>
            </View>

            {/* TÍTULO */}
            <Text style={styles.title}>Lista Exportada</Text>

            {/* TABELA */}
            <View style={styles.table}>
               {/* Cabeçalho */}
               <View style={styles.tableRow}>
                  {headerKeys.map((key) => (
                     <Text key={String(key)} style={styles.tableHeaderCell}>
                        {headers[key]}
                     </Text>
                  ))}
               </View>

               {/* Dados */}
               {data.map((row, i) => (
                  <View key={i} style={styles.tableRow}>
                     {headerKeys.map((key) => (
                        <Text key={String(key)} style={styles.tableCell}>
                           {String(row[key])}
                        </Text>
                     ))}
                  </View>
               ))}
            </View>
         </Page>
      </Document>
   );
}
