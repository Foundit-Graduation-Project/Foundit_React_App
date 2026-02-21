import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function NotificationCard({ notif }) {
  return (
    <div className="group relative flex gap-3.5 p-[18px] rounded-xl border border-border bg-card hover:bg-secondary/40 hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
      {notif.unread && (
        <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-600"></div>
      )}

      <div className="pl-2 shrink-0">
        {notif.avatar ? (
          <Avatar className={`w-10 h-10 rounded-full ${notif.iconBg}`}>
            <AvatarFallback className="bg-transparent text-[13px] font-bold">
              {notif.avatar}
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${notif.iconBg}`}>
            {notif.icon}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-[13.5px] text-foreground truncate">{notif.title}</h4>
          <span className="text-[11.5px] text-muted-foreground whitespace-nowrap shrink-0 ml-2">{notif.time}</span>
        </div>
        <p className="text-[13px] text-muted-foreground leading-[1.55] mb-3">{notif.desc}</p>

        {notif.type === "match" && (
          <div className="flex gap-2">
            <Button size="sm" className="h-7 text-[12.5px] px-3 bg-blue-600 hover:bg-blue-700 text-white">View Match</Button>
            <Button size="sm" variant="secondary" className="h-7 text-[12.5px] px-3">Dismiss</Button>
          </div>
        )}
        {notif.type === "message" && notif.avatar === "SJ" && (
          <Button size="sm" variant="outline" className="h-7 text-[12.5px] px-3 text-blue-600 border-blue-200 hover:bg-blue-50 dark:border-blue-900 dark:hover:bg-blue-900/30">
            Reply to Sarah
          </Button>
        )}
      </div>
    </div>
  );
}