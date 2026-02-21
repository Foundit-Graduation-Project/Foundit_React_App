import { Check, Search, Megaphone, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopBar } from "./TopBar";
import { NotificationCard } from "./NotificationCard";

// Mock Data
const NOTIFICATIONS = [
  {
    id: 1, type: "match", unread: true, time: "2 mins ago",
    title: "New Match Found!",
    desc: <>A <strong>Black Leather Wallet</strong> matching your description was turned in at the Central Park visitor center.</>,
    icon: <Search className="w-[18px] h-[18px]" />,
    iconBg: "bg-blue-50 text-blue-600 dark:bg-blue-900/30",
  },
  {
    id: 2, type: "message", unread: true, time: "45 mins ago",
    title: "Sarah Jenkins",
    desc: `"Hi Alex, I found a set of keys with a blue lanyard near the fountain. Could these be yours?"`,
    avatar: "SJ",
    iconBg: "bg-gradient-to-br from-teal-500 to-teal-600 text-white",
  },
  {
    id: 3, type: "alert", unread: false, time: "3 hours ago",
    title: "Security Alert",
    desc: <>Increased reports of lost items in the <strong>Riverside District</strong>. Ensure your belongings are tagged with QR codes for faster recovery.</>,
    icon: <Megaphone className="w-[18px] h-[18px]" />,
    iconBg: "bg-orange-50 text-orange-600 dark:bg-orange-900/30",
  },
  {
    id: 4, type: "update", unread: false, time: "Yesterday",
    title: "Platform Update",
    desc: "We've improved our image recognition algorithm to help you find lost items faster. Try uploading a clearer photo of your lost item!",
    icon: <Info className="w-[18px] h-[18px]" />,
    iconBg: "bg-secondary text-muted-foreground",
  },
];

export function NotificationFeed({ onToggleSidebar, isMobile }) {
  const tabStyles = "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none bg-transparent rounded-none px-1 pb-3 pt-2 text-[13px] font-medium text-muted-foreground focus-visible:ring-0 focus-visible:outline-none";

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-background overflow-auto">
      <TopBar onToggleSidebar={onToggleSidebar} isMobile={isMobile} />

      <div className="flex-1 overflow-y-auto px-4 py-8 md:px-12">
        <div className="max-w-[680px] mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[22px] font-bold tracking-tight text-foreground">Notifications</h1>
              <p className="text-[13px] text-muted-foreground mt-1">Manage your alerts and match updates</p>
            </div>
            <Button variant="outline" className="h-9 text-[13px] shrink-0">
              <Check className="w-3.5 h-3.5 mr-2" /> Mark all as read
            </Button>
          </div>

    {/* use map here  */}
          <Tabs defaultValue="all" className="mb-5">
            <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 gap-6 overflow-x-auto">
              <TabsTrigger value="all" className={tabStyles}>
                All <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[11px] bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">12</Badge>
              </TabsTrigger>
              <TabsTrigger value="matches" className={tabStyles}>
                Matches <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[11px]">3</Badge>
              </TabsTrigger>
              <TabsTrigger value="messages" className={tabStyles}>
                Messages <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[11px]">5</Badge>
              </TabsTrigger>
              <TabsTrigger value="alerts" className={tabStyles}>
                Alerts <Badge variant="secondary" className="ml-2 h-5 px-1.5 text-[11px]">4</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="space-y-3">
            {NOTIFICATIONS.map((notif) => (
              <NotificationCard key={notif.id} notif={notif} />
            ))}
          </div>

          <div className="mt-7 text-center pb-8">
            <Button variant="ghost" className="text-[13px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              Load older notifications <ChevronDown className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}