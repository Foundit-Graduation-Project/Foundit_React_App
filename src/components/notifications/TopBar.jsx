import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";

export function TopBar({ onToggleSidebar, isMobile }) {
  const [isDark, setIsDark] = useState(false);

  // Check the initial theme state when component mounts
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
    <div className="flex items-center justify-between px-6 h-14 border-b border-border bg-background shrink-0 transition-colors duration-300">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* BRANDING FIX: Changed to "FoundIt" with brand colors */}
        {isMobile && (
          <Link to="/home" className="font-bold text-lg text-blue-600 dark:text-blue-400 tracking-tight ml-1 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
            FoundIt
          </Link>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
        aria-label="Toggle Theme"
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  );
}