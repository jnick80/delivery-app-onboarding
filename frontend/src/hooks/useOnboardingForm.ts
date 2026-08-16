import { useEffect, useRef, useState } from 'react';
import { useOnboardingContext } from '../context/OnboardingContext';

type FormValues = Record<string, string>;
type ValidationErrors<T extends FormValues> = Partial<Record<keyof T, string>>;

interface SubmissionResult {
  id?: string;
  status?: string;
  submittedAt?: string;
}

interface UseOnboardingFormOptions<T extends FormValues> {
  formKey: string;
  initialValues: T;
  totalSteps: number;
  validateStep: (step: number, values: T) => ValidationErrors<T>;
  onSubmit: (values: T) => Promise<SubmissionResult>;
}

export function useOnboardingForm<T extends FormValues>({
  formKey,
  initialValues,
  totalSteps,
  validateStep,
  onSubmit,
}: UseOnboardingFormOptions<T>) {
  const { drafts, setDraft, clearDraft } = useOnboardingContext();
  const hasInitialized = useRef(false);
  const initialValuesRef = useRef(initialValues);

  const [currentStep, setCurrentStep] = useState(0);
  const [values, setValues] = useState<T>(initialValuesRef.current);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionResult, setSubmissionResult] = useState<SubmissionResult | null>(null);

  useEffect(() => {
    if (hasInitialized.current || typeof window === 'undefined') {
      return;
    }

    const storedValues = window.localStorage.getItem(formKey);
    if (storedValues) {
      try {
        setValues({
          ...initialValuesRef.current,
          ...(JSON.parse(storedValues) as T),
        });
      } catch (error) {
        console.warn('Unable to restore onboarding draft from localStorage.', error);
        window.localStorage.removeItem(formKey);
      }
    } else if (drafts[formKey]) {
      setValues({
        ...initialValuesRef.current,
        ...(drafts[formKey] as T),
      });
    }

    hasInitialized.current = true;
    setIsHydrated(true);
  }, [drafts, formKey]);

  useEffect(() => {
    if (!isHydrated || typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(formKey, JSON.stringify(values));
    setDraft(formKey, values);
  }, [formKey, isHydrated, setDraft, values]);

  const validateCurrentStep = () => {
    const nextErrors = validateStep(currentStep, values);
    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  };

  const goToNextStep = () => {
    if (!validateCurrentStep()) {
      return false;
    }

    setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
    return true;
  };

  const goToPreviousStep = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  };

  const submit = async () => {
    if (!validateCurrentStep()) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await onSubmit(values);
      setSubmissionResult(result);
      clearDraft(formKey);

      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(formKey);
      }

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to submit onboarding form.';
      setSubmitError(message);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
