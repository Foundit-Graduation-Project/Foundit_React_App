import axios from 'axios';

// 1. Create Base Instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', // Ensure this matches your backend PORT
    withCredentials: true, // 🔥 CRITICAL: Allows frontend to send/receive the refreshToken cookie
});

// 2. Request Interceptor: Attach the Access Token to every request
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 3. Response Interceptor: Handle automatic token refreshing
api.interceptors.response.use(
    (response) => response, // If request succeeds, let it pass
    async (error) => {
        const originalRequest = error.config;

        // If backend returns 401 (Unauthorized) and we haven't tried to retry yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to get a new access token using the HttpOnly cookie
                const res = await axios.get('http://localhost:3000/api/v1/auth/refresh-token', {
                    withCredentials: true
                });

                // Assuming JSend response: { status: 'success', data: { accessToken: '...' } }
                const newAccessToken = res.data.data.accessToken;

                // Save new token
                localStorage.setItem('accessToken', newAccessToken);

                // Update the failed request with the new token and try again
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // If refresh-token fails (cookie expired/invalid), log the user out
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login'; // Force redirect to login
                return Promise.reject(refreshError);
            }
        }

        // --- SMART ERROR EXTRACTION ---
        const resData = error.response?.data;
        let errorMessage = 'An error occurred. Please try again.';

        if (resData) {
            // 1. Check if it's a Joi Validation Error (Our backend sends this as an array inside 'data')
            if (resData.status === 'fail' && Array.isArray(resData.data)) {
                // Combine all Joi error messages into one string separated by a dot
                errorMessage = resData.data.map(err => err.message).join(' • ');
            }
            // 2. Check if it's a standard backend AppError message
            else if (resData.message) {
                errorMessage = resData.message;
            }
        }

        // Return the clean string message to Redux
        return Promise.reject(errorMessage);
    }
);

export default api;