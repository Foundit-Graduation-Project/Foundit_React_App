// chatAPI.js
// Why: Central service layer for all chat HTTP calls.
// Responsibility:
//   - getConversations  → GET  /api/conversations
//   - getMessages       → GET  /api/messages/:conversationId
//   - sendMessage       → POST /api/sendMessage
// Returns the raw axios response so chatSlice can access response.data directly.

import api from '../../services/axios';

export const chatApi = {
  // Fetch the sidebar conversations list for the logged-in user
  getConversations: async () => {
    return await api.get('/chat/conversations');
  },

  // Fetch messages for a specific conversation (history)
  // Supports optional pagination via query params but we keep it simple for now
  getMessages: async (conversationId, before = null) => {
    let url = `/chat/messages/${conversationId}`;
    if (before) {
      url += `?before=${before}`;
    }
    return await api.get(url);
  },

  // Send a new message — HTTP creates it, socket delivers it in real-time
  // body: { conversationId, content }
  sendMessage: async ({ conversationId, content }) => {
    return await api.post('/chat/messages', { conversationId, content });
  },

  // Create a new conversation with another user
  createConversation: async (userBId) => {
    return await api.post('/chat/conversations', { userB: userBId });
  }
};