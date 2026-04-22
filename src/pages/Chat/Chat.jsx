// Chat.jsx (MessagesApp)
// Why: Top-level chat page component.
// Responsibilities:
//   1. Fetch conversations on mount (populates sidebar)
//   2. Connect socket with JWT token
//   3. Listen for real-time 'receiveMessage' socket events → dispatch to Redux
//   4. Fetch messages when user selects a conversation
//   5. Handle responsive layout (mobile: show sidebar OR chat, not both)

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChatArea } from "../../components/chat/ChatArea";
import { ChatSidebar } from "../../components/chat/ChatSidebar";
import { Header } from "../../components/chat/Header";
import {
  fetchConversations,
  fetchMessages,
  addMessage,
  setTypingStatus,
  markMessagesSeen,
  setOnlineUsers,
} from "../../features/chat/chatSlice";
import { connectSocket, disconnectSocket } from "../../services/socket";

export default function MessagesApp() {
  const dispatch = useDispatch();
  const { activeChatId } = useSelector((state) => state.chat);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    // 1. Fetch sidebar conversations from backend
    dispatch(fetchConversations());

    // 2. Connect socket — token stored in localStorage after login
    const token = localStorage.getItem("accessToken") || "";
    const socket = connectSocket(token);

    // 3. Listen for incoming real-time messages
    // Backend emits 'receiveMessage' after HTTP controller saves to DB
    const handleReceiveMessage = (msg) => {
      dispatch(addMessage(msg));

      // Real-time Seen: If I'm looking at this chat RIGHT NOW, tell the backend I saw it
      const msgChatId =
        msg.conversationId?._id ||
        msg.conversationId ||
        msg.conversation?._id ||
        msg.conversation;
      if (msgChatId === activeChatId) {
        socket.emit("markAsSeen", { conversationId: activeChatId });
      }
    };

    const handleMessagesSeen = ({ conversationId }) => {
      dispatch(markMessagesSeen({ conversationId }));
    };

    const handleTyping = ({ conversationId }) => {
      dispatch(setTypingStatus({ chatId: conversationId, isTyping: true }));
    };

    const handleStopTyping = ({ conversationId }) => {
      dispatch(setTypingStatus({ chatId: conversationId, isTyping: false }));
    };

    const handleOnlineUsers = (usersArray) => {
      dispatch(setOnlineUsers(usersArray));
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("messagesSeen", handleMessagesSeen);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);
    socket.on("onlineUsers", handleOnlineUsers);

    // Real-time Seen: Mark as seen when opening the chat
    if (activeChatId) {
      socket.emit("markAsSeen", { conversationId: activeChatId });
    }

    // Optional: Also mark as seen when the user refocuses the tab
    const handleFocus = () => {
      if (activeChatId)
        socket.emit("markAsSeen", { conversationId: activeChatId });
    };
    window.addEventListener("focus", handleFocus);

    // Cleanup
    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("messagesSeen", handleMessagesSeen);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
      socket.off("onlineUsers", handleOnlineUsers);
      window.removeEventListener("focus", handleFocus);
    };
  }, [dispatch, activeChatId]); // Added activeChatId to re-run seen logic when switching chats

  // 4. Fetch messages when user clicks a conversation in the sidebar
  useEffect(() => {
    if (activeChatId) {
      dispatch(fetchMessages({ conversationId: activeChatId }));
    }
  }, [dispatch, activeChatId]);

  // Responsive layout tracking
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-background font-sans text-foreground overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <ChatSidebar isHiddenOnMobile={activeChatId !== null && isMobile} />
        <ChatArea isHiddenOnMobile={activeChatId === null && isMobile} />
      </main>
    </div>
  );
}
