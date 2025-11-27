
import Popover from "@/components/shared/popover"
import { Palette } from "lucide-react";
import { ColorThemeSelector } from "./toggle-color-theme";
import { Label } from "@/components/ui/label";

export function ThemePopOver() {
   return (
      <Popover trigger={<Palette className="h-6 w-6" />}>
         <div className="space-y-2">
            <Label>Theme</Label>
            <ColorThemeSelector />
         </div>
      </Popover>
   );
}