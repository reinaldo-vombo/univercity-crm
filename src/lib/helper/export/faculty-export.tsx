"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

//admition-exame
export default function ExportFacultysListFilterForm() {
   const [filters, setFilters] = useState({
      format: "pdf",
      limit: "500",
      academicDepartmentId: "",
   });

   const handleChange = (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
   };

   // const handleExport = async () => {
   //    setLoading(true)
   //    const query = new URLSearchParams(
   //       Object.entries(filters).filter(([, v]) => v !== "")
   //    ).toString();

   //    const response = await getAllStudentDocList(query);
   //    if (!response.ok) {
   //       toast.error("Erro ao exportar!");
   //       setLoading(false)
   //       return;
   //    }
   //    toast.success('Lista Expordata')
   //    setLoading(false)

   //    const blob = await response.blob();
   //    const url = window.URL.createObjectURL(blob);
   //    const a = document.createElement("a");
   //    a.href = url;
   //    a.download = `facultys.${filters.format}`;
   //    document.body.appendChild(a);
   //    a.click();
   //    a.remove();
   //    window.URL.revokeObjectURL(url);
   // };

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


         {/* <Button className="w-full mt-2">
            {loading ? (
               <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Exportando
               </>
            ) : (
               <>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
               </>
            )}
         </Button> */}
      </div>
   );
}
