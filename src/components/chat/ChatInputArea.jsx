import React, { useState, useRef } from "react";
import { Paperclip, Smile, Send, X, Image as ImageIcon } from "lucide-react";
import { getSocket } from "../../services/socket";

export function ChatInputArea({
  isLoading,
  activeChatId,
  otherUserId,
  onSendMessage,
}) {
  const [messageInput, setMessageInput] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const fileInputRef = useRef(null);
  const myTypingTimeoutRef = useRef(null);

  const emitStopTyping = () => {
    const socket = getSocket();
    if (socket && activeChatId && otherUserId) {
      socket.emit("stopTyping", {
        conversationId: activeChatId,
        receiverId: otherUserId,
      });
    }
  };

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);

    const socket = getSocket();
    if (socket && activeChatId && otherUserId) {
      socket.emit("typing", {
        conversationId: activeChatId,
        receiverId: otherUserId,
      });

      if (myTypingTimeoutRef.current) clearTimeout(myTypingTimeoutRef.current);
      myTypingTimeoutRef.current = setTimeout(() => {
        emitStopTyping();
      }, 1500);
    }
  };

  const handleSendSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim() && selectedFiles.length === 0) return;
  
    if (myTypingTimeoutRef.current) clearTimeout(myTypingTimeoutRef.current);
    emitStopTyping();
  
    onSendMessage(messageInput.trim(), selectedFiles);
    
    setMessageInput("");
    setSelectedFiles([]);
    previews.forEach(url => URL.revokeObjectURL(url));
    setPreviews([]);
  };

  const handleFileUpload = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newFiles = [...selectedFiles, ...files].slice(0, 5);
      setSelectedFiles(newFiles);

      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews].slice(0, 5));
    }
    e.target.value = "";
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  return (
    <form
      onSubmit={handleSendSubmit}
      className="p-4 bg-white border-t border-slate-200 shrink-0"
    >
      {/* Previews */}
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {previews.map((url, index) => (
            <div key={url} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-200 group">
              <img src={url} alt="preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-0.5 right-0.5 bg-slate-900/60 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 bg-slate-100/80 p-1.5 rounded-xl border border-slate-200/60 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all">
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isLoading || selectedFiles.length >= 5}
          className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg shrink-0 transition-all disabled:opacity-50"
        >
          <ImageIcon className="w-5 h-5" />
        </button>

        <input
          type="text"
          placeholder="Type a message..."
          value={messageInput}
          onChange={handleInputChange}
          disabled={isLoading}
          className="flex-1 bg-transparent border-none focus:ring-0 px-2 py-2 text-[15px] outline-none placeholder:text-slate-400 disabled:opacity-50"
        />

        <button
          type="submit"
          disabled={isLoading || (!messageInput.trim() && selectedFiles.length === 0)}
          className="w-10 h-10 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 shadow-sm shrink-0 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </form>
  );
}
