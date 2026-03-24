// Reports API endpoints
import api from '../../services/axios';

export const reportsAPI = {
  createReport: async (formData) => {
    const response = await api.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  

  
};