import { useState } from "react"
import { MapPin, Calendar, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

// Sidebar categories data
const categories = [
  { id: "electronics", name: "Electronics", icon: "📱" },
  { id: "documents", name: "Documents", icon: "📄" },
  { id: "wallets", name: "Wallets & Bags", icon: "👛" },
  { id: "jewelry", name: "Jewelry", icon: "💎" },
  { id: "keys", name: "Keys", icon: "🔑" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "pets", name: "Pets", icon: "🐕" },
  { id: "vehicles", name: "Vehicles", icon: "🚗" },
  { id: "other", name: "Other", icon: "📦" },
]

// Date filter options
const dateFilters = [
  { id: "any", label: "Any time" },
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "month", label: "This month" },
]

function SidebarContent({ className, onCategorySelect }) {
  const [radius, setRadius] = useState([10])
  const [dateFilter, setDateFilter] = useState("any")
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId)
    if (onCategorySelect) {
      onCategorySelect(categoryId)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {/* Categories Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Categories</h3>
        <ScrollArea className="h-75">
          <div className="space-y-1">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "secondary" : "ghost"}
                className="w-full justify-start font-normal"
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="me-2">{category.icon}</span>
                {category.name}
                <ChevronRight className="ms-auto h-4 w-4 opacity-50" />
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />


      {/* Date Filter Section */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Date Posted</h3>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </div>
        <RadioGroup
          value={dateFilter}
          onValueChange={setDateFilter}
          className="space-y-1"
        >
          {dateFilters.map((filter) => (
            <div key={filter.id} className="flex items-center space-x-2">
              <RadioGroupItem value={filter.id} id={filter.id} />
              <label
                htmlFor={filter.id}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {filter.label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

// Desktop Sidebar Component
function Sidebar({ className, onCategorySelect }) {
  return (
    <aside className={cn("hidden lg:block w-64 border-s bg-background", className)}>
      <div className="sticky top-14 h-[calc(100vh-3.5rem)] p-4">
        <SidebarContent onCategorySelect={onCategorySelect} />
      </div>
    </aside>
  )
}

// Mobile Sidebar (Sheet/Drawer)
function MobileSidebar({ open, onOpenChange, onCategorySelect }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="start" className="w-75 sm:w-87.5">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <SidebarContent onCategorySelect={onCategorySelect} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Export both components
export { Sidebar, MobileSidebar, SidebarContent }
export default Sidebar
