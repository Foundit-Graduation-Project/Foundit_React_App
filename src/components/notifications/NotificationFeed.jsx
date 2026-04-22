import { useState } from "react";
import { Check, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopBar } from "./TopBar";
import { NotificationCard } from "./NotificationCard";

// --- Redux Imports ---
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllNotifications,
  selectHasMoreNotifications,
  selectCurrentPage,
  selectIsFetchingMore,
  selectNotificationsLoading, // 👈 1. Import the loading selector
  fetchNotifications,
  markAllNotificationsAsRead
} from "../../features/notifications";
import toast from "react-hot-toast";

// --- 2. SKELETON COMPONENT (Looks like a loading card) ---
const NotificationSkeleton = () => (
  <div className="flex gap-3.5 p-[18px] rounded-xl border border-border bg-card/50 animate-pulse">
    {/* Avatar Skeleton */}
    <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"></div>

    {/* Text Skeleton */}
    <div className="flex-1 space-y-3 py-1">
      <div className="flex justify-between">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-12"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export function NotificationFeed({ onToggleSidebar, isMobile }) {
  const dispatch = useDispatch();

  // 3. Redux State Selectors
  const notifications = useSelector(selectAllNotifications) || [];
  const hasMore = useSelector(selectHasMoreNotifications);
  const currentPage = useSelector(selectCurrentPage) || 1;
  const isFetchingMore = useSelector(selectIsFetchingMore);
  const isLoading = useSelector(selectNotificationsLoading); // 👈 4. Grab loading state

  // Local State for Tabs
  const [activeTab, setActiveTab] = useState("all");

  const tabStyles = "data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:shadow-none bg-transparent rounded-none px-1 pb-3 pt-2 text-[13px] font-medium text-muted-foreground focus-visible:ring-0 focus-visible:outline-none cursor-pointer transition-colors";

  // Dynamic Filtering Logic
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === "all") return true;
    if (activeTab === "matches") return notif.category === "MATCH";
    if (activeTab === "messages") return notif.category === "MESSAGE";
    if (activeTab === "alerts") return notif.category === "ALERT" || notif.category === "SYSTEM";
    return true;
  });

  const counts = {
    all: notifications.length,
    matches: notifications.filter(n => n.category === "MATCH").length,
    messages: notifications.filter(n => n.category === "MESSAGE").length,
    alerts: notifications.filter(n => n.category === "ALERT" || n.category === "SYSTEM").length,
  };

  const TABS = [
    { id: "all", label: "All", count: counts.all },
    { id: "matches", label: "Matches", count: counts.matches },
    { id: "messages", label: "Messages", count: counts.messages },
    { id: "alerts", label: "Alerts", count: counts.alerts },
  ];

  // Handlers
  const handleMarkAllRead = async () => {
    if (notifications.length === 0) return;
    try {
      await dispatch(markAllNotificationsAsRead()).unwrap();
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error(error || "Failed to mark notifications as read");
    }
  };

  const handleLoadMore = () => {
    dispatch(fetchNotifications(currentPage + 1));
  };

  return (
    <div className="flex flex-col flex-1 min-w-0 bg-background overflow-hidden w-full">
      <TopBar onToggleSidebar={onToggleSidebar} isMobile={isMobile} />

      <div className="flex-1 overflow-y-auto px-4 py-8 md:px-12 w-full custom-scrollbar">
        <div className="max-w-4xl w-full mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-[22px] font-bold tracking-tight text-foreground">Notifications</h1>
              <p className="text-[13px] text-muted-foreground mt-1">Manage your alerts and match updates</p>
            </div>

            <Button
              variant="outline"
              className="h-9 text-[13px] shrink-0"
              onClick={handleMarkAllRead}
              disabled={notifications.length === 0 || isLoading}
            >
              <Check className="w-3.5 h-3.5 mr-2" /> Mark all as read
            </Button>
          </div>

          {/* Dynamic Tabs */}
          <Tabs defaultValue="all" className="mb-5" onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 gap-6 overflow-x-auto custom-scrollbar">
              {TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className={tabStyles}>
                  {tab.label}
                  <Badge
                    variant="secondary"
                    className={`ml-2 h-5 px-1.5 text-[11px] transition-colors ${activeTab === tab.id
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                  >
                    {tab.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Notifications List & Skeletons */}
          <div className="space-y-3 w-full">
            {isLoading ? (
              // 👇 5. If loading, show 4 skeleton cards!
              <>
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
                <NotificationSkeleton />
              </>
            ) : filteredNotifications.length > 0 ? (
              // If done loading and we have data, show the real cards
              filteredNotifications.map((notif) => (
                <NotificationCard key={notif._id} notif={notif} />
              ))
            ) : (
              // Empty State UI
              <div className="text-center py-16 px-4 border border-dashed border-gray-200 dark:border-slate-800 rounded-xl bg-gray-50/50 dark:bg-slate-900/50">
                <div className="bg-white dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <Check className="text-blue-500 w-8 h-8 opacity-50" />
                </div>
                <h3 className="text-gray-900 dark:text-white font-bold text-base">You're all caught up!</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">No new notifications in this category.</p>
              </div>
            )}
          </div>

          {/* Pagination: Load More Button */}
          {filteredNotifications.length > 0 && hasMore && !isLoading && (
            <div className="mt-8 text-center pb-8">
              <Button
                variant="ghost"
                onClick={handleLoadMore}
                disabled={isFetchingMore}
                className="text-[13px] text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 disabled:opacity-70 transition-all"
              >
                {isFetchingMore ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading more...</>
                ) : (
                  <>Load older notifications <ChevronDown className="w-3.5 h-3.5 ml-1.5" /></>
                )}
              </Button>
            </div>
          )}

          {/* Pagination: End of List Message */}
          {filteredNotifications.length > 0 && !hasMore && !isLoading && (
            <div className="mt-8 text-center pb-8 text-xs font-medium text-gray-400 dark:text-slate-500">
              No more notifications to load.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}