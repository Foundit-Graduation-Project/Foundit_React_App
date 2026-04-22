// chatSlice.js
// Why: Manages all chat state — conversations, messages, active chat, search, typing.
// Backend contract:
//   GET /conversations → { success, data: [{ _id, otherUser: { _id, name, email }, lastMessage: string, updatedAt }] }
//   GET /messages/:id  → { success, data: [{ _id, conversation, sender: { _id, name, email }, content, type, seen, createdAt }] }
//   POST /sendMessage  → { success, data: message }

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { chatApi } from './chatAPI';

// ─── Thunks ──────────────────────────────────────────────────────────────────

export const fetchConversations = createAsyncThunk(
  'chat/fetchConversations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await chatApi.getConversations();
      return response.data.data; // Array of conversations from backend
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch conversations');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'chat/fetchMessages',
  async ({ conversationId, before = null }, { rejectWithValue }) => {
    try {
      const response = await chatApi.getMessages(conversationId, before);
      return { conversationId, messages: response.data.data, before }; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.msg || 'Failed to fetch messages');
    }
  }
);

export const sendMessageAPI = createAsyncThunk(
  'chat/sendMessageAPI',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await chatApi.sendMessage(messageData);
      return response.data; // The created message
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send message');
    }
  }
);

export const createConversationAPI = createAsyncThunk(
  'chat/createConversationAPI',
  async (userBId, { rejectWithValue }) => {
    try {
      const response = await chatApi.createConversation(userBId);
      return response.data; // { success, msg, data }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create conversation');
    }
  }
);

// ─── Map helpers ─────────────────────────────────────────────────────────────

const formatSidebarTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  }
};

const formatDateLabel = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  }
};

// Map a raw backend conversation to UI shape used by ChatSidebar
// Backend: { _id, otherUser: { _id, name, email }, lastMessage: string, updatedAt }
const mapConversation = (conv) => ({
  id: conv._id,
  name: conv.otherUser?.name || 'Unknown',        // displayed as chat title
  otherUserId: conv.otherUser?._id || null,        // used to determine 'me' vs 'other'
  avatar: null,                                     // no avatar in current User model
  lastMessage: conv.lastMessage || '',
  time: formatSidebarTime(conv.updatedAt),
  unread: false,
});

// Map a raw backend message to UI shape used by ChatMessageList
// Backend: { _id, conversation, sender: { _id, name }, content, createdAt }
const mapMessage = (msg, myUserId) => ({
  id: msg._id,
  chatId: (msg.conversationId?._id || msg.conversationId || msg.conversation?._id || msg.conversation),
  text: msg.content,
  sender: (msg.sender?._id?.toString() === myUserId || msg.sender?.toString() === myUserId)
    ? 'me'
    : 'other',
  senderName: msg.sender?.name || '',
  time: msg.createdAt
    ? new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '',
  date: msg.createdAt ? formatDateLabel(msg.createdAt) : '',
  seen: msg.seen || false,
  status: msg.seen ? 'seen' : 'sent',
});

// ─── Slice ────────────────────────────────────────────────────────────────────

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    messages: [],
    activeChatId: null,
    isLoading: false,        // true only while conversations are loading
    isLoadingMessages: false,
    hasMoreMessages: true,   // false when backend returns empty page
    searchQuery: '',
    typingUsers: {},          // { chatId: true/false }
    onlineUsers: [],          // Active user IDs
    error: null,
  },
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChatId = action.payload;
      // Clear unread badge when user opens a chat
      const chat = state.chats.find(c => c.id === action.payload);
      if (chat) chat.unread = false;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    // === 🔌 SOCKET: receiveMessage ===
    // Dispatched from Chat.jsx when socket emits 'receiveMessage'
    addMessage: (state, action) => {
      const rawMsg = action.payload;
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      const myUserId = storedUser?._id;
      const message = mapMessage(rawMsg, myUserId);
      
      // Strict deduplication ensures overlapping HTTP responses and socket echoes won't multiply
      if (!state.messages.some(m => m.id === message.id)) {
        state.messages.push(message);

        // Update sidebar last message preview
        const chat = state.chats.find(c => c.id === message.chatId);
        if (chat) {
          chat.lastMessage = message.text;
          chat.time = 'Just now';
          // Mark unread only if the message is from someone else and that chat isn't open
          if (message.sender !== 'me' && state.activeChatId !== message.chatId) {
            chat.unread = true;
          }
        }
      }
    },

    // Ready for future: track typing per conversation
    setTypingStatus: (state, action) => {
      const { chatId, isTyping } = action.payload;
      state.typingUsers[chatId] = isTyping;
    },
    
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    // Mark messages seen from a specific conversation
    markMessagesSeen: (state, action) => {
      const { conversationId } = action.payload;
      state.messages.forEach(msg => {
        // Show seen indicators only for messages sent by the current user
        if (msg.chatId === conversationId && msg.sender === 'me') {
          msg.seen = true;
          msg.status = 'seen';
        }
      });
    },
  },

  extraReducers: (builder) => {
    builder
      // ── fetchConversations ─────────────────────────────────────────────────
      .addCase(fetchConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.isLoading = false;
        // action.payload is the `data` array from backend response
        const raw = Array.isArray(action.payload) ? action.payload : [];
        state.chats = raw.map(mapConversation);
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ── fetchMessages ──────────────────────────────────────────────────────
      .addCase(fetchMessages.pending, (state) => {
        state.isLoadingMessages = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoadingMessages = false;
        const { messages, before } = action.payload;
        const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
        const myUserId = storedUser?._id;
        const raw = Array.isArray(messages) ? messages : [];
        const mappedRaw = raw.map(msg => mapMessage(msg, myUserId));

        if (before) {
          // Pagination: prepend older messages, avoid duplicates
          if (raw.length === 0) {
            state.hasMoreMessages = false; // No more pages to load
          } else {
            const existingIds = new Set(state.messages.map(m => m.id));
            const newMessages = mappedRaw.filter(m => !existingIds.has(m.id));
            state.messages.unshift(...newMessages);
          }
        } else {
          // Initial fetch: overwrite and reset pagination
          state.messages = mappedRaw;
          state.hasMoreMessages = true;
        }
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoadingMessages = false;
      })

      // ── sendMessageAPI ─────────────────────────────────────────────────────
      // After send, we don't update UI here — the backend emits receiveMessage
      // via socket, and Chat.jsx dispatches addMessage to update the store.
      // This avoids duplicate optimistic updates.
      .addCase(sendMessageAPI.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ── createConversationAPI ────────────────────────────────────────────────
      .addCase(createConversationAPI.fulfilled, (state, action) => {
        // action.payload is { success, msg, data: conversation }
        const conversation = action.payload.data || action.payload;
        const mappedConv = mapConversation(conversation);
        
        // Add to list if not already there
        if (!state.chats.some(c => c.id === mappedConv.id)) {
          state.chats.unshift(mappedConv);
        }
        
        // Set as active chat
        state.activeChatId = mappedConv.id;
      });
  },
});

export const { setActiveChat, setSearchQuery, addMessage, setTypingStatus, markMessagesSeen, setOnlineUsers } = chatSlice.actions;
export default chatSlice.reducer;