interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          Step {currentStep + 1} of {steps.length}
        </span>
        <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% complete</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
      <div className="grid gap-2 md:grid-cols-3">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <div
              key={step}
              className={`rounded-xl border px-3 py-2 text-sm ${
                isActive
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : isComplete
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {step}
            </div>
          );
        })}
      </div>
    </div>
  );
}
