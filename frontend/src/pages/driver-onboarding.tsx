import FormField from '../components/FormField';
import OnboardingForm from '../components/OnboardingForm';
import { submitDriverOnboarding, getAIAssistance } from '../services/api';
import { useOnboardingForm } from '../hooks/useOnboardingForm';

const driverSteps = [
  'Personal information',
  'License verification',
  'Vehicle information',
  'Insurance details',
  'Bank account setup',
  'Review and submit',
] as const;

const initialValues = {
  name: '',
  email: '',
  phone: '',
  licenseNumber: '',
  licenseExpiry: '',
  vehicleType: '',
  vehiclePlate: '',
  insuranceExpiry: '',
  bankAccount: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step: number, values: typeof initialValues) {
  const errors: Partial<Record<keyof typeof initialValues, string>> = {};

  if (step === 0) {
    if (!values.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!emailPattern.test(values.email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!values.phone.trim()) {
      errors.phone = 'Phone number is required.';
    }
  }

  if (step === 1) {
    if (!values.licenseNumber.trim()) {
      errors.licenseNumber = 'License number is required.';
    }
    if (!values.licenseExpiry) {
      errors.licenseExpiry = 'License expiry date is required.';
    }
  }

  if (step === 2) {
    if (!values.vehicleType) {
      errors.vehicleType = 'Vehicle type is required.';
    }
    if (!values.vehiclePlate.trim()) {
      errors.vehiclePlate = 'Vehicle plate is required.';
    }
  }

  if (step === 3 && !values.insuranceExpiry) {
    errors.insuranceExpiry = 'Insurance expiry date is required.';
  }

  if (step === 4 && !values.bankAccount.trim()) {
    errors.bankAccount = 'Bank account is required.';
  }

  return errors;
}

export default function DriverOnboardingPage() {
  const {
    currentStep,
    errors,
    goToNextStep,
    goToPreviousStep,
    isSubmitting,
    setFieldValue,
    submissionResult,
    submit,
    submitError,
    values,
  } = useOnboardingForm({
    formKey: 'driver-onboarding-form',
    initialValues,
    totalSteps: driverSteps.length,
    validateStep,
    onSubmit: async (formValues) => {
      const response = await submitDriverOnboarding(formValues);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Unable to submit driver onboarding.');
      }

      return response.data;
    },
  });

  const handleAssist = async (field: string, value: string) => {
    const response = await getAIAssistance(field, 'Driver onboarding', value);
    return response.data?.suggestion || 'No AI guidance is available right now.';
  };

  if (submissionResult) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Driver onboarding submitted</h1>
          <p className="mt-4 text-slate-600">
            Your onboarding ID is <span className="font-semibold text-slate-900">{submissionResult.id}</span>.
          </p>
          <p className="mt-2 text-slate-600">
            Current status: <span className="font-semibold capitalize">{submissionResult.status}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <OnboardingForm
      title="Driver onboarding"
      description="Complete all required onboarding steps to start delivering."
      steps={[...driverSteps]}
      currentStep={currentStep}
      submitError={submitError}
      isSubmitting={isSubmitting}
      isLastStep={currentStep === driverSteps.length - 1}
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      onSubmit={submit}
    >
      {currentStep === 0 ? (
        <>
          <FormField label="Full name" name="name" value={values.name} onChange={(value) => setFieldValue('name', value)} error={errors.name} placeholder="Jane Driver" required onAssist={handleAssist} />
          <FormField label="Email" name="email" value={values.email} onChange={(value) => setFieldValue('email', value)} error={errors.email} placeholder="jane@example.com" type="email" required onAssist={handleAssist} />
          <FormField label="Phone" name="phone" value={values.phone} onChange={(value) => setFieldValue('phone', value)} error={errors.phone} placeholder="+1 555 0100" type="tel" required onAssist={handleAssist} />
        </>
      ) : null}

      {currentStep === 1 ? (
        <>
          <FormField label="License number" name="licenseNumber" value={values.licenseNumber} onChange={(value) => setFieldValue('licenseNumber', value)} error={errors.licenseNumber} placeholder="D1234567" required onAssist={handleAssist} />
          <FormField label="License expiry" name="licenseExpiry" value={values.licenseExpiry} onChange={(value) => setFieldValue('licenseExpiry', value)} error={errors.licenseExpiry} type="date" required onAssist={handleAssist} />
        </>
      ) : null}

      {currentStep === 2 ? (
        <>
          <FormField
            label="Vehicle type"
            name="vehicleType"
            value={values.vehicleType}
            onChange={(value) => setFieldValue('vehicleType', value)}
            error={errors.vehicleType}
            options={[
              { value: 'motorcycle', label: 'Motorcycle' },
              { value: 'car', label: 'Car' },
              { value: 'van', label: 'Van' },
              { value: 'truck', label: 'Truck' },
            ]}
            required
            onAssist={handleAssist}
          />
          <FormField label="Vehicle plate" name="vehiclePlate" value={values.vehiclePlate} onChange={(value) => setFieldValue('vehiclePlate', value)} error={errors.vehiclePlate} placeholder="ABC-1234" required onAssist={handleAssist} />
        </>
      ) : null}

      {currentStep === 3 ? (
        <FormField label="Insurance expiry" name="insuranceExpiry" value={values.insuranceExpiry} onChange={(value) => setFieldValue('insuranceExpiry', value)} error={errors.insuranceExpiry} type="date" required onAssist={handleAssist} />
      ) : null}

      {currentStep === 4 ? (
        <FormField label="Bank account" name="bankAccount" value={values.bankAccount} onChange={(value) => setFieldValue('bankAccount', value)} error={errors.bankAccount} placeholder="1234567890" required onAssist={handleAssist} />
      ) : null}

      {currentStep === 5 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(values).map(([key, value]) => (
            <div key={key} className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <p className="text-sm font-medium capitalize text-slate-500">
                {key.replace(/([A-Z])/g, ' $1')}
              </p>
              <p className="mt-1 text-slate-900">{value || 'Not provided'}</p>
            </div>
          ))}
        </div>
      ) : null}
    </OnboardingForm>
  );
}
