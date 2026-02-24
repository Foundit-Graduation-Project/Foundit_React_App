import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addMessage, setActiveChat } from '../../features/chat/chatSlice';
import { ChatMessageList } from './ChatMessageList';
import { ChatHeader } from './ChatHeader';
import { ChatInputArea } from './ChatInputArea';


export function ChatArea({ isHiddenOnMobile }) {
  const dispatch = useDispatch();
  const { chats, messages, activeChatId, isLoading, typingUsers } = useSelector(state => state.chat);
  
  const activeChat = chats.find(c => c.id === activeChatId);
  const activeMessages = messages.filter(m => m.chatId === activeChatId);
  const isOtherUserTyping = typingUsers[activeChatId];

  // === 🔌 SOCKET.IO PREP: SEND MESSAGE ===
  const handleSendMessage = (text) => {
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newMsg = {
      id: Date.now(), 
      chatId: activeChatId,
      text: text,
      sender: "me",
      time: timeString,
      status: "sent"
    };

    // 1. Dispatch locally via the action from your chatSlice
    dispatch(addMessage(newMsg));

    // 2. Send via socket
    // socket.emit("send_message", newMsg);
  };

  const handleShareLocation = () => {
    handleSendMessage("📍 Shared Location: 123 Main Street, Central District");
  };

  if (!activeChat && !isLoading) {
    return <div className="flex-1 flex items-center justify-center text-slate-400 bg-slate-50/30">Select a conversation</div>;
  }

  return (
    <section className={`flex-1 flex flex-col bg-slate-50/30 ${isHiddenOnMobile ? 'hidden md:flex' : 'flex'}`}>
      
      <ChatHeader 
        activeChat={activeChat} 
        isLoading={isLoading} 
        isOtherUserTyping={isOtherUserTyping} 
        onBack={() => dispatch(setActiveChat(null))}
        onShareLocation={handleShareLocation}
      />
      
      <ChatMessageList 
        isLoading={isLoading}
        activeMessages={activeMessages}
        activeChat={activeChat}
        isOtherUserTyping={isOtherUserTyping}
      />
      
      <ChatInputArea 
        isLoading={isLoading}
        activeChatId={activeChatId}
        onSendMessage={handleSendMessage}
      />
      
    </section>
  );
}