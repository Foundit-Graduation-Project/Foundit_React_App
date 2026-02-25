import { INITIAL_CHATS, INITIAL_MESSAGES } from '../../components/chat/mockData';

export const chatApi = {
  fetchInitialData: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Failsafe: If mockData is missing, don't stay stuck loading forever!
        if (!INITIAL_CHATS || !INITIAL_MESSAGES) {
          console.error("Mock data is missing! Check your import paths.");
          resolve({ chats: [], messages: [] }); 
          return;
        }

        resolve({
          chats: INITIAL_CHATS,
          messages: INITIAL_MESSAGES,
        });
      }, 800); 
    });
  }
};