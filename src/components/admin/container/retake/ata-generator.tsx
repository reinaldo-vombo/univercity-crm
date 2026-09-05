// app/admin/retakes/ata-generator.tsx
"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { FileText, Download, Loader2 } from "lucide-react";
import { RetakeAtaPDF } from "@/components/export/pdfs/retake-ata";
import { RetakeAtaResponse, RetakeSectionItem, TAtaDiscipline } from "@/types/global";
import { User } from "@/lib/helper/auth/user";

interface AtaGeneratorProps {
   data: RetakeAtaResponse;
   disciplines: TAtaDiscipline[];
   sections: RetakeSectionItem[];
   courseName: string;
   academicSemesterId: string;
}

// interface GenerationStatus {
//    disciplineId: string;
//    disciplineName: string;
//    status: "waiting" | "generating" | "done" | "error";
// }

export const AtaGenerator = ({
   disciplines,
   data,
   sections,
   courseName,
   academicSemesterId
}: AtaGeneratorProps) => {
   const [selectedDiscipline, setSelectedDiscipline] = useState<any>(null);
   const [isRunning, setIsRunning] = useState(false);
   const [progress, setProgress] = useState(0);
   const [statuses, setStatuses] = useState<any[]>([]);
   const currentUser = User()
   console.log({ academicSemesterId, currentUser });

   const generateSectionAta = async (disciplineId: string, disciplineName: string, section: any) => {

      const ataData = {
         discipline: data.discipline,
         semester: data.semester,
         section: data.sections[0].section,
         department: data.sections[0].department,
         course: data.sections[0].course,
         students: data.sections[0].students,
      };

      const blob = await pdf(<RetakeAtaPDF data={ataData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ata-${disciplineName}-${section.title}-${section.shift}.pdf`.replace(/\s+/g, "-");
      link.click();
      URL.revokeObjectURL(url);
   };

   // ── Gerar todas as atas (todas disciplinas × todas turmas) ───
   const generateAll = async () => {
      if (!disciplines?.length) return;
      setIsRunning(true);
      setProgress(0);

      // Primeiro buscar todas as turmas de cada disciplina
      const queue: { disciplineId: string; disciplineName: string; section: any }[] = [];

      for (const disc of disciplines) {
         // const response = await fetch(
         //    `/retakes/ata/${disc.id}/${academicSemesterId}/sections`,
         //    {
         //       method: 'GET',
         //       headers: {
         //          'Authorization': `Bearer ${currentUser?.accessToken}`,
         //       }
         //    }
         // );
         // const data = await response.json();
         // const secs = data;
         const secs = sections;
         secs.forEach((s: any) => queue.push({
            disciplineId: disc.id,
            disciplineName: disc.name,
            section: s,
         }));
      }

      const initial = queue.map((q) => ({
         key: `${q.disciplineId}-${q.section.id}`,
         label: `${q.disciplineName} — ${q.section.title} (${q.section.shift})`,
         status: "waiting",
      }));
      setStatuses(initial);

      for (let i = 0; i < queue.length; i++) {
         const { disciplineId, disciplineName, section } = queue[i];
         const key = `${disciplineId}-${section.id}`;

         setStatuses((prev) =>
            prev.map((s) => s.key === key ? { ...s, status: "generating" } : s)
         );

         try {
            await generateSectionAta(disciplineId, disciplineName, section);
            setStatuses((prev) =>
               prev.map((s) => s.key === key ? { ...s, status: "done" } : s)
            );
         } catch {
            setStatuses((prev) =>
               prev.map((s) => s.key === key ? { ...s, status: "error" } : s)
            );
         }

         setProgress(Math.round(((i + 1) / queue.length) * 100));
         if (i < queue.length - 1) await new Promise((r) => setTimeout(r, 800));
      }

      setIsRunning(false);
   };

   const STATUS_ICON: Record<string, React.ReactNode> = {
      waiting: <span className="text-gray-300 text-xs">⏳</span>,
      generating: <Loader2 className="w-3 h-3 text-purple-500 animate-spin" />,
      done: <span className="text-green-500 text-xs">✅</span>,
      error: <span className="text-red-500 text-xs">❌</span>,
   };

   return (
      <div className="space-y-4">
         <div className="flex items-center justify-between">
            <div>
               <h3 className="font-semibold text-gray-800">Gerar Atas de Recurso</h3>
               <p className="text-sm text-gray-400">{courseName}</p>
            </div>
            <Button
               onClick={generateAll}
               disabled={isRunning || !disciplines?.length}
               className="bg-purple-700 hover:bg-purple-800"
            >
               {isRunning
                  ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />A gerar...</>
                  : <><FileText className="w-4 h-4 mr-2" />Gerar todas as atas</>
               }
            </Button>
         </div>

         {isRunning && (
            <div className="space-y-1">
               {/* <Progress value={progress} className="h-2" /> */}
               <p className="text-xs text-gray-400 text-right">{progress}%</p>
            </div>
         )}

         {/* Log de progresso */}
         {statuses.length > 0 && (
            <div className="border rounded-xl divide-y max-h-48 overflow-y-auto">
               {statuses.map((s) => (
                  <div key={s.key} className="flex items-center gap-3 px-4 py-2">
                     {STATUS_ICON[s.status]}
                     <span className="text-xs text-gray-600">{s.label}</span>
                  </div>
               ))}
            </div>
         )}

         {/* ✅ Seleccionar disciplina → ver turmas → gerar por turma */}
         <div className="border rounded-xl divide-y">
            {disciplines?.map((disc: any) => (
               <div key={disc.id}>
                  {/* Disciplina */}
                  <button
                     onClick={() =>
                        setSelectedDiscipline(
                           selectedDiscipline?.id === disc.id ? null : disc
                        )
                     }
                     className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 text-left"
                  >
                     <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">{disc.name}</span>
                     </div>
                     <span className="text-xs text-gray-400">
                        {selectedDiscipline?.id === disc.id ? "▲" : "▼"}
                     </span>
                  </button>

                  {/* ✅ Turmas da disciplina */}
                  {selectedDiscipline?.id === disc.id && (
                     <div className="bg-gray-50 divide-y border-t">
                        {!sections?.length ? (
                           <p className="px-8 py-2 text-xs text-gray-400">Sem turmas</p>
                        ) : (
                           sections.map((section: any) => (
                              <div
                                 key={section.id}
                                 className="flex items-center justify-between px-8 py-2"
                              >
                                 <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-600">
                                       {section.title}
                                    </span>
                                    <span className="text-xs text-gray-400">({section.shift})</span>
                                 </div>
                                 <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={isRunning}
                                    onClick={() => generateSectionAta(disc.id, disc.name, section)}
                                    className="text-purple-600 hover:text-purple-800 h-7 text-xs"
                                 >
                                    <Download className="w-3 h-3 mr-1" />
                                    Gerar ata
                                 </Button>
                              </div>
                           ))
                        )}
                     </div>
                  )}
               </div>
            ))}
         </div>
      </div>
   );
};