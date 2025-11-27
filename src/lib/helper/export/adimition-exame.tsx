"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { getAllStudentDocList } from "@/services/data/student";
import { toast } from "sonner";
//admition-exame
export default function ExportStudentListFilterForm() {
   const [filters, setFilters] = useState({
      format: "pdf",
      limit: "500",
      phase: "",
      status: ""
   });

   const handleChange = (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   };

   const handleExport = async () => {
      const query = new URLSearchParams(
         Object.entries(filters).filter(([, v]) => v !== "")
      ).toString();

      const response = await getAllStudentDocList(query);
      if (!response.ok) {
         toast.error("Erro ao exportar!");
         return;
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `admition-exame.${filters.format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
   };

   return (
      <div className="p-4 w-[280px] space-y-4">
         {/* Formato */}
         <div className="space-y-2">
            <Label className="text-sm">Formato</Label>
            <RadioGroup
               value={filters.format}
               onValueChange={(v) => handleChange("format", v)}
               className="flex justify-between"
            >
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pdf" id="pdf" />
                  <Label htmlFor="pdf">PDF</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="xlsx" id="xlsx" />
                  <Label htmlFor="xlsx">Excel</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="csv" id="csv" />
                  <Label htmlFor="csv">CSV</Label>
               </div>
            </RadioGroup>
         </div>

         {/* Limite */}
         <div className="space-y-2">
            <Label className="text-sm">Limite</Label>
            <Input
               type="number"
               min={1}
               max={5000}
               value={filters.limit}
               onChange={(e) => handleChange("limit", e.target.value)}
               className="h-8"
            />
         </div>

         {/* Fase */}
         <div className="space-y-2">
            <Label className="text-sm">Fase</Label>
            <RadioGroup
               value={filters.phase}
               onValueChange={(v) => handleChange("phase", v)}
               className="flex justify-between"
            >
               {[1, 2, 3, 4].map((p) => (
                  <div key={p} className="flex items-center space-x-2">
                     <RadioGroupItem value={String(p)} id={`p-${p}`} />
                     <Label htmlFor={`p-${p}`}>{p}</Label>
                  </div>
               ))}
            </RadioGroup>
         </div>

         {/* Status */}
         <div className="space-y-2">
            <Label className="text-sm">Status</Label>
            <RadioGroup
               value={filters.status}
               onValueChange={(v) => handleChange("status", v)}
               className="flex justify-between"
            >
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="CONFIRM" id="confirm" />
                  <Label htmlFor="confirm">Confirmado</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PENDIND" id="pendind" />
                  <Label htmlFor="pendind">Pendente</Label>
               </div>
            </RadioGroup>
         </div>

         <DropdownMenuSeparator />

         <Button onClick={handleExport} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Exportar
         </Button>
      </div>
   );
}
