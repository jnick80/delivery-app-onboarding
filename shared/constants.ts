/**
 * Shared constants for delivery app onboarding
 */

export const VEHICLE_TYPES = [
  { value: 'motorcycle', label: '🏍️ Motorcycle' },
  { value: 'car', label: '🚗 Car' },
  { value: 'van', label: '🚐 Van' },
  { value: 'truck', label: '🚚 Truck' },
];

export const BUSINESS_CATEGORIES = [
  { value: 'restaurant', label: '🍔 Restaurant' },
  { value: 'grocery', label: '🛒 Grocery' },
  { value: 'pharmacy', label: '💊 Pharmacy' },
  { value: 'retail', label: '🛍️ Retail' },
  { value: 'other', label: '📦 Other' },
];

export const ONBOARDING_STEPS = {
  DRIVER: [
    'Personal Info',
    'License Verification',
    'Vehicle Info',
    'Insurance',
    'Bank Details',
    'Review',
  ],
  MERCHANT: [
    'Business Info',
    'Owner Details',
    'Business Documents',
    'Delivery Settings',
    'Payment Setup',
    'Review',
  ],
};

export const API_ENDPOINTS = {
  HEALTH: '/api/health',
  DRIVER_ONBOARDING: '/api/onboarding/driver',
  MERCHANT_ONBOARDING: '/api/onboarding/merchant',
  AI_ASSIST: '/api/ai/assist',
  AI_VERIFY: '/api/ai/verify',
};

export const GEMINI_PROMPTS = {
  FIELD_VALIDATION: 'Validate and improve the following field: {{field}} with value: {{value}}',
  FORM_ASSISTANCE: 'Help the user fill out the {{field}} field for onboarding. Current context: {{context}}',
  DATA_VERIFICATION: 'Verify the accuracy of this {{type}} data: {{data}}',
};
