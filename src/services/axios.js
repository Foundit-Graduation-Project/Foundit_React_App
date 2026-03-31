import axios from "axios";

// 1. Create Base Instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v1", // Ensure this matches your backend PORT
    withCredentials: true, // 🔥 CRITICAL: Allows frontend to send/receive the refreshToken cookie
});

// 2. Request Interceptor: Attach the Access Token to every request
api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

// 3. Response Interceptor: Handle automatic token refreshing
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 🔥 THE FIX: Don't trigger refresh logic if the request was to the login endpoint
        const isLoginRequest = originalRequest.url.includes("/auth/login");

        const isRefreshRequest = originalRequest.url.includes(
            "/auth/refresh-token",
        );

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isLoginRequest &&
            !isRefreshRequest
        )
            if (
                error.response?.status === 401 &&
                !originalRequest._retry &&
                !isLoginRequest
            ) {
                // If backend returns 401, we haven't retried yet, AND it's NOT a login attempt
                originalRequest._retry = true;

                try {
                    const res = await axios.get(
                        "http://localhost:3000/api/v1/auth/refresh-token",
                        {
                            withCredentials: true,
                        },
                    );

                    const newAccessToken = res.data.data.accessToken;
                    localStorage.setItem("accessToken", newAccessToken);

                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return api(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("user");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }

        // 🔥 THE FIX: Force logout if the user is banned (403 Forbidden)
        if (error.response?.status === 403) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
            return Promise.reject("Your account has been banned. Please contact support.");
        }

        // --- SMART ERROR EXTRACTION ---
        const resData = error.response?.data;
        let errorMessage = "An error occurred. Please try again.";

        if (resData) {
            // 1. Check if it's a Joi Validation Error
            if (resData.status === "fail" && Array.isArray(resData.data)) {
                errorMessage = resData.data
                    .map((err) => err.message)
                    .join(" • ");
            }
            // 2. Check if it's a standard backend AppError message (like "Invalid password")
            else if (resData.message) {
                errorMessage = resData.message;
            }
        }

        return Promise.reject(errorMessage);
    },
);

export default api;
