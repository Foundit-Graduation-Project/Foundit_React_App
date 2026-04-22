import api from '../../services/axios';

export const createCheckoutSessionAPI = async (data) => {
    // data: { amount, plan }
    const response = await api.post('/payments/checkout-session', data);
    return response.data?.data ? response.data.data : response.data;
};


