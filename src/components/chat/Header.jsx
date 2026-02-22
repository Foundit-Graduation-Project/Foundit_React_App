import { MessageSquare, Bell, Settings as SettingsIcon, User, LogOut, Search } from 'lucide-react';
import { currentUser } from './mockData';

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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b shrink-0 bg-background">
      
      {/* LEFT: Branding */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2 text-primary">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
            <MessageSquare className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-bold text-foreground hidden sm:block">Messages</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 h-full">
          <p className="text-primary font-medium border-b-2 border-primary py-5">
            Inbox
          </p>
        </nav>
      </div>

      {/* Profile Dropdown */}
      <div className="flex items-center gap-2">

        <Separator orientation="vertical" className="h-8 mx-2 hidden sm:block" />
        
        {/* User Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-full justify-start gap-3 px-2 rounded-full">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-sm font-semibold leading-tight">{currentUser.name}</span>
                <span className="text-xs text-muted-foreground">{currentUser.role}</span>
              </div>
              <Avatar className="h-9 w-9">
                {/* If you have a real image URL in currentUser: */}
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback className={currentUser.color}>
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">alex.rivera@example.com</p>
              </div>
            </DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}