import { Search, Plus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";
import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const homeNav = () => {
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

                {/* User Avatar */}
                <Avatar className="w-9 h-9 border-2 border-white shadow-sm cursor-pointer hover:ring-2 hover:ring-blue-100 transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">JD</AvatarFallback>
                </Avatar>

            </div>

        </>
    );
};

export default homeNav;