import { Search, Plus, User, Bell, Settings as SettingsIcon, LogOut, Sun, Moon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Link } from "react-router-dom";
import { currentUser } from "../../chat/mockData";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const homeNav = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.toggle("dark");
        setIsDark(!isDark);
    };

    return (
        <>
            {/* 1. LEFT: Logo */}
            <div className="flex items-center gap-2.5 shrink-0">
                <div className="bg-blue-600 w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-blue-200 shadow-md">
                    {/* Using a Search/Loop icon to match the logo in screenshot */}
                    <Search className="w-5 h-5" />
                </div>
                <span className="font-bold text-xl text-blue-600 tracking-tight">FoundIt</span>
            </div>

            {/* 2. CENTER: Search Bar */}
            <div className="hidden md:flex flex-1 max-w-2xl relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    <Search className="h-5 w-5" />
                </div>
                <input
                    type="text"
                    placeholder="Search for lost keys, pets, or wallets..."
                    className="w-full h-11 pl-12 pr-4 bg-gray-100/80 border-transparent rounded-lg text-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 outline-none"
                />
            </div>

            {/* 3. RIGHT: Actions */}
            <div className="flex items-center gap-5 shrink-0">

                {/* Post Button */}
                <Link to="/create-report" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-5 rounded-lg shadow-md shadow-blue-600/20 transition-transform active:scale-95 flex items-center justify-center">
                    <Plus className="w-4 h-4 mr-2 stroke-[3px]" /> Post a Report
                </Link>

                {/* Vertical Separator */}
                <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>

                {/* Notification Bell */}
                <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors hidden sm:block">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <button
                    onClick={toggleTheme}
                    className="w-8 h-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                    {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>

                {/* User Avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 hover:bg-slate-50 p-1 sm:pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-semibold leading-tight text-slate-900">{currentUser.name}</span>
                                <span className="text-xs text-slate-500">{currentUser.role}</span>
                            </div>
                            <Avatar className="w-9 h-9 border border-slate-100 shadow-sm">
                                <AvatarImage src={currentUser?.avatarUrl} alt={currentUser.name} />
                                <AvatarFallback className={`font-medium ${currentUser.color}`}>
                                    {currentUser.initials}
                                </AvatarFallback>
                            </Avatar>
                        </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none text-slate-900">{currentUser.name}</p>
                                <p className="text-xs leading-none text-slate-500">alex.rivera@example.com</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link to="/profile" className="flex items-center w-full">
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link to="/settings" className="flex items-center w-full">
                                    <SettingsIcon className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                                <Link to="/notifications" className="flex items-center w-full">
                                    <Bell className="mr-2 h-4 w-4" />
                                    <span>Notifications</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                            <LogOut className="mr-2 h-4 w-4" /><span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </div>

        </>
    );
};

export default homeNav;