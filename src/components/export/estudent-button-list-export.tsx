// components/ExportButton.tsx
"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { getAllStudentDocList } from "@/services/data/student";

type ExportStudentsButtonProps = {
   filters?: {
      gender?: string;
      isActive?: string;
      studentType?: string;
      academicDepartmentId?: string;
      academicFacultyId?: string;
      yearLevel?: string;
   };
   format?: "pdf" | "csv";
}

export const ExportStudentsButton = ({
   filters = {},
   format = "pdf",
}: ExportStudentsButtonProps) => {
   const [loading, setLoading] = useState(false);

   const handleExport = async () => {
      setLoading(true);
      try {
         // ── Construir query string com os filtros activos ──────────
         const params = new URLSearchParams();
         params.set("format", format);

         Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value);
         });
         const response = await getAllStudentDocList(params.toString);

         if (!response.ok) {
            throw new Error("Erro ao exportar");
         }

         // ── Converter para blob e fazer download ───────────────────
         const blob = await response.blob();
         const objectUrl = URL.createObjectURL(blob);

         const link = document.createElement("a");
         link.href = objectUrl;
         link.download = `estudantes-${Date.now()}.${format}`;
         document.body.appendChild(link);
         link.click();

         // Limpar
         document.body.removeChild(link);
         URL.revokeObjectURL(objectUrl);

      } catch (err) {
         console.error("Erro ao exportar:", err);
         alert("Erro ao exportar. Tente novamente.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <>
         <div className="flex"></div>
         <Button
            onClick={handleExport}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
         >
            {loading ? (
               <>
                  <span className="animate-spin">⏳</span>
                  A exportar...
               </>
            ) : (
               <>
                  {format === "pdf" ? "📄" : "📊"}
                  Exportar {format.toUpperCase()}
               </>
            )}
         </Button>
      </>
   );
};