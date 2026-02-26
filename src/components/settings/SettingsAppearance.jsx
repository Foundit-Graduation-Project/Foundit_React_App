import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon, Monitor } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setTheme, setLanguage } from "../../features/settings/settingSlice";

export default function PersonalizationSection() {
  const dispatch = useDispatch();
  
  // Read instant state from Redux
  const theme = useSelector((state) => state.settings.theme);
  const language = useSelector((state) => state.settings.language);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground">Personalization</h2>
        <p className="text-sm text-muted-foreground mt-1">Customize your visual interface and language.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Language */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <span className="text-lg">🌐</span> Language
          </h3>
          <Select value={language} onValueChange={(val) => dispatch(setLanguage(val))}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (United States)</SelectItem>
              <SelectItem value="ar">Arabic (العربية)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Theme */}
        <div className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
          <h3 className="text-sm font-semibold flex items-center gap-2 text-foreground">
            <Moon className="w-4 h-4 text-blue-500" /> Appearance
          </h3>
          
          <div className="flex items-center gap-3 bg-background p-1.5 rounded-lg border border-border">
            <button type="button" onClick={() => dispatch(setTheme("light"))} className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-md transition-colors ${theme === 'light' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Sun className="w-5 h-5" />
              <span className="text-xs font-medium">Light</span>
            </button>
            <button type="button" onClick={() => dispatch(setTheme("dark"))} className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-md transition-colors ${theme === 'dark' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Moon className="w-5 h-5" />
              <span className="text-xs font-medium">Dark</span>
            </button>
            <button type="button" onClick={() => dispatch(setTheme("auto"))} className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-md transition-colors ${theme === 'auto' ? 'bg-blue-600/10 text-blue-500 border border-blue-600/20 shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
              <Monitor className="w-5 h-5" />
              <span className="text-xs font-medium">Auto</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}