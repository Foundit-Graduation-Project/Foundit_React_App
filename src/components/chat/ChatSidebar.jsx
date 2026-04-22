import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Search, BadgeCheck } from "lucide-react";
import { setActiveChat, setSearchQuery } from "../../features/chat/chatSlice";
import { Skeleton } from "./Skeleton";

export function ChatSidebar({ isHiddenOnMobile }) {
  const dispatch = useDispatch();
  const {
    chats,
    activeChatId,
    isLoading,
    searchQuery,
    typingUsers = {},
    onlineUsers = [],
  } = useSelector((state) => state.chat);

  // Search by the other user's name (backend returns otherUser.name as chat.name)
  const filteredChats = chats.filter((chat) =>
    chat.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <aside
      className={`w-full md:w-[320px] lg:w-[380px] border-r border-border flex flex-col bg-card shrink-0 transition-all duration-300 ${isHiddenOnMobile ? "hidden md:flex" : "flex"}`}
    >
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full bg-secondary border-transparent focus:bg-card focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/30 rounded-lg pl-9 pr-4 py-2 text-sm outline-none transition-all text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {isLoading ? (
          // Skeleton placeholders while conversations load
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="flex gap-3 p-4 border-b border-border/50">
              <Skeleton className="w-12 h-12 rounded-full shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : filteredChats.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No conversations found.
          </div>
        ) : (
          filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => dispatch(setActiveChat(chat.id))}
              className={`flex items-start gap-3 p-4 cursor-pointer border-b border-border/50 transition-colors ${activeChatId === chat.id ? "bg-secondary/80" : "hover:bg-secondary/40"}`}
            >
              {/* Avatar fallback: show first letter of name */}
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border transition-colors ${chat.otherUserId === 'support_admin' ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20' : 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'}`}>
                  {chat.otherUserId === 'support_admin' ? "HQ" : chat.name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                {/* Online Indicator Badge */}
                {onlineUsers?.includes(chat.otherUserId) && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-card rounded-full shadow-sm"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className={`text-sm font-bold truncate pr-2 flex items-center gap-1 transition-colors ${chat.otherUserId === 'support_admin' ? 'text-blue-600 dark:text-blue-400' : 'text-foreground'}`}>
                    {chat.name}
                    {chat.otherUserId === 'support_admin' && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                  </h3>
                  <span
                    className={`text-xs whitespace-nowrap transition-colors ${chat.unread ? "text-blue-600 dark:text-blue-400 font-bold" : "text-muted-foreground"}`}
                  >
                    {chat.time}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`text-sm truncate transition-colors ${typingUsers[chat.id] ? "text-blue-500 italic" : chat.unread ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                  >
                    {typingUsers[chat.id]
                      ? "typing..."
                      : chat.lastMessage || "No messages yet"}
                  </p>
                  {chat.unread && !typingUsers[chat.id] && (
                    <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 shadow-sm shadow-blue-500/50" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
