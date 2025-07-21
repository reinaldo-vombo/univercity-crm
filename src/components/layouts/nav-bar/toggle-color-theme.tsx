"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const themes = [
   {
      name: "Solar Dust",
      value: "solar-dust",
      colors: [
         "oklch(0.5553 0.1455 48.9975)", // primary
         "oklch(0.8276 0.0752 74.4400)", // secondary
         "oklch(0.9000 0.0500 74.9889)", // accent
         "oklch(0.8866 0.0404 89.6994)", // border
      ],
   },
   {
      name: "Super-Base",
      value: "super-base",
      colors: [
         "oklch(0.8348 0.1302 160.9080)", // --primary
         "oklch(0.9940 0 0)", // --secondary
         "oklch(0.9461 0 0)", // --accent
         "oklch(0.9037 0 0)", // --border
      ],
   },
   {
      name: "Gebins",
      value: "gebins",
      colors: [
         "oklch(0.7122 0.0371 166.3783)", // --primary
         "oklch(0.9505 0.0066 160.0726)", // --secondary
         "oklch(0.9505 0.0066 160.0726)", // --accent
         "oklch(0.9048 0.0076 151.8794)", // --border
      ],
   },
   {
      name: "Naturesa",
      value: "nature",
      colors: [
         "oklch(0.5234 0.1347 144.1672)", // --primary
         "oklch(0.9571 0.0210 147.6360)", // --secondary
         "oklch(0.8952 0.0504 146.0366)", // --accent
         "oklch(0.8805 0.0208 74.6428)", // --border
      ],
   },
   {
      name: "Grafite",
      value: "graphite",
      colors: [
         "oklch(0.4891 0 0)", // --primary
         "oklch(0.9067 0 0)", // --secondary
         "oklch(0.8078 0 0)", // --accent
         "oklch(0.9702 0 0)", // --border
      ],
   },
];

export function ColorThemeSelector() {

   const { theme, setTheme, resolvedTheme } = useTheme();
   const [mounted, setMounted] = useState(false);

   useEffect(() => setMounted(true), []);

   if (!mounted) return null;

   const isDark = resolvedTheme?.startsWith("dark");

   const handleThemeChange = (baseTheme: string) => {
      setTheme(isDark ? `dark-${baseTheme}` : baseTheme);
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