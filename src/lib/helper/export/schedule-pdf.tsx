import React from "react";
import {
   Document,
   Page,
   Text,
   Image,
   View,
   StyleSheet,
   Font,
} from "@react-pdf/renderer";
import { TClassShedule } from "@/types/global";
import { getInitials, showYearLevel } from "..";

// (Opcional) registra fonte
Font.register({
   family: "Roboto",
   src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
});

const styles = StyleSheet.create({
   page: {
      padding: 24,
      fontSize: 9,
      fontFamily: "Roboto",
   },
   logo: {
      width: 40,
      height: 40
   },
   logoContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
   },
   center: {
      textAlign: "center",
      marginBottom: 8,
   },
   bold: {
      fontWeight: "bold",
   },
   header: {
      marginBottom: 10,
   },
   table: {
      display: "flex",
      flexDirection: "column",
      borderWidth: 1,
   },
   row: {
      display: "flex",
      flexDirection: "row",
   },
   cell: {
      borderWidth: 0.5,
      padding: 4,
      width: "60%", // 7 colunas
   },
   timeCell: {
      borderWidth: 0.5,
      padding: 4,
      width: "20%",
   },
   dayCell: {
      borderWidth: 0.5,
      padding: 4,
      width: "60%",
      fontWeight: "bold",
      textAlign: "center",
   },
   headerRow: {
      display: "flex",
      flexDirection: "row",
      backgroundColor: "#f0f0f0",
   },
});

type Props = {
   data: TClassShedule;
};
type TWeek = "SEGUNDA" | "TERCA" | "QUARTA" | "QUINTA" | "SEXTA" | "SABADO" | "DOMINGO"

const days = [
   "SEGUNDA",
   "TERCA",
   "QUARTA",
   "QUINTA",
   "SEXTA",
];

export const SchedulePDF = ({ data }: Props) => {

   // Extrai faixas de horário únicas (ordenadas)
   const timeSlots = Array.from(
      new Set(
         Object.values(data.scheduleGrid)
            .flat()
            .map((s) => `${s.startTime} - ${s.endTime}`)
      )
   ).sort();

   const renderCell = (day: TWeek, time: string) => {
      const [startTime] = time.split(" - ");

      const slot = data.scheduleGrid[day].find(
         (s) => s.startTime === startTime
      );

      if (!slot) return <Text>-</Text>;

      return (
         <View>
            <Text style={styles.bold}>{slot.discipline.name}</Text>
            <Text>
               {slot.faculty.firstName} {slot.faculty.lastName}
            </Text>
            <Text>{slot.room}</Text>
         </View>
      );
   };

   return (
      <Document>
         <Page size="A4" style={styles.page}>
            {/* CABEÇALHO */}
            <View style={styles.logoContainer}>
               <Image style={styles.logo} src={'/mx-black.png'} />
            </View>
            <View style={styles.header}>
               <Text style={[styles.center, styles.bold]}>
                  Instituto Superior Politécnico Metropolitano de Angola
               </Text>
               <Text style={styles.center}>
                  {getInitials(data.department)} – {data.department}
               </Text>
               <Text style={styles.center}>
                  Licenciatura em {data.course}
               </Text>
               <Text style={styles.center}>
                  {data.semester.title} — Turno {data.shift.name} —{" "}
                  {showYearLevel(data.yearLevel)}
               </Text>
               <Text style={styles.center}>Turma: {data.title}</Text>
            </View>

            {/* TABELA */}
            <View style={styles.table}>
               {/* Linha de cabeçalho */}
               <View style={styles.headerRow}>
                  <View style={styles.timeCell}>
                     <Text style={styles.bold}>Hora</Text>
                  </View>

                  {days.map((d) => (
                     <View key={d} style={styles.dayCell}>
                        <Text>{d}-FEIRA</Text>
                     </View>
                  ))}
               </View>

               {/* Linhas de horário */}
               {timeSlots.map((time) => (
                  <View key={time} style={styles.row}>
                     <View style={styles.timeCell}>
                        <Text>{time}</Text>
                     </View>

                     {days.map((day: any) => (
                        <View key={day} style={styles.cell}>
                           {renderCell(day, time)}
                        </View>
                     ))}
                  </View>
               ))}
            </View>
         </Page>
      </Document>
   );
};
