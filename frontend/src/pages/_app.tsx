import type { AppProps } from 'next/app';
import { OnboardingProvider } from '../context/OnboardingContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <OnboardingProvider>
      <Component {...pageProps} />
    </OnboardingProvider>
  );
}
