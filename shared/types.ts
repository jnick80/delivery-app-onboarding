/**
 * Shared TypeScript types for delivery app onboarding
 */

export interface DriverOnboardingData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleType: 'motorcycle' | 'car' | 'van' | 'truck';
  vehiclePlate: string;
  insuranceExpiry: string;
  bankAccount: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface MerchantOnboardingData {
  id?: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  ownerName: string;
  taxId: string;
  registrationNumber: string;
  serviceArea: string;
  deliveryRadius: string;
  bankAccount: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface AIAssistanceRequest {
  field: string;
  context: string;
  userInput?: string;
}

export interface AIAssistanceResponse {
  suggestion: string;
  confidence: number;
  alternatives?: string[];
}

export interface OnboardingResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
