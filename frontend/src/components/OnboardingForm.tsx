import { ReactNode } from 'react';
import ProgressBar from './ProgressBar';

interface OnboardingFormProps {
  title: string;
  description: string;
  steps: string[];
  currentStep: number;
  submitError?: string | null;
  isSubmitting: boolean;
  isLastStep: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
  children: ReactNode;
}

export default function OnboardingForm({
  title,
  description,
  steps,
  currentStep,
  submitError,
  isSubmitting,
  isLastStep,
  onNext,
  onBack,
  onSubmit,
  children,
}: OnboardingFormProps) {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-lg md:p-10">
        <div className="space-y-3">
          <h1 className="text-3xl font-semibold text-slate-900">{title}</h1>
          <p className="text-slate-600">{description}</p>
        </div>

        <div className="mt-8">
          <ProgressBar steps={steps} currentStep={currentStep} />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">{steps[currentStep]}</h2>
          <div className="mt-6 space-y-5">{children}</div>
        </div>

        {submitError ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {submitError}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button
            type="button"
            className="rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={onBack}
            disabled={currentStep === 0 || isSubmitting}
          >
            Back
          </button>
          <button
            type="button"
            className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
            onClick={isLastStep ? onSubmit : onNext}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : isLastStep ? 'Submit onboarding' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
