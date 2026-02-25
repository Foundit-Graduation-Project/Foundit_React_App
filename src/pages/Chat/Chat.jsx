import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChatArea } from '../../components/chat/ChatArea';
import { ChatSidebar } from '../../components/chat/ChatSidebar';
import { Header } from '../../components/chat/Header';
import { fetchChatData } from '../../features/chat/chatSlice';

export default function MessagesApp() {
  const dispatch = useDispatch();
  const { activeChatId } = useSelector(state => state.chat);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Load Initial Data (Triggers your Skeletons via async thunk)
  useEffect(() => {
    dispatch(fetchChatData());
  }, [dispatch]);

  // Responsive UI Tracking for the active mobile view
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-white font-sans text-slate-900 overflow-hidden">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <ChatSidebar 
          isHiddenOnMobile={activeChatId !== null && isMobile} 
        />
        <ChatArea 
          isHiddenOnMobile={activeChatId === null && isMobile}
        />
      </main>
    </div>
  );
}