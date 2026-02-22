import { INITIAL_CHATS, INITIAL_MESSAGES } from '../../components/chat/mockData';

export const chatApi = {
  // === 🔌 SOCKET.IO INTEGRATION POINT ===
  // In the future, this will be a standard GET request (e.g., fetch('/api/chats')) 
  // to load the user's historical conversations from the database before the socket connects.
  fetchInitialData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          chats: INITIAL_CHATS,
          messages: INITIAL_MESSAGES,
        });
      }, 1500); // 1.5s delay to trigger your skeleton loaders
    });
  }
};