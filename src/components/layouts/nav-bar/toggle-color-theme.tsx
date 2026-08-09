"use client";


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = {
   name: string;
   value: string;
   swatch: [string, string, string]; // 3 cores representativas do tema
};

const themes: Theme[] = [
   { name: "Padrão", value: "dafault", swatch: ["#18181B", "#71717A", "#F4F4F5"] },
   { name: "Amethyst", value: "amethyst", swatch: ["#4C1D95", "#8B5CF6", "#DDD6FE"] },
   { name: "Solar Dust", value: "solar-dust", swatch: ["#92400E", "#F59E0B", "#FDE68A"] },
   { name: "Vintage", value: "vitage", swatch: ["#5B4636", "#A8895D", "#E9DCC3"] },
   { name: "Natureza", value: "nature", swatch: ["#14532D", "#4ADE80", "#DCFCE7"] },
];

const THEME_KEY = "color-theme";

export function ColorThemeSelector() {
   const [mounted, setMounted] = useState(false);
   const [colorTheme, setColorTheme] = useState("dafault");

   const applyColorTheme = (baseTheme: string) => {
      const root = document.documentElement;
      themes.forEach((t) => root.classList.remove(t.value));
      root.classList.add(baseTheme);
   };

   useEffect(() => {
      setMounted(true);
      const saved = localStorage.getItem(THEME_KEY) ?? "dafault";
      setColorTheme(saved);
   }, []);

   if (!mounted) return null;

   const handleThemeChange = (baseTheme: string) => {
      setColorTheme(baseTheme);
      applyColorTheme(baseTheme);
      localStorage.setItem(THEME_KEY, baseTheme);
   };

   return (
      <div
         role="radiogroup"
         aria-label="Selecionar tema de cor"
         className="grid grid-cols-2 gap-3 sm:grid-cols-3"
      >
         {themes.map((t) => {
            const isSelected = colorTheme === t.value;

            return (
               <button
                  key={t.value}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleThemeChange(t.value)}
                  className={cn(
                     "group relative flex flex-col gap-2.5 rounded-xl border p-3 text-left",
                     "transition-colors duration-200 cursor-pointer",
                     "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
                     isSelected
                        ? "border-foreground/80 bg-muted/50"
                        : "border-border hover:border-foreground/30 hover:bg-muted/30"
                  )}
               >
                  {/* Preview da paleta */}
                  <div className="flex h-9 w-full overflow-hidden rounded-md">
                     {t.swatch.map((color, i) => (
                        <span
                           key={i}
                           className="flex-1"
                           style={{ backgroundColor: color }}
                        />
                     ))}
                  </div>

                  {/* Label + indicador de seleção */}
                  <div className="flex items-center justify-between">
                     <span
                        className={cn(
                           "text-sm font-medium",
                           isSelected ? "text-foreground" : "text-muted-foreground"
                        )}
                     >
                        {t.name}
                     </span>

                     <span
                        className={cn(
                           "flex h-4 w-4 items-center justify-center rounded-full border",
                           isSelected
                              ? "border-foreground bg-foreground"
                              : "border-border bg-transparent"
                        )}
                     >
                        {isSelected && (
                           <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.15 }}
                           >
                              <Check className="h-2.5 w-2.5 text-background" strokeWidth={3} />
                           </motion.span>
                        )}
                     </span>
                  </div>
               </button>
            );
         })}
      </div>
   );
}