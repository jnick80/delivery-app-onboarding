import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Get API health status
 */
export const getHealthStatus = async () => {
  return apiClient.get('/api/health');
};

/**
 * Get AI assistance for a field
 */
export const getAIAssistance = async (fieldName: string, context: string) => {
  return apiClient.post('/api/ai/assist', {
    field: fieldName,
    context,
  });
};

export default apiClient;
