
import Popover from "@/components/shared/popover"
import { Palette } from "lucide-react";
import { ColorThemeSelector } from "./toggle-color-theme";
import { Label } from "@/components/ui/label";

export function ThemePopOver() {
   return (
      <Popover className="w-auto h-auto" trigger={<Palette />}>
         <div className="space-y-2">
            <Label>Theme</Label>
            <ColorThemeSelector />
         </div>
      </Popover>
   );
}