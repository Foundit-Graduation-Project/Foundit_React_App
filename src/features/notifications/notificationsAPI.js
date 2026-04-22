// Notifications API endpoints
import api from '../../services/axios';

// 1. Fetch all notifications + unread count
export const fetchNotificationsAPI = async (page = 1) => {
    // Make sure the URL string has the '/' before notifications
    const response = await api.get(`/notifications?page=${page}&limit=10`);

    // JSend format unwrapping
    return response.data.data;
};

// 2. Mark a single notification as read
export const markAsReadAPI = async (id) => {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data.data;
};

// 3. Mark ALL notifications as read
export const markAllAsReadAPI = async () => {
    const response = await api.patch('/notifications/mark-all');
    return response.data.data;
};