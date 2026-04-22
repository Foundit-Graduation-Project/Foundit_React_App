import { MapPin, MoreVertical, ChevronLeft } from 'lucide-react';
import { Skeleton } from './Skeleton';

export function ChatHeader({ activeChat, isLoading, isOtherUserTyping, onBack, onShareLocation }) {
  return (
    <div className="h-19 px-4 md:px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3 md:gap-4">
        <button onClick={onBack} className="md:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100">
          <ChevronLeft className="w-6 h-6" />
        </button>

        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="space-y-2"><Skeleton className="w-32 h-4" /><Skeleton className="w-20 h-3" /></div>
          </div>
        ) : (
          <>
            <div className={`w-12 h-12 rounded-lg ${activeChat?.productColor || 'bg-amber-100'} border border-slate-100 shrink-0 hidden sm:block`}></div>
            <div>
              <h2 className="text-[17px] font-bold text-slate-900 leading-tight">{activeChat?.productName}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className={`w-2 h-2 rounded-full ${activeChat?.online ? 'bg-green-500' : 'bg-slate-300'}`}></div>
                {isOtherUserTyping ? (
                  <span className="text-[13px] font-medium text-blue-500 italic">typing...</span>
                ) : (
                  <span className="text-[13px] font-medium text-slate-500">{activeChat?.sellerName} • {activeChat?.online ? 'Active now' : 'Offline'}</span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}