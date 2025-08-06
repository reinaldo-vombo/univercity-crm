"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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

export function ColorThemeSelector() {

   const { theme, setTheme, resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   const isDark = resolvedTheme?.startsWith("dark");

   const handleThemeChange = (baseTheme: string) => {
      // setTheme(isDark ? `dark-${baseTheme}` : baseTheme);
      const root = document.documentElement;
      const previousThemes = Array.from(root.classList).filter((cls) =>
         cls.startsWith("dark-") || themes.some((t) => t.value === cls)
      );

      // Remove any existing theme classes
      previousThemes.forEach((cls) => root.classList.remove(cls));

      const newTheme = isDark ? `dark-${baseTheme}` : baseTheme;

      // Add the new theme class
      root.classList.add(newTheme);

      setTheme(newTheme);
   };

   return (
      <RadioGroup
         value={theme?.replace("dark-", "")}
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