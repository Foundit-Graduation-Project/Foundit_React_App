import React, { useRef, useLayoutEffect } from "react";
import { Skeleton, MessageBubble, TypingBubble } from "./Skeleton";

export function ChatMessageList({
  isLoading,
  activeMessages = [],
  activeChat = {},
  isOtherUserTyping,
  onFetchMore,
  hasMoreMessages = true,
}) {
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const previousScrollHeightRef = useRef(0);

  const handleScroll = (e) => {
    const container = e.target;
    // Trigger when scrolled to absolute top
    if (container.scrollTop === 0 && !isLoading && activeMessages.length > 0 && hasMoreMessages) {
      previousScrollHeightRef.current = container.scrollHeight;
      if (onFetchMore) onFetchMore(activeMessages[0].id);
    }
  };

  // Restoring scroll position logic via React's standard layout lifecycle
  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (container && previousScrollHeightRef.current > 0) {
      const heightDifference =
        container.scrollHeight - previousScrollHeightRef.current;
      if (heightDifference > 0) {
        container.scrollTop = heightDifference;
      }
      previousScrollHeightRef.current = 0; // reset
    } else if (
      container &&
      !isLoading &&
      previousScrollHeightRef.current === 0
    ) {
      // scroll to bottom on initial load or new message
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeMessages.length, isLoading, isOtherUserTyping]);

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6"
    >
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
            const showDateSeparator =
              index === 0 || msg.date !== previousMsg?.date;

            // 2. Show "NEW MESSAGES" if this msg is new, but the one before it wasn't
            const showNewBadge = msg.isNew && !previousMsg?.isNew;

            return (
              <React.Fragment key={msg.id}>
                {/* --- DATE SEPARATOR --- */}
                {showDateSeparator && msg.date && (
                  <div className="flex justify-center mt-2 mb-2">
                    <span className="bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 shadow-sm border border-border/50">
                      {msg.date}
                    </span>
                  </div>
                )}

                {/* --- NEW MESSAGES SEPARATOR --- */}
                {showNewBadge && (
                  <div className="flex justify-center my-3">
                    <span className="bg-secondary text-muted-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full transition-colors duration-300 shadow-sm border border-border/50">
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
