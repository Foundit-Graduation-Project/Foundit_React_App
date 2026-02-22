import { MessageSquare, Bell, Settings as SettingsIcon, User, LogOut } from 'lucide-react';
import { currentUser } from '../../data/mockData';

// Import the shadcn Dropdown Menu components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b border-slate-200 shrink-0 bg-white">
      
      {/* LEFT: Branding */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold text-slate-900 hidden sm:block">Messages</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 h-full pt-1">
          <span className="text-blue-600 font-medium border-b-2 border-blue-600 pb-5 pt-4">Inbox</span>
        </nav>
      </div>

      {/* Profile Dropdown */}
      <div className="flex items-center gap-4">
        
        
        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hidden sm:flex items-center gap-3 hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold leading-tight text-slate-900">{currentUser.name}</span>
                <span className="text-xs text-slate-500">{currentUser.role}</span>
              </div>
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-medium ${currentUser.color}`}>
                {currentUser.initials}
              </div>
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
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            {/* Custom styling for destructive actions */}
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
            
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}