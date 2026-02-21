import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";

export function TopBar({ onToggleSidebar, isMobile }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center justify-between px-6 h-14 border-b border-border bg-background shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <Menu className="w-4 h-4" />
        </button>
        {isMobile && <span className="font-semibold text-sm">Lost & Found</span>}
      </div>

      <button
        onClick={toggleTheme}
        className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
}