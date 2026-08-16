import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getHealthStatus } from '../services/api';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await getHealthStatus();
        setApiStatus(response.status === 200);
      } catch (err) {
        setError('Failed to connect to API');
      } finally {
        setLoading(false);
      }
    };

    checkApiHealth();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">🚚 Delivery App Onboarding</h1>
        <p className="mt-4 text-lg text-slate-600">
          Onboarding platform for drivers and merchants powered by Gemini AI
        </p>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-semibold text-slate-900">System status</h2>
        {loading && <p>Checking API connection...</p>}
        {!loading && (
          <div className="mt-4">
            <p>
              Backend API:{' '}
              <span className={apiStatus ? 'font-bold text-emerald-600' : 'font-bold text-red-600'}>
                {apiStatus ? '✅ Connected' : '❌ Disconnected'}
              </span>
            </p>
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
        <Link href="/driver-onboarding" className={linkStyle}>
          <div className="space-y-2">
            👨‍💼 Driver Onboarding
            <p className="text-sm font-normal text-blue-100">
              Complete personal, licensing, vehicle, insurance, and banking setup.
            </p>
          </div>
        </Link>
        <Link href="/merchant-onboarding" className={linkStyle}>
          <div className="space-y-2">
            🏪 Merchant Onboarding
            <p className="text-sm font-normal text-blue-100">
              Register business details, documents, delivery settings, and payout info.
            </p>
          </div>
        </Link>
        </div>
      </div>
    </div>
  );
};

const linkStyle =
  'rounded-3xl bg-blue-600 p-8 text-xl font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-700';

export default HomePage;
