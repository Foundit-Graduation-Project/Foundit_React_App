import { Input } from "../../ui/input";
import { Search, Plus, Database, User, Settings as SettingsIcon, Bell, LogOut } from "lucide-react";
import { Button } from "../../ui/button";
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
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";


const myReportsNav = () => {
    return (
        <>
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-lg text-gray-900 tracking-tight">FoundIt</span>
                </div>
                <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <Link to="/home">
                        <span className=" text-gray-500 hover:text-blue-600 
                                 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                            Home
                        </span>
                    </Link>
                    <Link to="/chat">
                        <span className=" text-gray-500 hover:text-blue-600 
                                 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                            Messages
                        </span>
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative hidden md:block w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search reports..." className="pl-9 bg-gray-50 border-gray-200" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Link to="/create-report" className="flex items-center">
                        <Plus className="w-4 h-4 mr-2" /> New Report
                    </Link>
                </Button>
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

export default myReportsNav;