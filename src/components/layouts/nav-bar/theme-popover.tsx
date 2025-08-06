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
            <Button variant="ghost" size="icon" className="relative flex size-11 items-center justify-center rounded-full border border-border bg-primary-foreground text-gray-500 transition-colors hover:bg-primary">
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