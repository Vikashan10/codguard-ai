import React, { useEffect, useState, useCallback } from 'react';
import { fetchHealthStatus, HealthResponse } from './api/health';

type ConnectionStatus = 'checking' | 'connected' | 'unavailable';

export const App: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>('checking');
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const checkHealth = useCallback(async () => {
    setIsRefreshing(true);
    setErrorMessage(null);
    try {
      const data = await fetchHealthStatus();
      if (data && data.status === 'ok') {
        setHealthData(data);
        setStatus('connected');
      } else {
        setStatus('unavailable');
        setErrorMessage('Unexpected response payload from server.');
      }
    } catch (err: unknown) {
      setStatus('unavailable');
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Failed to connect to backend server.');
      }
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-white">
      {/* Background radial gradient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 blur-[130px] rounded-full" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto w-full px-6 py-16 flex-1 flex flex-col justify-center items-center text-center">
        
        {/* Project Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-400 text-xs font-medium tracking-wide uppercase mb-6 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          Sri Lankan Social-Commerce Deliveries
        </div>

        {/* Brand Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
            CODGuard
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-slate-300 font-light max-w-2xl mb-10 leading-relaxed">
          AI-powered COD delivery assurance
        </p>

        {/* Status Card */}
        <div className="w-full max-w-md bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <span className="text-sm font-medium text-slate-400">System Link</span>
            <button
              id="refresh-health-button"
              onClick={() => checkHealth()}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 disabled:opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded px-2 py-1"
              title="Refresh connection status"
            >
              <svg
                className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              {isRefreshing ? 'Checking...' : 'Refresh'}
            </button>
          </div>

          <div className="pt-5 flex flex-col items-center gap-3">
            <div className="text-base text-slate-200 font-medium">
              Backend status:{' '}
              {status === 'checking' && (
                <span className="inline-flex items-center gap-1.5 text-amber-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  Checking
                </span>
              )}
              {status === 'connected' && (
                <span id="backend-status-connected" className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Connected
                </span>
              )}
              {status === 'unavailable' && (
                <span id="backend-status-unavailable" className="inline-flex items-center gap-1.5 text-rose-400 font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Unavailable
                </span>
              )}
            </div>

            {status === 'connected' && healthData && (
              <div className="w-full bg-slate-950/60 rounded-lg p-3 text-xs font-mono text-slate-400 text-left border border-slate-800/60 mt-1">
                <div>Service: <span className="text-emerald-400">{healthData.service}</span></div>
                <div>Status: <span className="text-emerald-400">{healthData.status}</span></div>
              </div>
            )}

            {status === 'unavailable' && errorMessage && (
              <p className="text-xs text-rose-400/90 font-mono bg-rose-950/30 border border-rose-900/40 rounded-lg p-2.5 w-full text-center">
                {errorMessage}
              </p>
            )}
          </div>
        </div>

        {/* Architectural Principles Card */}
        <div className="mt-12 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Principle 1</div>
            <p className="text-sm font-medium text-slate-200">LLM understands and communicates.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Principle 2</div>
            <p className="text-sm font-medium text-slate-200">Application code decides.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Principle 3</div>
            <p className="text-sm font-medium text-slate-200">PostgreSQL remembers.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-sm">
            <div className="text-xs text-cyan-400 font-mono uppercase tracking-wider mb-1">Principle 4</div>
            <p className="text-sm font-medium text-slate-200">Integrations act.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-slate-900 text-center text-xs text-slate-500">
        CODGuard AI &bull; FastAPI &bull; React &bull; TypeScript &bull; Tailwind CSS &bull; PostgreSQL
      </footer>
    </div>
  );
};

export default App;
