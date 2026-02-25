import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse rounded-md bg-slate-200/60 ${className}`} />
);

export const MessageBubble = ({ message, activeChat }) => {
  const isOther = message.sender === 'other';

  return (
    <div className={`flex gap-3 max-w-[85%] md:max-w-[75%] ${isOther ? 'self-start' : 'self-end flex-row-reverse'} animate-in fade-in slide-in-from-bottom-2`}>
      {isOther && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-1 ${activeChat.avatarColor}`}>
          {activeChat.avatarInitials}
        </div>
      )}

      <div className={`flex flex-col ${isOther ? 'items-start' : 'items-end'}`}>
        <div className={`px-4 py-3 text-[15px] leading-relaxed shadow-sm ${isOther ? 'bg-slate-100 text-slate-800 rounded-2xl rounded-tl-sm' : 'bg-blue-600 text-white rounded-2xl rounded-tr-sm'}`}>
          {message.text}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 px-1">
          <span className="text-[11px] font-medium text-slate-400">{message.time}</span>
          {!isOther && message.status === 'sent' && <Check className="w-3.5 h-3.5 text-slate-400" />}
          {!isOther && message.status === 'delivered' && <CheckCheck className="w-3.5 h-3.5 text-slate-400" />}
          {!isOther && message.status === 'seen' && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
        </div>
      </div>
    </div>
  );
};

export const TypingBubble = ({ activeChat }) => (
  <div className="flex gap-3 max-w-[85%] md:max-w-[75%] self-start animate-in fade-in slide-in-from-bottom-2">
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-1 ${activeChat.avatarColor}`}>
      {activeChat.avatarInitials}
    </div>
    <div className="bg-slate-100 px-4 py-4 rounded-2xl rounded-tl-sm flex items-center gap-1.5 shadow-sm h-[44px]">
      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
    </div>
  </div>
);