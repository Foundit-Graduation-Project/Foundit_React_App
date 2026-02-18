import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, Menu, Sun, Moon, User, LogOut, Settings, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "@/components/providers/ThemeProvider"

function Navbar({ onMenuClick, dir = "ltr" }) {
  const { theme, setTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState("")
  
  // Mock user data - replace with actual user data from auth state
  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: null, // URL would go here
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  const toggleDirection = () => {
    // This would typically be handled by the parent component
    const newDir = dir === "ltr" ? "rtl" : "ltr"
    if (onMenuClick) {
      onMenuClick("dir", newDir)
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="me-2 lg:hidden"
          onClick={() => onMenuClick && onMenuClick("sidebar")}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>

        {/* Logo */}
        <div className="me-4 hidden md:flex">
          <Link to="/" className="me-6 flex items-center space-x-2">
            <span className="text-xl font-bold">FoundIt</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute start-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search reports..."
                className="h-9 w-full md:w-75 lg:w-100 ps-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Post a Report Button */}
            <Button size="sm" className="hidden sm:flex">
              Post a Report
            </Button>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2 border-s ps-2">
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="ms-auto"
              />
            </div>

            {/* Language/Direction Switcher */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDirection}
              className="hidden sm:flex"
              title={`Switch to ${dir === "ltr" ? "RTL" : "LTR"}`}
            >
              <Languages className="h-4 w-4" />
              <span className="sr-only">Toggle direction</span>
            </Button>

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center">
                    <User className="me-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="flex items-center">
                    <Settings className="me-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <LogOut className="me-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
