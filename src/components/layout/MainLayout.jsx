import { useState } from "react"
import { Outlet } from "react-router-dom"
import Navbar from "../common/Navbar"
import Footer from "../common/Footer"
import Sidebar, { MobileSidebar } from "../common/Sidebar"
import { ThemeProvider } from "../providers/ThemeProvider"

function MainLayout() {
  const [dir, setDir] = useState("ltr")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const handleNavbarAction = (action, value) => {
    if (action === "dir") {
      setDir(value)
      document.documentElement.dir = value
    } else if (action === "sidebar") {
      setMobileSidebarOpen(true)
    }
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="foundit-theme">
      <div className="min-h-screen flex flex-col" dir={dir}>
          <main className="flex-1 grow">
            <Outlet />
          </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default MainLayout
