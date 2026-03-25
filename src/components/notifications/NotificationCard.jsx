import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Megaphone, Info, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns"; // Helps format "2 hours ago"
import { useDispatch } from "react-redux";
import { markNotificationAsRead } from "../../features/notifications"; // Adjust path to your barrel file
import { Link } from "react-router-dom";

export function NotificationCard({ notif }) {
  const dispatch = useDispatch();

  // 1. Dynamic Time Formatting (e.g., "2 mins ago")
  const timeAgo = notif.createdAt
    ? formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })
    : "Just now";

  // 2. Dynamic Icons & Colors based on our Backend Categories
  let icon, iconBg, avatarInitials;

  switch (notif.category) {
    case "MATCH":
      icon = <Search className="w-[18px] h-[18px]" />;
      iconBg = "bg-blue-50 text-blue-600 dark:bg-blue-900/30";
      break;
    case "MESSAGE":
      icon = <MessageSquare className="w-[18px] h-[18px]" />;
      iconBg = "bg-gradient-to-br from-teal-500 to-teal-600 text-white";
      // If we populate sender info later, we can extract initials here
      avatarInitials = notif.title.substring(0, 2).toUpperCase();
      break;
    case "ALERT":
      icon = <Megaphone className="w-[18px] h-[18px]" />;
      iconBg = "bg-orange-50 text-orange-600 dark:bg-orange-900/30";
      break;
    default: // SYSTEM
      icon = <Info className="w-[18px] h-[18px]" />;
      iconBg = "bg-secondary text-muted-foreground";
  }

  // 3. Mark as Read Handler
  const handleMarkAsRead = () => {
    if (!notif.isRead) {
      dispatch(markNotificationAsRead(notif._id));
    }
  };

  return (
    <div
      onClick={handleMarkAsRead} // Clicking the card marks it as read
      className={`group relative flex gap-3.5 p-[18px] rounded-xl border transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 cursor-pointer
        ${notif.isRead
          ? "border-border bg-card opacity-70" // Dimmed if read
          : "border-blue-100 dark:border-blue-900/50 bg-blue-50/30 dark:bg-slate-900 shadow-sm hover:shadow-md hover:bg-secondary/40"
        }
      `}
    >
      {/* Red Dot (Unread Indicator) */}
      {!notif.isRead && (
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.8)]"></div>
      )}

      {/* Icon or Avatar */}
      <div className="pl-2 shrink-0">
        {notif.category === "MESSAGE" && avatarInitials ? (
          <Avatar className={`w-10 h-10 rounded-full ${iconBg}`}>
            <AvatarFallback className="bg-transparent text-[13px] font-bold">
              {avatarInitials}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
            {icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className={`font-semibold text-[13.5px] truncate ${!notif.isRead ? "text-slate-900 dark:text-white" : "text-foreground"}`}>
            {notif.title}
          </h4>
          <span className="text-[11.5px] text-muted-foreground whitespace-nowrap shrink-0 ml-2">
            {timeAgo}
          </span>
        </div>

        {/* Render HTML dangerously ONLY if you trust the backend source, otherwise just render text */}
        <p
          className="text-[13px] text-muted-foreground leading-[1.55] mb-3"
          dangerouslySetInnerHTML={{ __html: notif.message }}
        />

        {/* Dynamic Action Buttons based on Category */}
        {notif.category === "MATCH" && (
          <div className="flex gap-2">
            {/* If we have data.matchId, we can link directly to it! */}
            <Link to={notif.data?.matchId ? `/matches/${notif.data.matchId}` : "#"}>
              <Button size="sm" className="h-7 text-[12.5px] px-3 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleMarkAsRead}>
                View Match
              </Button>
            </Link>
            <Button size="sm" variant="secondary" className="h-7 text-[12.5px] px-3" onClick={handleMarkAsRead}>
              Dismiss
            </Button>
          </div>
        )}

        {notif.category === "MESSAGE" && (
          <Link to="/chat">
            <Button size="sm" variant="outline" className="h-7 text-[12.5px] px-3 text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-blue-900/30" onClick={handleMarkAsRead}>
              Reply
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}