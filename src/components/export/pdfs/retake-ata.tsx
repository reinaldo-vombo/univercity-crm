// components/pdf/RetakeAtaPDF.tsx
import { AtaStudent, Semester, TAtaDiscipline } from "@/types/global";
import {
   Document, Page, Text, View, StyleSheet, Image, Font,
} from "@react-pdf/renderer";
import { clientEnv } from '@/config/env/client'
// import { TRetakeAta } from "@/types/global";

Font.register({
   family: "Inter",
   fonts: [
      { src: "/fonts/Inter_18pt-Regular.ttf" },
      { src: "/fonts/Inter_24pt-Bold.ttf", fontWeight: "bold" },
   ],
});

const styles = StyleSheet.create({
   page: {
      fontFamily: "Inter",
      paddingTop: 40,
      paddingBottom: 60,
      paddingHorizontal: 40,
      fontSize: 10,
      color: "#1a1a1a",
   },

   // ── Cabeçalho ──────────────────────────────────────────────
   header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 24,
      paddingBottom: 16,
      borderBottom: "2px solid",
   },
   logo: {
      width: 56,
      height: 56,
   },
   headerText: {
      // marginLeft: 14,
      flex: 1,
   },
   institutionName: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: 'center'
   },
   email: {
      fontSize: 10,
      fontWeight: "bold",
      textAlign: 'center'
   },
   institutionSub: {
      fontSize: 17,
      fontWeight: "bold",
      textAlign: 'center',
      textTransform: 'uppercase',
      marginTop: 2,
   },

   // ── Título da ata ───────────────────────────────────────────
   titleBlock: {
      alignItems: "center",
      marginBottom: 20,
   },
   ataLabel: {
      fontSize: 8,
      color: "#888",
      letterSpacing: 2,
      textTransform: "uppercase",
      marginBottom: 4,
   },
   ataTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1a1a1a",
   },
   ataDiscipline: {
      fontSize: 12,
      marginTop: 4,
   },

   // ── Info do exame ───────────────────────────────────────────
   infoGrid: {
      flexDirection: "row",
      gap: 16,
      marginBottom: 20,
      padding: 12,
      backgroundColor: "#f5f3ff",
      borderRadius: 6,
   },
   infoItem: {
      flex: 1,
   },
   infoLabel: {
      fontSize: 8,
      color: "#888",
      marginBottom: 2,
   },
   infoValue: {
      fontSize: 10,
      color: "#1a1a1a",
   },

   // ── Tabela ──────────────────────────────────────────────────
   tableHeader: {
      flexDirection: "row",
      border: '1px solid #000',
      padding: 8,
      borderRadius: 4,
      marginBottom: 2,
   },
   tableHeaderText: {
      color: "#000",
      fontWeight: "bold",
      fontSize: 9,
   },
   tableRow: {
      flexDirection: "row",
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderBottom: "1px solid #e5e7eb",
      minHeight: 36,
      alignItems: "center",
   },
   tableRowAlt: {
      backgroundColor: "#faf5ff",
   },

   // Colunas
   colNum: { width: "6%" },
   colStudentId: { width: "14%" },
   colName: { width: "38%" },
   colSection: { width: "16%" },
   colSign: { width: "26%" },

   signLine: {
      borderBottom: "1px solid #ccc",
      marginTop: 16,
      width: "90%",
   },

   // ── Rodapé ──────────────────────────────────────────────────
   footer: {
      position: "absolute",
      bottom: 30,
      left: 40,
      right: 40,
      flexDirection: "row",
      justifyContent: "space-between",
      borderTop: "1px solid #e5e7eb",
      paddingTop: 8,
   },
   footerText: {
      fontSize: 8,
      color: "#aaa",
   },

   // ── Assinaturas finais ──────────────────────────────────────
   signatureBlock: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 40,
      paddingTop: 20,
   },
   signatureItem: {
      alignItems: "center",
      width: "40%",
   },
   signatureLine: {
      borderTop: "1px solid #1a1a1a",
      width: "100%",
      marginBottom: 4,
   },
   signatureLabel: {
      fontSize: 9,
      color: "#444",
   },
});



interface SectionAtaData {
   discipline: TAtaDiscipline;
   semester: Semester | null;
   section: {
      id: string;
      title: string;
      shift: string;
   };
   course: {
      title: string;
   };
   department: {
      id: string;
      title: string;
   };
   students: AtaStudent[];
}

