import { useState } from 'react';

interface FormFieldOption {
  label: string;
  value: string;
}

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'date';
  options?: FormFieldOption[];
  required?: boolean;
  onAssist?: (field: string, value: string) => Promise<string>;
}

export default function FormField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
  options,
  required,
  onAssist,
}: FormFieldProps) {
  const [assistance, setAssistance] = useState<string | null>(null);
  const [isLoadingAssistance, setIsLoadingAssistance] = useState(false);

  const inputClasses = `mt-2 w-full rounded-xl border px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
    error ? 'border-red-300' : 'border-slate-300'
  }`;

  const handleAssist = async () => {
    if (!onAssist) {
      return;
    }

    setIsLoadingAssistance(true);
    try {
      const suggestion = await onAssist(name, value);
      setAssistance(suggestion);
    } finally {
      setIsLoadingAssistance(false);
    }
  };

  return (
    <label className="block">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-slate-700">
          {label}
          {required ? <span className="ml-1 text-red-500">*</span> : null}
        </span>
        {onAssist ? (
          <button
            type="button"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={handleAssist}
          >
            {isLoadingAssistance ? 'Thinking…' : 'Ask AI'}
          </button>
        ) : null}
      </div>

      {options ? (
        <select className={inputClasses} value={value} onChange={(event) => onChange(event.target.value)}>
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          className={inputClasses}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}

      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
      {assistance ? <p className="mt-2 rounded-xl bg-blue-50 px-3 py-2 text-sm text-blue-700">{assistance}</p> : null}
    </label>
  );
}
