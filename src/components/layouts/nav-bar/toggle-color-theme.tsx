"use client";

import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const themes = [
   {
      name: "Padrão",
      value: "dafault",

   },
   {
      name: "Amethyst",
      value: "amethyst",

   },
   {
      name: "Solar Dust",
      value: "solar-dust",

   },
   {
      name: "Vitage",
      value: "vitage",
   },


   {
      name: "Naturesa",
      value: "nature",

   },
];

const THEME_KEY = "color-theme";

export function ColorThemeSelector() {
   const [mounted, setMounted] = useState(false);
   const [colorTheme, setColorTheme] = useState("dafault");

   // Declarada ANTES do useEffect
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
      <RadioGroup
         value={colorTheme}
         onValueChange={handleThemeChange}
         className="space-y-2"
      >
         {themes.map((t) => (
            <div key={t.value} className="flex items-center space-x-2">
               <RadioGroupItem value={t.value} id={t.value} />
               <Label htmlFor={t.value}>{t.name}</Label>
            </div>
         ))}
      </RadioGroup>
   );
}