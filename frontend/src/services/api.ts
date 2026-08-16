import axios, { AxiosInstance } from 'axios';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

interface AIAssistanceData {
  suggestion: string;
  confidence: number;
  alternatives?: string[];
}

interface OnboardingStatusData {
  id: string;
  status: string;
  submittedAt: string;
}

export interface DriverOnboardingPayload {
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleType: string;
  vehiclePlate: string;
  insuranceExpiry: string;
  bankAccount: string;
}

export interface MerchantOnboardingPayload {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  ownerName: string;
  taxId: string;
  registrationNumber: string;
  serviceArea: string;
  deliveryRadius: string;
  bankAccount: string;
}

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
export const getAIAssistance = async (
  fieldName: string,
  context: string,
  userInput?: string
) => {
  const response = await apiClient.post<ApiResponse<AIAssistanceData>>('/api/ai/assist', {
    field: fieldName,
    context,
    userInput,
  });

  return response.data;
};

export const submitDriverOnboarding = async (payload: DriverOnboardingPayload) => {
  const response = await apiClient.post<ApiResponse<OnboardingStatusData>>(
    '/api/onboarding/driver',
    payload
  );

  return response.data;
};

export const getDriverOnboardingStatus = async (id: string) => {
  const response = await apiClient.get<ApiResponse<OnboardingStatusData>>(
    `/api/onboarding/driver/${id}`
  );

  return response.data;
};

export const submitMerchantOnboarding = async (payload: MerchantOnboardingPayload) => {
  const response = await apiClient.post<ApiResponse<OnboardingStatusData>>(
    '/api/onboarding/merchant',
    payload
  );

  return response.data;
};

export const getMerchantOnboardingStatus = async (id: string) => {
  const response = await apiClient.get<ApiResponse<OnboardingStatusData>>(
    `/api/onboarding/merchant/${id}`
  );

  return response.data;
};

export default apiClient;
