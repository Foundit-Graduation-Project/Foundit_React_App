// User API endpoints
import api from "../../services/axios";

export const getMeAPI = async () => {
    const res = await api.get("/users/me");
    return res.data?.data?.user || res.data?.user || res.data;
};

export const updateMeAPI = async (data) => {
    const res = await api.patch("/users/update-me", data);
    return res.data?.data?.user || res.data?.user || res.data;
};

export const updateAvatarAPI = async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    const res = await api.patch("/users/update-avatar", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data?.data?.user || res.data?.user || res.data;
};