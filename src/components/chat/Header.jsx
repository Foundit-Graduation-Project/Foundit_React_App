import React, { useState } from 'react';
import { MessageSquare, Bell, Settings as SettingsIcon, User, LogOut, Search, Sun, Moon } from 'lucide-react';
import { selectCurrentUser } from '../../features/auth';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Header() {
  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains("dark");
  });
  const currentUser = useSelector(selectCurrentUser) || {};

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-border shrink-0 bg-card transition-colors duration-300">

      {/* LEFT: Branding and Navigation */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-3">
          <Link to="/home" className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md hover:bg-blue-700 transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/home" className="font-bold text-lg text-foreground tracking-tight hover:text-blue-600 transition-colors">
            FoundIt
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Inbox</span>
          <Link to="/home">
            <span className="text-muted-foreground hover:text-blue-600 transition-colors">
              Home
            </span>
          </Link>
          <Link to="/my-reports">
            <span className="text-muted-foreground hover:text-blue-600 transition-colors">
              Reports
            </span>
          </Link>
        </nav>
      </div>

      {/* RIGHT Actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 hover:bg-secondary p-1 sm:pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold leading-tight text-foreground transition-colors">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground capitalize transition-colors">{currentUser.role?.replace('_', ' ')}</span>
              </div>
              <Avatar className="w-9 h-9 border border-border shadow-sm">
                <AvatarImage src={currentUser?.avatar?.url} alt={currentUser.name} className="object-cover" />
                <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-bold">
                  {getInitials(currentUser.name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 p-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl rounded-2xl animate-in fade-in zoom-in duration-200 z-50 overflow-hidden"
            align="end"
            sideOffset={10}
            forceMount
          >
            <DropdownMenuLabel className="p-3 mb-1">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{currentUser.name}</p>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50" />

            <DropdownMenuGroup className="space-y-1">
              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/profile" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/chat" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Messages</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/notifications" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-900/50 transition-colors">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Notifications</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem className="p-0 rounded-xl overflow-hidden" asChild>
                <Link to="/settings" className="flex items-center gap-2 p-2.5 w-full hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
                    <SettingsIcon className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">Settings</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800/50 my-1" />

            <DropdownMenuItem className="flex items-center gap-2 p-2.5 rounded-xl cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all group">
              <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:bg-red-100 dark:group-hover:bg-red-900/50 transition-colors">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-semibold">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}