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
  
  getAllReports: async (params) => {
    const response = await api.get('/reports', { params });
    return response.data;
  },
  getMyReports: async (params) => {
    const response = await api.get('/reports/my-reports', { params });
    return response.data;
  },

  getReportById: async (id) => {
    const response = await api.get(`/reports/${id}`);
    return response.data;
  },

  deleteReport: async (id) => {
    const response = await api.delete(`/reports/${id}`);
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/reports/stats');
    return response.data;
  },
};