import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { ColorThemeSelector } from "./toggle-color-theme";
import { Label } from "@/components/ui/label";

export function ThemePopOver() {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:text-dark-900 relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
               <Palette className="h-6 w-6" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-96">
            <div className="space-y-2">
               <Label>Theme</Label>
               <ColorThemeSelector />
            </div>
         </PopoverContent>
      </Popover>
   );
}