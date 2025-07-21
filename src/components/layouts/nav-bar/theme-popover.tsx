import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { Settings } from "lucide-react";
import { ColorThemeSelector } from "./toggle-color-theme";
import { Label } from "@/components/ui/label";

export function ThemePopOver() {
   return (
      <Popover>
         <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10 ml-4">
               <Settings className="h-6 w-6" />
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