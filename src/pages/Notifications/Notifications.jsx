import { useState, useEffect } from "react";
import { AppSidebar } from "../../components/notifications/SideBar";
import { RightPanel } from "../../components/notifications/RightPanal";
import { NotificationFeed } from "../../components/notifications/NotificationFeed";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handler = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false); 
    };
    window.addEventListener("resize", handler);
    handler(); 
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      
      <AppSidebar
        collapsed={collapsed}
        isMobile={isMobile}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="flex flex-1 h-screen overflow-hidden min-w-0">
        <section className="flex flex-1 flex-col h-full min-w-0">
          <NotificationFeed onToggleSidebar={handleToggleSidebar} isMobile={isMobile} />
        </section>
        
        <RightPanel />
      </main>

    </div>
  );
}