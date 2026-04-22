import  { useState, useEffect } from "react";
import { Menu } from "lucide-react";

import { AppSidebar } from "../../components/notifications/SideBar"; 
import ProfilePhotoSection from "../../components/settings/SettingsPhoto";
import SettingsProfile from "../../components/settings/SettingsProfile";
import PasswordSection from "../../components/settings/SettingsPassword";
import PersonalizationSection from "../../components/settings/SettingsAppearance";
import { useDispatch } from "react-redux";
import { getMe } from "../../features/user";

export default function SettingsPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      
      <AppSidebar collapsed={false} isMobile={isMobile} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <main className="flex-1 flex flex-col min-h-0 min-w-0 overflow-hidden bg-background">
        
        <div className="md:hidden flex items-center p-4 border-b border-border bg-card shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 text-muted-foreground hover:text-foreground rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold ml-2">Settings</h1>
        </div>

        <div className="flex-1 overflow-y-auto min-h-0 p-6 md:p-10 lg:p-12 relative">
          <div className="max-w-4xl mx-auto space-y-10 pb-10">
            
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
              <p className="text-muted-foreground mt-2">Manage your account preferences and experience.</p>
            </div>

            <ProfilePhotoSection />
            <SettingsProfile />
            <PasswordSection />
            <PersonalizationSection />

          </div>
        </div>
      </main>
    </div>
  );
}