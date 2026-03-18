// components/grades/GradesDocument.tsx
import {
   Document,
   Page,
   Text,
   View,
   StyleSheet,
   Image,
} from "@react-pdf/renderer";

type Grade = {
   id: number;
   descipline: string;
   mac: number;
   cpf: number;
   cae: number;
   exa: number;
   cfe: number;
   rec: number;
};

type Props = {
   student: {
      name: string;
      course: string;
      year: string;
      email: string;
      phone: string;
   };
   grades: Grade[];
   logoUrl: string;
   qrCodeUrl: string;
};

const styles = StyleSheet.create({
   page: { padding: 40, fontSize: 10, fontFamily: "Helvetica" },
   header: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
   logo: { width: 50, height: 50, marginRight: 10 },
   title: { fontSize: 16, fontWeight: "bold" },
   table: { width: "auto", borderStyle: "solid", borderWidth: 1, marginTop: 20 },
   row: { flexDirection: "row" },
   cell: { borderRightWidth: 1, borderBottomWidth: 1, padding: 5, flex: 1 },
   bold: { fontWeight: "bold" },
   footer: { marginTop: 30, textAlign: "center", fontSize: 8 },
   qr: { width: 70, height: 70, marginTop: 10, alignSelf: "center" },
});

export function GradesDocument({ student, grades, logoUrl, qrCodeUrl }: Props) {
   return (
      <Document>
         <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
               <Image src={logoUrl} style={styles.logo} />
               <View>
                  <Text style={styles.title}>Instituto Superior Politécnico</Text>
                  <Text>A Marca da Educação</Text>
               </View>
            </View>

            {/* Student Info */}
            <Text style={{ marginBottom: 10 }}>Nome: {student.name}</Text>
            <Text style={{ marginBottom: 10 }}>Curso: {student.course}</Text>
            <Text style={{ marginBottom: 10 }}>Ano: {student.year}</Text>
            <Text style={{ marginBottom: 10 }}>Email: {student.email}</Text>
            <Text style={{ marginBottom: 10 }}>Telefone: {student.phone}</Text>

            {/* Grades Table */}
            <View style={styles.table}>
               {/* Header row */}
               <View style={[styles.row, styles.bold]}>
                  <Text style={[styles.cell, { flex: 2 }]}>Disciplina</Text>
                  <Text style={styles.cell}>MACs</Text>
                  <Text style={styles.cell}>CPF</Text>
                  <Text style={styles.cell}>CAE</Text>
                  <Text style={styles.cell}>EXA</Text>
                  <Text style={styles.cell}>CFE</Text>
                  <Text style={styles.cell}>REC</Text>
               </View>

               {grades.map((g) => (
                  <View style={styles.row} key={g.id}>
                     <Text style={[styles.cell, { flex: 2 }]}>{g.descipline}</Text>
                     <Text style={styles.cell}>{g.mac}</Text>
                     <Text style={styles.cell}>{g.cpf}</Text>
                     <Text style={styles.cell}>{g.cae}</Text>
                     <Text style={styles.cell}>{g.exa}</Text>
                     <Text style={styles.cell}>{g.cfe}</Text>
                     <Text style={styles.cell}>{g.rec}</Text>
                  </View>
               ))}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
               <Text>Emitido automaticamente - válido como histórico de notas</Text>
               <Image src={qrCodeUrl} style={styles.qr} />
            </View>
         </Page>
      </Document>
   );
}
