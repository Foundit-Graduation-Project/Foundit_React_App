import api from '../../services/axios';

export const loginAPI = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data.data; 
};

export const registerAPI = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
};

// --- NEW ADDITIONS ---

export const logoutAPI = async () => {
    const response = await api.post('/auth/logout');
    return response.data.data;
};

export const forgotPasswordAPI = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data.data;
};

export const resetPasswordAPI = async (token, passwords) => {
    // passwords = { newPassword, confirmNewPassword }
    const response = await api.patch(`/auth/reset-password/${token}`, passwords);
    return response.data.data;
};