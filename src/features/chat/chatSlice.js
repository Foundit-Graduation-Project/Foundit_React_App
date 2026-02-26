import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from './chatApi';

export const fetchChatData = createAsyncThunk(
  'chat/fetchChatData',
  async () => {
    const response = await chatApi.fetchInitialData();
    return response;
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    activeChatId: null,
    isLoading: true,
    searchQuery: '',
    typingUsers: {}, // Tracks who is typing: { chatId: true/false }
  },
  reducers: {
    setActiveChat: (state, action) => {
      const id = action.payload;
      state.activeChatId = id;
      const chat = state.chats.find(c => c.id === id);
      if (chat) chat.unread = false;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // === 🔌 SOCKET.IO INTEGRATION POINT ===
    // This reducer handles BOTH sending your messages and receiving messages from others.
    // When socket.on("receive_message") triggers, you will dispatch this action!
    addMessage: (state, action) => {
      const message = action.payload;
      state.messages.push(message);
      
      // Instantly update the left sidebar's "last message" preview
      const chat = state.chats.find(c => c.id === message.chatId);
      if (chat) {
        chat.lastMessage = message.text;
        chat.time = "Just now";
        // If the message is from someone else AND we aren't currently looking at that chat, mark it unread (Blue dot)
        if (message.sender !== 'me' && state.activeChatId !== message.chatId) {
          chat.unread = true;
        }
      }
    },

    // === 🔌 SOCKET.IO INTEGRATION POINT ===
    // When the server tells you the message was delivered/seen:
    // socket.on("message_status_update", (data) => dispatch(updateMessageStatus(data)))
    updateMessageStatus: (state, action) => {
      const { id, status } = action.payload;
      const message = state.messages.find(m => m.id === id);
      if (message) message.status = status;
    },

    // === 🔌 SOCKET.IO INTEGRATION POINT ===
    // When the server tells you the other person started/stopped typing:
    // socket.on("typing_start", (chatId) => dispatch(setTypingStatus({chatId, isTyping: true})))
    setTypingStatus: (state, action) => {
      const { chatId, isTyping } = action.payload;
      state.typingUsers[chatId] = isTyping;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => { state.isLoading = true; })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload.chats;
        state.messages = action.payload.messages;
        if (!state.activeChatId && action.payload.chats.length > 0) {
          state.activeChatId = action.payload.chats[0].id;
        }
      });
  }
});

export const { setActiveChat, setSearchQuery, addMessage, updateMessageStatus, setTypingStatus } = chatSlice.actions;
export default chatSlice.reducer;