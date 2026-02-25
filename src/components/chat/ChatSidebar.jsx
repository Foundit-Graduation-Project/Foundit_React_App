import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search } from 'lucide-react';
import { setActiveChat, setSearchQuery } from '../../features/chat/chatSlice';
import { Skeleton } from './Skeleton';

export function ChatSidebar({ isHiddenOnMobile }) {
  const dispatch = useDispatch();
  const { chats, activeChatId, isLoading, searchQuery, typingUsers } = useSelector(state => state.chat);

  const filteredChats = chats.filter(chat => 
    chat.productName.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.sellerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`w-full md:w-[320px] lg:w-[380px] border-r border-slate-200 flex flex-col bg-white shrink-0 transition-transform ${isHiddenOnMobile ? 'hidden md:flex' : 'flex'}`}>
      <div className="p-4 border-b border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg pl-9 pr-4 py-2 text-sm outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          [1, 2, 3, 4].map(i => (
            <div key={i} className="flex gap-3 p-4 border-b border-slate-50">
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2 py-1">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))
        ) : filteredChats.length === 0 ? (
          <div className="p-6 text-center text-slate-500 text-sm">No conversations found.</div>
        ) : (
          filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => dispatch(setActiveChat(chat.id))}
              className={`flex items-start gap-3 p-4 cursor-pointer border-b border-slate-50 transition-colors ${activeChatId === chat.id ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
            >
              <div className="relative shrink-0">
                <div className={`w-12 h-12 rounded-lg ${chat.productColor} flex items-center justify-center text-xs font-bold text-slate-400 border border-slate-100`}>Img</div>
                {chat.online && <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h3 className="text-sm font-bold text-slate-900 truncate pr-2">{chat.productName}</h3>
                  <span className={`text-xs whitespace-nowrap ${chat.unread ? 'text-blue-600 font-bold' : 'text-slate-400'}`}>{chat.time}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium mb-1 truncate">{chat.sellerName}</p>
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-sm truncate ${typingUsers[chat.id] ? 'text-blue-500 italic' : chat.unread ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                    {typingUsers[chat.id] ? 'typing...' : chat.lastMessage}
                  </p>
                  {chat.unread && !typingUsers[chat.id] && <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></div>}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> edade4da5cc3c73f1d50ad22ec23ec132f0febe9
