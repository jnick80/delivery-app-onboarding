import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [apiStatus, setApiStatus] = useState<boolean>(false);

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/health`
        );
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
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1>🚚 Delivery App Onboarding</h1>
        <p style={{ fontSize: '1.1rem', color: '#666', marginTop: '1rem' }}>
          Onboarding platform for drivers and merchants powered by Gemini AI
        </p>

        <div
          style={{
            marginTop: '2rem',
            padding: '2rem',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
          }}
        >
          <h2>System Status</h2>
          {loading && <p>Checking API connection...</p>}
          {!loading && (
            <div>
              <p>
                Backend API:{' '}
                <span style={{ fontWeight: 'bold', color: apiStatus ? 'green' : 'red' }}>
                  {apiStatus ? '✅ Connected' : '❌ Disconnected'}
                </span>
              </p>
              {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
            </div>
          )}
        </div>

        <div style={{ marginTop: '3rem' }}>
          <h3>Quick Links</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/driver-onboarding" style={linkStyle}>
              👨‍💼 Driver Onboarding
            </a>
            <a href="/merchant-onboarding" style={linkStyle}>
              🏪 Merchant Onboarding
            </a>
            <a href="/dashboard" style={linkStyle}>
              📊 Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const linkStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '0.75rem 1.5rem',
  backgroundColor: '#0070f3',
  color: 'white',
  borderRadius: '4px',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default HomePage;
