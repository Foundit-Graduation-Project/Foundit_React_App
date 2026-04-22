import api from '../../services/axios';

export const loginAPI = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data.data; 
};

export const registerAPI = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
};

export const logoutAPI = async () => {
    const response = await api.post('/auth/logout');
    return response.data.data;
};

export const forgotPasswordAPI = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data.data;
};

export const resetPasswordAPI = async (token, passwords) => {
    const response = await api.patch(`/auth/reset-password/${token}`, passwords);
    return response.data.data;
};

export const googleLoginAPI = async (googleAccessToken) => {
    const response = await api.post('/auth/google', { access_token: googleAccessToken });
    return response.data.data;
};

// --- NEW OTP ADDITIONS ---

export const verifyOtpAPI = async (data) => {
    // data = { email: '...', otp: '123456' }
    const response = await api.post('/auth/verify-otp', data);
    return response.data.data;
};

export const resendOtpAPI = async (email) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data.data;
};