export const RetakeAtaPDF = ({ data }: { data: SectionAtaData }) => {
   const today = new Date().toLocaleDateString("pt-AO", { day: "2-digit", month: "long", year: "numeric" });
   const examDate = data.students[0]
      ? new Date(data.students[0].date).toLocaleDateString("pt-AO", { day: "2-digit", month: "long", year: "numeric" })
      : "—";
   const location = data.students[0]?.location;

   return (
      <Document>
         <Page size="A4" style={styles.page}>

            {/* Cabeçalho */}
            <View style={styles.header}>
               <Image src="/avatar-3.jpeg" style={styles.logo} />
               <View style={styles.headerText}>
                  <Text style={styles.institutionName}>{clientEnv.NEXT_PUBLIC_UNIVERCITY_NAME}</Text>
                  <Text style={styles.email}>{clientEnv.NEXT_PUBLIC_UNIVERCITY_WEBSITE}</Text>
                  <Text style={styles.institutionSub}>{data.department.title}</Text>
               </View>
            </View>

            {/* Título */}
            <View style={styles.titleBlock}>
               <Text style={styles.ataLabel}>Documento Oficial</Text>
               <Text style={styles.ataTitle}>ATA DE EXAME DE RECURSO</Text>
               <Text style={styles.ataDiscipline}>{data.discipline.name}</Text>
               {/* ✅ Turma e turno */}
               <Text style={{ fontSize: 10, color: "#888", marginTop: 4 }}>
                  Turma {data.section.title} — {data.section.shift}
               </Text>
            </View>

            {/* Info */}
            <View style={styles.infoGrid}>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>SEMESTRE</Text>
                  <Text style={styles.infoValue}>
                     {data.semester && (
                        <>
                           {data.semester.title ?? ''} {data.semester.year}
                        </>
                     )}
                  </Text>
               </View>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>TURMA</Text>
                  <Text style={styles.infoValue}>{data.section.title}</Text>
               </View>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>TURNO</Text>
                  <Text style={styles.infoValue}>{data.section.shift}</Text>
               </View>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>DATA</Text>
                  <Text style={styles.infoValue}>{examDate}</Text>
               </View>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>HORA</Text>
                  <Text style={styles.infoValue}>{data.students[0]?.time ?? "—"}</Text>
               </View>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>LOCAL</Text>
                  <Text style={styles.infoValue}>
                     {location
                        ? `${location.building} — Sala ${location.room}${location.floor ? `, ${location.floor}º` : ""}`
                        : "Por definir"}
                  </Text>
               </View>
               <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>TOTAL</Text>
                  <Text style={styles.infoValue}>{data.students.length} alunos</Text>
               </View>
            </View>

            {/* Tabela */}
            <View style={styles.tableHeader}>
               <Text style={[styles.tableHeaderText, styles.colNum]}>Nº</Text>
               <Text style={[styles.tableHeaderText, styles.colStudentId]}>Nº ESTUDANTE</Text>
               <Text style={[styles.tableHeaderText, styles.colName]}>NOME COMPLETO</Text>
               <Text style={[styles.tableHeaderText, styles.colSign]}>ASSINATURA</Text>
            </View>

            {data.students.map((s, i) => (
               <View key={s.studentId} style={[styles.tableRow, i % 2 !== 0 ? styles.tableRowAlt : {}]}>
                  <Text style={[{ fontSize: 9, color: "#888" }, styles.colNum]}>{s.number}</Text>
                  <Text style={[{ fontSize: 9 }, styles.colStudentId]}>{s.studentId}</Text>
                  <Text style={[{ fontSize: 9, fontWeight: "bold" }, styles.colName]}>{s.name}</Text>
                  <View style={[styles.colSign, { justifyContent: "flex-end" }]}>
                     <View style={styles.signLine} />
                  </View>
               </View>
            ))}

            {/* Assinaturas */}
            <View style={styles.signatureBlock}>
               <View style={styles.signatureItem}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>Docente Responsável</Text>
               </View>
               <View style={styles.signatureItem}>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureLabel}>Responsável de Secretaria</Text>
               </View>
            </View>

            {/* Rodapé */}
            <View style={styles.footer} fixed>
               <Text style={styles.footerText}>Gerado em {today} — Documento Oficial</Text>
               <Text
                  style={styles.footerText}
                  render={({ pageNumber, totalPages }) => `Página ${pageNumber} de ${totalPages}`}
               />
            </View>

         </Page>
      </Document>
   );
};