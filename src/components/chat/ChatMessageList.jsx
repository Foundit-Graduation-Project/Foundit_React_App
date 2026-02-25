import React, { useEffect, useRef } from 'react';
import { Skeleton, MessageBubble, TypingBubble } from './Skeleton';

export function ChatMessageList({ isLoading, activeMessages, activeChat, isOtherUserTyping }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeMessages, isLoading, isOtherUserTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="w-[60%] h-16 rounded-2xl rounded-tl-sm" />
          <Skeleton className="w-[50%] h-12 rounded-2xl rounded-tr-sm self-end" />
          <Skeleton className="w-[70%] h-20 rounded-2xl rounded-tl-sm" />
        </div>
      ) : (
        <>
          {activeMessages.map((msg, index) => {
            const previousMsg = activeMessages[index - 1];
            
            // 1. Show Date Separator if it's the first message OR if the date changed
            const showDateSeparator = index === 0 || msg.date !== previousMsg?.date;
            
            // 2. Show "NEW MESSAGES" if this msg is new, but the one before it wasn't
            const showNewBadge = msg.isNew && !previousMsg?.isNew;

            return (
              <React.Fragment key={msg.id}>
                
                {/* --- DATE SEPARATOR --- */}
                {showDateSeparator && msg.date && (
                  <div className="flex justify-center mt-2 mb-2">
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {msg.date}
                    </span>
                  </div>
                )}

                {/* --- NEW MESSAGES SEPARATOR --- */}
                {showNewBadge && (
                  <div className="flex justify-center my-3">
                    <span className="bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      New Messages
                    </span>
                  </div>
                )}

                <MessageBubble message={msg} activeChat={activeChat} />
              </React.Fragment>
            );
          })}
          
          {isOtherUserTyping && <TypingBubble activeChat={activeChat} />}
          
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}