"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, BookOpen, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { TExames } from "@/types/global";

type Props = {
   data: TExames;
};

const PAYMENT_STYLES: Record<string, string> = {
   PAID: "bg-green-100 text-green-700",
   NOT_PAID: "bg-red-100 text-red-700",
   PENDING: "bg-yellow-100 text-yellow-700",
};

export const RetakeDetails = ({ data }: Props) => {
   return (
      <Card className="rounded-2xl shadow-sm">
         {/* HEADER */}
         <CardHeader className="flex flex-row items-center justify-between">
            <div>
               <CardTitle className="text-lg">
                  {data.discipline.name}
               </CardTitle>
               <p className="text-sm text-muted-foreground">
                  {data.course.title}
               </p>
            </div>

            <Badge className={PAYMENT_STYLES[data.payment]}>
               {data.payment === "PAID"
                  ? "Pago"
                  : data.payment === "PENDING"
                     ? "Não pago"
                     : "Pendente"}
            </Badge>
         </CardHeader>

         <CardContent className="space-y-6">
            {/* ── STUDENT ───────────────────── */}
            <div className="flex items-center gap-3">
               <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex items-center justify-center text-sm font-semibold">
                  {data.student.profileImage ? (
                     <Image
                        src={data.student.profileImage}
                        alt={data.student.name}
                        fill
                        className="object-cover"
                     />
                  ) : (
                     data.student.name[0]
                  )}
               </div>

               <div>
                  <p className="font-medium">{data.student.name}</p>
                  <p className="text-xs text-muted-foreground">
                     {data.student.studentId}
                  </p>
               </div>
            </div>

            {/* ── INFO GRID ───────────────────── */}
            <div className="grid grid-cols-2 gap-4 text-sm">
               <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  {format(new Date(data.date), "dd MMM yyyy", { locale: pt })}
               </div>

               <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {data.time}
               </div>

               <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  {data.semester.title} • {data.semester.year}
               </div>

               <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  Turma {data.section.title} ({data.section.shift})
               </div>
            </div>

            {/* ── LOCATION ───────────────────── */}
            <div className="flex items-start gap-2 text-sm">
               <MapPin className="w-4 h-4 mt-0.5 text-muted-foreground" />
               <div>
                  <p>{data.location.building}</p>
                  <p className="text-xs text-muted-foreground">
                     Sala {data.location.room}
                     {data.location.floor !== "—" &&
                        ` • ${data.location.floor}º andar`}
                  </p>
               </div>
            </div>

            {/* ── STATUS EXTRA ───────────────────── */}
            <div className="flex justify-between items-center pt-3 border-t">
               <span className="text-xs text-muted-foreground">
                  Estado do pedido
               </span>

               <Badge variant="outline">
                  {data.status}
               </Badge>
            </div>
         </CardContent>
      </Card>
   );
};