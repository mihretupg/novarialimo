import { useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, UserPlus, UserRound } from 'lucide-react';
import { api, socialLoginUrl } from '../lib/api';

export default function Login({ onLogin }) {
  const [, query = ''] = window.location.hash.split('?');
  const oauthError = new URLSearchParams(query).get('error');
  const [mode, setMode] = useState('user');
  const [authMode, setAuthMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(oauthError ? 'Social login could not be completed. Please try again.' : '');
  const [loading, setLoading] = useState(false);

  const openDashboard = (account) => {
    onLogin(account);
    window.location.hash = account.role === 'admin' ? '#admin' : '#dashboard';
  };

  const submitUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload = authMode === 'register' ? { name, email, password } : { email, password };
      const data = authMode === 'register' ? await api.register(payload) : await api.login(payload);
      openDashboard(data.user);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const submitAdmin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const data = await api.adminLogin({ email, password });
      openDashboard(data.user);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen section-bg pt-28 pb-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="space-y-8">
          <button
            onClick={() => { window.location.hash = '#home'; }}
            className="btn-outline rounded-full px-4 py-2 text-sm"
          >
            Back to site
          </button>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold-400">Private Access</p>
            <h1 className="playfair mb-5 text-5xl font-bold leading-tight text-theme md:text-6xl">
              Your Novaria<br />
              <span className="text-gradient-gold italic">command suite</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-theme-muted">
              Riders can use a Novaria account or a trusted social account. Admins use protected credentials to monitor bookings, revenue, service demand, and upcoming rides.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Email + social', 'Users'],
              ['Live rides', 'Bookings'],
              ['Admin control', 'Operations'],
            ].map(([title, label]) => (
              <div key={title} className="border-theme bg-black/[0.03] p-4 dark:bg-white/[0.04]">
                <p className="text-lg font-black text-theme">{title}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-theme-subtle">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass gold-border p-5 md:p-8">
          <div className="mb-7 grid grid-cols-2 gap-2 bg-black/[0.04] p-1 dark:bg-white/[0.04]">
            <button
              onClick={() => setMode('user')}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${mode === 'user' ? 'bg-gold-500 text-black' : 'text-theme-muted hover:text-theme'}`}
            >
              <UserRound size={17} /> User
            </button>
            <button
              onClick={() => setMode('admin')}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${mode === 'admin' ? 'bg-gold-500 text-black' : 'text-theme-muted hover:text-theme'}`}
            >
              <ShieldCheck size={17} /> Admin
            </button>
          </div>

          {mode === 'user' ? (
            <div className="space-y-7">
              <div className="mb-7">
                <h2 className="text-2xl font-black text-theme">User dashboard access</h2>
                <p className="mt-2 text-sm leading-6 text-theme-muted">
                  Sign in with your Novaria account, create one, or continue with Google or Facebook.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-black/[0.04] p-1 dark:bg-white/[0.04]">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${authMode === 'login' ? 'bg-gold-500 text-black' : 'text-theme-muted hover:text-theme'}`}
                >
                  <Mail size={17} /> Login
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold transition-colors ${authMode === 'register' ? 'bg-gold-500 text-black' : 'text-theme-muted hover:text-theme'}`}
                >
                  <UserPlus size={17} /> Register
                </button>
              </div>

              <form onSubmit={submitUser} className="space-y-4">
                {authMode === 'register' && (
                  <label className="block">
                    <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-theme-subtle">Full Name</span>
                    <input
                      className="input-luxury w-full px-4 py-3"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </label>
                )}
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-theme-subtle">Email</span>
                  <input
                    className="input-luxury w-full px-4 py-3"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-theme-subtle">Password</span>
                  <input
                    className="input-luxury w-full px-4 py-3"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder={authMode === 'register' ? 'At least 10 characters' : 'Your password'}
                    minLength={authMode === 'register' ? 10 : undefined}
                    required
                  />
                </label>
                <button disabled={loading} className="btn-primary flex w-full items-center justify-center gap-2 px-5 py-4 text-sm font-black disabled:opacity-60">
                  {authMode === 'register' ? <UserPlus size={18} /> : <LockKeyhole size={18} />}
                  {loading ? 'Working...' : authMode === 'register' ? 'Create account' : 'Login to dashboard'}
                </button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-theme" />
                </div>
                <div className="relative flex justify-center">
                  <span className="surface-bg px-3 text-xs font-bold uppercase tracking-widest text-theme-subtle">or</span>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a href={socialLoginUrl('google')} className="btn-outline flex items-center justify-between px-5 py-4 text-sm font-black">
                  <span className="flex items-center gap-2"><GoogleIcon /> Google</span>
                  <ArrowRight size={18} />
                </a>
                <a href={socialLoginUrl('facebook')} className="btn-outline flex items-center justify-between px-5 py-4 text-sm font-black">
                  <span className="flex items-center gap-2"><FacebookIcon /> Facebook</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={submitAdmin}>
              <div className="mb-7">
                <h2 className="text-2xl font-black text-theme">Admin dashboard login</h2>
                <p className="mt-2 text-sm leading-6 text-theme-muted">
                  Admin access is separate from rider social login and is backed by the MySQL users table.
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-theme-subtle">Email</span>
                  <input
                    className="input-luxury w-full px-4 py-3"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="admin@novaria.local"
                    required
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-theme-subtle">Password</span>
                  <input
                    className="input-luxury w-full px-4 py-3"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Admin password"
                    required
                  />
                </label>
              </div>

              <button disabled={loading} className="btn-primary mt-6 flex w-full items-center justify-center gap-2 px-5 py-4 text-sm font-black disabled:opacity-60">
                <LockKeyhole size={18} /> {loading ? 'Signing in...' : 'Open admin dashboard'}
              </button>
            </form>
          )}

          {message && (
            <p className="mt-5 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {message}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.33-1.58-5.04-3.72H.94v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.96 10.7A5.41 5.41 0 0 1 3.68 9c0-.59.1-1.16.28-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.34 2.82.94 4.03l3.02-2.33z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.43 1.35l2.59-2.59C13.46.89 11.43 0 9 0A9 9 0 0 0 .94 4.97L3.96 7.3C4.67 5.16 6.66 3.58 9 3.58z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="9" fill="#1877F2" />
      <path fill="#fff" d="M11.52 9.53l.27-1.76h-1.68V6.63c0-.48.24-.95.99-.95h.77v-1.5s-.7-.12-1.37-.12c-1.4 0-2.31.85-2.31 2.38v1.33H6.63v1.76h1.56v4.25c.31.05.64.08.97.08s.66-.03.97-.08V9.53h1.39z" />
    </svg>
  );
}
