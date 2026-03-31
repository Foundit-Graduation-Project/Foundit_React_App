import { useSelector, useDispatch } from "react-redux";
import { MessageSquare } from "lucide-react";
import {
  setActiveChat,
  sendMessageAPI,
  fetchMessages,
} from "../../features/chat/chatSlice";
import { ChatMessageList } from "./ChatMessageList";
import { ChatHeader } from "./ChatHeader";
import { ChatInputArea } from "./ChatInputArea";

export function ChatArea({ isHiddenOnMobile }) {
  const dispatch = useDispatch();
  const { chats, messages, activeChatId, isLoading, typingUsers, hasMoreMessages } = useSelector(
    (state) => state.chat,
  );

  const activeChat = chats.find((c) => c.id === activeChatId);
  // (We don't need activeMessages here since ChatMessageList handles it, 
  // but we keep consistent with original logic if needed)

  // === HTTP REQUEST: SEND MESSAGE ===
  const handleSendMessage = async (text, files) => {
    const msgData = {
      conversationId: activeChatId,
      content: text || undefined,
      attachments: files && files.length > 0 ? files : undefined
    };

    try {
      await dispatch(sendMessageAPI(msgData)).unwrap();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // === HTTP REQUEST: PAGINATION ===
  const handleFetchMore = (firstMessageId) => {
    if (!hasMoreMessages) return; 
    dispatch(
      fetchMessages({ conversationId: activeChatId, before: firstMessageId }),
    );
  };

  return (
    <div
      className={`flex-1 flex flex-col min-w-0 bg-background transition-all duration-300 ${isHiddenOnMobile ? "hidden md:flex" : "flex"}`}
    >
      {activeChatId ? (
        <>
          <ChatHeader 
            activeChat={activeChat} 
            isLoading={isLoading} 
            isOtherUserTyping={!!typingUsers[activeChatId]} 
            onBack={() => dispatch(setActiveChat(null))} 
          />
          <ChatMessageList 
             isLoading={isLoading}
             activeMessages={messages.filter((m) => m.chatId === activeChatId)}
             activeChat={activeChat}
             isOtherUserTyping={!!typingUsers[activeChatId]}
             onFetchMore={handleFetchMore}
             hasMoreMessages={hasMoreMessages}
          />
          <ChatInputArea 
             isLoading={isLoading}
             activeChatId={activeChatId}
             otherUserId={activeChat?.otherUserId}
             onSendMessage={handleSendMessage}
          />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 bg-background transition-colors duration-300">
          <div className="max-w-sm text-center">
            <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400 shadow-sm border border-border">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Select a conversation</h3>
            <p className="text-muted-foreground">
              Choose someone from the menu on the left to start chatting and searching for your lost items together.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
