import React, { useState, useRef } from 'react';
import { Paperclip, Smile, Send } from 'lucide-react';

export function ChatInputArea({ isLoading, activeChatId, onSendMessage }) {
  const [messageInput, setMessageInput] = useState("");
  const fileInputRef = useRef(null);
  const myTypingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    
    // socket.emit("typing_start", { chatId: activeChatId });
    if (myTypingTimeoutRef.current) clearTimeout(myTypingTimeoutRef.current);
    
    myTypingTimeoutRef.current = setTimeout(() => {
      // socket.emit("typing_stop", { chatId: activeChatId });
    }, 1500);
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    if (myTypingTimeoutRef.current) clearTimeout(myTypingTimeoutRef.current);
    // socket.emit("typing_stop", { chatId: activeChatId });

    onSendMessage(messageInput.trim());
    setMessageInput(""); 
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onSendMessage(`📎 Attached File: ${file.name}`);
    }
    e.target.value = ''; 
  };

  return (
    <form onSubmit={handleSendSubmit} className="p-4 bg-white border-t border-slate-200 shrink-0">
      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
        
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
        <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg shrink-0">
          <Paperclip className="w-5 h-5" />
        </button>
        
        <input 
          type="text" 
          placeholder="Type a message..." 
          value={messageInput}
          onChange={handleInputChange}
          disabled={isLoading}
          className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-2 text-[15px] outline-none placeholder:text-slate-400 disabled:opacity-50"
        />
        
        {/* <button type="button" className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg shrink-0">
          <Smile className="w-5 h-5" />
        </button>
         */}
        <button type="submit" disabled={isLoading || !messageInput.trim()} className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 shadow-sm shrink-0 disabled:opacity-50">
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </form>
  );
}