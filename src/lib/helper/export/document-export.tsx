"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { getAllStudentDocList } from "@/services/data/student";
import { toast } from "sonner";

export default function ExportStudentListFilterForm() {
   const [filters, setFilters] = useState({
      format: "pdf",
      limit: "500",
      gender: "",
      studentType: "",
      isActive: "",
      shiftId: "",
      academicDepartmentId: "",
      yearLevel: "",
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
      a.download = `students.${filters.format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
   };

   return (
      <div className="p-4 w-[280px] space-y-4">

         {/* FORMATO */}
         <div className="space-y-1">
            <Label className="text-sm">Formato</Label>
            <RadioGroup
               value={filters.format}
               onValueChange={(v) => handleChange("format", v)}
               className="flex justify-between"
            >
               {["pdf", "csv", "xlsx"].map((f) => (
                  <div key={f} className="flex items-center space-x-2">
                     <RadioGroupItem value={f} id={f} />
                     <Label htmlFor={f} className="text-xs uppercase">{f}</Label>
                  </div>
               ))}
            </RadioGroup>
         </div>

         {/* LIMITE */}
         <div className="space-y-1">
            <Label className="text-sm">Limite</Label>
            <Input
               type="number"
               value={filters.limit}
               onChange={(e) => handleChange("limit", e.target.value)}
               placeholder="Ex: 500"
               className="h-8"
            />
         </div>

         {/* GÊNERO */}
         <div className="space-y-1">
            <Label className="text-sm">Gênero</Label>
            <RadioGroup
               value={filters.gender}
               onValueChange={(v) => handleChange("gender", v)}
               className="flex justify-between"
            >
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="gender-all" />
                  <Label htmlFor="gender-all" className="text-xs">Todos</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Masculino" id="male" />
                  <Label htmlFor="male" className="text-xs">Masc</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Feminino" id="female" />
                  <Label htmlFor="female" className="text-xs">Fem</Label>
               </div>
            </RadioGroup>
         </div>

         {/* ATIVO */}
         <div className="space-y-1">
            <Label className="text-sm">Ativo</Label>
            <RadioGroup
               value={filters.isActive}
               onValueChange={(v) => handleChange("isActive", v)}
               className="flex justify-between"
            >
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="" id="active-all" />
                  <Label htmlFor="active-all" className="text-xs">Todos</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="active" />
                  <Label htmlFor="active" className="text-xs">Ativos</Label>
               </div>

               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="inactive" />
                  <Label htmlFor="inactive" className="text-xs">Inativos</Label>
               </div>
            </RadioGroup>
         </div>

         {/* TURNO */}
         <div className="space-y-1">
            <Label className="text-sm">Turno</Label>
            <RadioGroup
               value={filters.shiftId}
               onValueChange={(v) => handleChange("shiftId", v)}
               className="flex justify-between"
            >
               {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center space-x-2">
                     <RadioGroupItem value={String(n)} id={`shift-${n}`} />
                     <Label htmlFor={`shift-${n}`} className="text-xs">
                        {n === 1 ? "Manhã" : n === 2 ? "Tarde" : "Noite"}
                     </Label>
                  </div>
               ))}
            </RadioGroup>
         </div>

         {/* DEPARTAMENTO */}
         <div className="space-y-1">
            <Label className="text-sm">Departamento (ID)</Label>
            <Input
               placeholder="ID..."
               value={filters.academicDepartmentId}
               onChange={(e) => handleChange("academicDepartmentId", e.target.value)}
               className="h-8"
            />
         </div>

         {/* NÍVEL */}
         <div className="space-y-1">
            <Label className="text-sm">Ano curricular</Label>
            <RadioGroup
               value={filters.yearLevel}
               onValueChange={(v) => handleChange("yearLevel", v)}
               className="flex justify-between"
            >
               {[
                  ["", "Todos"],
                  ["FIRST", "1º"],
                  ["SECOND", "2º"],
                  ["THIRD", "3º"],
                  ["FOURTH", "4º"],
               ].map(([value, label]) => (
                  <div key={value} className="flex items-center space-x-2">
                     <RadioGroupItem value={value} id={`year-${value || "all"}`} />
                     <Label htmlFor={`year-${value || "all"}`} className="text-xs">
                        {label}
                     </Label>
                  </div>
               ))}
            </RadioGroup>
         </div>

         <Button onClick={handleExport} className="w-full mt-2">
            <Download className="w-4 h-4 mr-2" />
            Exportar
         </Button>
      </div>
   );
}
