"use client";

import { useEffect, useState } from "react";
import Popover from "../shared/popover";
import { Globe } from "lucide-react";
import Image from "next/image";

// Define supported languages with flags
const LANGUAGES = [
   { code: "en", label: "English", flag: "/assets/icons8-great-britain-32.png" },
   { code: "pt", label: "Português", flag: "/assets/icons8-portugal-32.png" },
];

export default function LanguageSwitcher() {
   const [selectedLang, setSelectedLang] = useState("pt");

   useEffect(() => {

      // Load Google Translate script once
      if (!document.querySelector("#google-translate-script")) {
         const script = document.createElement("script");
         script.id = "google-translate-script";
         script.src =
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
         document.body.appendChild(script);

         (window as any).googleTranslateElementInit = () => {
            new (window as any).google.translate.TranslateElement(
               {
                  pageLanguage: "pt",
                  includedLanguages: LANGUAGES.map((l) => l.code).join(","),
                  autoDisplay: false,
               },
               "google_translate_element"
            );
         };
      }

      // Apply saved preference
      const savedLang = localStorage.getItem("preferredLang");
      if (savedLang) {
         setSelectedLang(savedLang);
         setTimeout(() => changeLanguage(savedLang), 1000);
      }
   }, []);

   // Change language via Google Translate widget
   const changeLanguage = (lang: string) => {
      const select: HTMLSelectElement | null =
         document.querySelector(".goog-te-combo");
      if (select) {
         select.value = lang;
         select.dispatchEvent(new Event("change"));
         localStorage.setItem("preferredLang", lang);
         setSelectedLang(lang);
      }
   };

   // const current = LANGUAGES.find((l) => l.code === selectedLang);

   return (
      <div>
         <div id="google_translate_element" className="hidden" />

         <Popover
            className="w-48"
            trigger={<Globe />}>
            {LANGUAGES.map((lang) => (
               <div
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center gap-2 p-1 rounded-lg hover:bg-secondary cursor-pointer ${lang.code === selectedLang ? 'bg-secondary' : ''}`}
               >
                  <Image src={lang.flag} width={30} height={30} alt={`${lang.label} flag icon`} />
                  <b>{lang.label}</b>
               </div>
            ))}
         </Popover>
      </div>
   );
}
