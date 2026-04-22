import api from './axios';

export const supportApi = {
    /**
     * Open a new support ticket with an initial message.
     * @param {string} message - The first message to send to support.
     * @param {string} subject - The subject of the ticket (optional).
     * @param {string} email - The user's email address.
     */
    openSupportTicket: async (message, subject, email) => {
        const response = await api.post('support/ticket', { 
            message, 
            subject, 
            email 
        });
        return response.data;
    }
};
