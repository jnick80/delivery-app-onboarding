import FormField from '../components/FormField';
import OnboardingForm from '../components/OnboardingForm';
import { getAIAssistance, submitMerchantOnboarding } from '../services/api';
import { useOnboardingForm } from '../hooks/useOnboardingForm';

const merchantSteps = [
  'Business information',
  'Owner details',
  'Business documents',
  'Delivery settings',
  'Payment setup',
  'Review and submit',
] as const;

const initialValues = {
  businessName: '',
  businessEmail: '',
  businessPhone: '',
  ownerName: '',
  taxId: '',
  registrationNumber: '',
  serviceArea: '',
  deliveryRadius: '',
  bankAccount: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateStep(step: number, values: typeof initialValues) {
  const errors: Partial<Record<keyof typeof initialValues, string>> = {};

  if (step === 0) {
    if (!values.businessName.trim()) {
      errors.businessName = 'Business name is required.';
    }
    if (!emailPattern.test(values.businessEmail)) {
      errors.businessEmail = 'Enter a valid business email.';
    }
    if (!values.businessPhone.trim()) {
      errors.businessPhone = 'Business phone is required.';
    }
  }

  if (step === 1 && !values.ownerName.trim()) {
    errors.ownerName = 'Owner name is required.';
  }

  if (step === 2) {
    if (!values.taxId.trim()) {
      errors.taxId = 'Tax ID is required.';
    }
    if (!values.registrationNumber.trim()) {
      errors.registrationNumber = 'Registration number is required.';
    }
  }

  if (step === 3) {
    if (!values.serviceArea.trim()) {
      errors.serviceArea = 'Service area is required.';
    }
    if (!values.deliveryRadius.trim()) {
      errors.deliveryRadius = 'Delivery radius is required.';
    }
  }

  if (step === 4 && !values.bankAccount.trim()) {
    errors.bankAccount = 'Bank account is required.';
  }

  return errors;
}

export default function MerchantOnboardingPage() {
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
    formKey: 'merchant-onboarding-form',
    initialValues,
    totalSteps: merchantSteps.length,
    validateStep,
    onSubmit: async (formValues) => {
      const response = await submitMerchantOnboarding(formValues);
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Unable to submit merchant onboarding.');
      }

      return response.data;
    },
  });

  const handleAssist = async (field: string, value: string) => {
    const response = await getAIAssistance(field, 'Merchant onboarding', value);
    return response.data?.suggestion || 'No AI guidance is available right now.';
  };

  if (submissionResult) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">Merchant onboarding submitted</h1>
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
      title="Merchant onboarding"
      description="Set up your business profile to start accepting delivery orders."
      steps={[...merchantSteps]}
      currentStep={currentStep}
      submitError={submitError}
      isSubmitting={isSubmitting}
      isLastStep={currentStep === merchantSteps.length - 1}
      onNext={goToNextStep}
      onBack={goToPreviousStep}
      onSubmit={submit}
    >
      {currentStep === 0 ? (
        <>
          <FormField label="Business name" name="businessName" value={values.businessName} onChange={(value) => setFieldValue('businessName', value)} error={errors.businessName} placeholder="Fresh Market" required onAssist={handleAssist} />
          <FormField label="Business email" name="businessEmail" value={values.businessEmail} onChange={(value) => setFieldValue('businessEmail', value)} error={errors.businessEmail} placeholder="owner@freshmarket.com" type="email" required onAssist={handleAssist} />
          <FormField label="Business phone" name="businessPhone" value={values.businessPhone} onChange={(value) => setFieldValue('businessPhone', value)} error={errors.businessPhone} placeholder="+1 555 0199" type="tel" required onAssist={handleAssist} />
        </>
      ) : null}

      {currentStep === 1 ? (
        <FormField label="Owner name" name="ownerName" value={values.ownerName} onChange={(value) => setFieldValue('ownerName', value)} error={errors.ownerName} placeholder="Jordan Owner" required onAssist={handleAssist} />
      ) : null}

      {currentStep === 2 ? (
        <>
          <FormField label="Tax ID" name="taxId" value={values.taxId} onChange={(value) => setFieldValue('taxId', value)} error={errors.taxId} placeholder="12-3456789" required onAssist={handleAssist} />
          <FormField label="Registration number" name="registrationNumber" value={values.registrationNumber} onChange={(value) => setFieldValue('registrationNumber', value)} error={errors.registrationNumber} placeholder="REG-2026-001" required onAssist={handleAssist} />
        </>
      ) : null}

      {currentStep === 3 ? (
        <>
          <FormField label="Service area" name="serviceArea" value={values.serviceArea} onChange={(value) => setFieldValue('serviceArea', value)} error={errors.serviceArea} placeholder="Downtown and Midtown" required onAssist={handleAssist} />
          <FormField label="Delivery radius (miles)" name="deliveryRadius" value={values.deliveryRadius} onChange={(value) => setFieldValue('deliveryRadius', value)} error={errors.deliveryRadius} placeholder="10" required onAssist={handleAssist} />
        </>
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
