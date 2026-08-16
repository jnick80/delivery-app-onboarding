import { randomUUID } from 'crypto';

export interface DriverSubmission {
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

export interface MerchantSubmission {
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

interface OnboardingRecord<T> {
  id: string;
  type: 'driver' | 'merchant';
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  data: T;
}

const driverApplications = new Map<string, OnboardingRecord<DriverSubmission>>();
const merchantApplications = new Map<string, OnboardingRecord<MerchantSubmission>>();

function createRecord<T>(
  type: 'driver' | 'merchant',
  data: T
): OnboardingRecord<T> {
  return {
    id: randomUUID(),
    type,
    status: 'pending',
    submittedAt: new Date().toISOString(),
    data,
  };
}

export function submitDriverOnboarding(data: DriverSubmission) {
  const record = createRecord('driver', data);
  driverApplications.set(record.id, record);
  return record;
}

export function getDriverOnboardingStatus(id: string) {
  return driverApplications.get(id) ?? null;
}

export function submitMerchantOnboarding(data: MerchantSubmission) {
  const record = createRecord('merchant', data);
  merchantApplications.set(record.id, record);
  return record;
}

export function getMerchantOnboardingStatus(id: string) {
  return merchantApplications.get(id) ?? null;
}
