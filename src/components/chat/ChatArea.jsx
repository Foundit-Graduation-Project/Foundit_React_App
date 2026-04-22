import { useSelector, useDispatch } from "react-redux";
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
  const activeMessages = messages.filter((m) => m.chatId === activeChatId);
  const isOtherUserTyping = typingUsers[activeChatId];

  // === HTTP REQUEST: SEND MESSAGE ===
  const handleSendMessage = async (text) => {
    const msgData = {
      conversationId: activeChatId,
      content: text,
    };

    try {
      // Send HTTP request to backend
      await dispatch(sendMessageAPI(msgData)).unwrap();

      // Backend saves it and emits socket event.
      // The socket listener in Chat.jsx will receive it and update the UI.
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // === HTTP REQUEST: PAGINATION ===
  const handleFetchMore = (firstMessageId) => {
    if (!hasMoreMessages) return; // Stop when all history is loaded
    dispatch(
      fetchMessages({ conversationId: activeChatId, before: firstMessageId }),
    );
  };

  if (!activeChat && !isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50/30">
        Select a conversation
      </div>
    );
  }

  return (
    <section
      className={`flex-1 flex flex-col bg-slate-50/30 ${isHiddenOnMobile ? "hidden md:flex" : "flex"}`}
    >
      <ChatHeader
        activeChat={activeChat}
        isLoading={isLoading}
        isOtherUserTyping={isOtherUserTyping}
        onBack={() => dispatch(setActiveChat(null))}
      />

      {/* we don't need is loading or active chat or is other user typing you can get them from slice */}
      <ChatMessageList
        isLoading={isLoading}
        activeMessages={activeMessages}
        activeChat={activeChat}
        isOtherUserTyping={isOtherUserTyping}
        onFetchMore={handleFetchMore}
        hasMoreMessages={hasMoreMessages}
      />

      <ChatInputArea
        isLoading={isLoading}
        activeChatId={activeChatId}
        otherUserId={activeChat?.otherUserId}
        onSendMessage={handleSendMessage}
      />
    </section>
  );
}
