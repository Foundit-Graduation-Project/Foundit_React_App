import { ChevronLeft, BadgeCheck, ShieldAlert } from "lucide-react";
import { useSelector } from "react-redux";
import { Skeleton } from "./Skeleton";

export function ChatHeader({
  activeChat,
  isLoading,
  isOtherUserTyping,
  onBack,
}) {
  const { onlineUsers } = useSelector((state) => state.chat);
  // Check if this chat's counterparty implies an online state
  const isOnline = activeChat && onlineUsers.includes(activeChat.otherUserId);

  return (
    <div className="h-19 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={onBack}
          className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-32 h-4" />
              <Skeleton className="w-20 h-3" />
            </div>
          </div>
        ) : (
          <>
            <div className="relative shrink-0 hidden sm:block">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border ${activeChat?.otherUserId === 'support_admin' ? 'bg-[#1d63ed] text-white border-blue-600' : 'bg-blue-100 text-blue-600 border-blue-200'}`}>
                {activeChat?.otherUserId === 'support_admin' ? <ShieldAlert className="w-6 h-6" /> : activeChat?.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
            </div>
            <div>
              <h2 className={`text-[17px] font-bold leading-tight flex items-center gap-1.5 ${activeChat?.otherUserId === 'support_admin' ? 'text-[#1d63ed]' : 'text-slate-900'}`}>
                {activeChat?.name || "User"}
                {activeChat?.otherUserId === 'support_admin' && <BadgeCheck className="w-4 h-4 text-[#1d63ed]" />}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div
                  className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-500" : "bg-slate-300"}`}
                ></div>
                {isOtherUserTyping ? (
                  <span className="text-[13px] font-medium text-blue-500 italic">
                    typing...
                  </span>
                ) : (
                  <span className="text-[13px] font-medium text-slate-500">
                    {isOnline ? "Active now" : "Offline"}
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
