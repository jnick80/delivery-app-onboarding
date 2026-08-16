import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type DraftValues = Record<string, string>;

interface OnboardingContextValue {
  drafts: Record<string, DraftValues>;
  setDraft: (formKey: string, values: DraftValues) => void;
  clearDraft: (formKey: string) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [drafts, setDrafts] = useState<Record<string, DraftValues>>({});

  const value = useMemo<OnboardingContextValue>(
    () => ({
      drafts,
      setDraft: (formKey, values) => {
        setDrafts((currentDrafts) => ({
          ...currentDrafts,
          [formKey]: values,
        }));
      },
      clearDraft: (formKey) => {
        setDrafts((currentDrafts) => {
          const nextDrafts = { ...currentDrafts };
          delete nextDrafts[formKey];
          return nextDrafts;
        });
      },
    }),
    [drafts]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);

  if (!context) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }

  return context;
}
