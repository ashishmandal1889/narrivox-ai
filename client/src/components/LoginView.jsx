import { useState } from 'react';
import { requestJson } from '../api';

export default function LoginView({ onAuthSuccess }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('Create an account or log in to sync scripts with the database.');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setBusy(true);
    setStatus(mode === 'login' ? 'Logging you in...' : 'Creating your account...');

    try {
      const data = await requestJson(`/api/auth/${mode}`, {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), password }),
      });
      setStatus('Synced with the database.');
      onAuthSuccess(data.token, data.user, data.scripts || []);
    } catch (err) {
      setStatus(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="comic-dashboard">
        <div className="hero-panel">
          <div className="logo-frame">
            <img
              className="brand-logo"
              src="./assets/narrivox-logo.jpeg"
              alt="Narrivox AI logo"
            />
            <span className="frame-accent top-left" />
            <span className="frame-accent bottom-right" />
          </div>
          <div className="hero-text">
            <span className="word word-white">WRITE</span>
            <span className="word word-yellow">SHARPER</span>
            <span className="word word-blue">YOUTUBE</span>
            <span className="word word-red">SCRIPTS</span>
          </div>
          <p className="hero-sub">
            Sign in with your email to open your script dashboard, save generation
            history, and shape scripts with tones ranging from satire to criticism
            to movie-review style breakdowns.
          </p>
          <div className="feature-chips">
            <span className="chip chip-ai">AI powered</span>
            <span className="chip chip-history">History sidebar</span>
            <span className="chip chip-email">Email login</span>
          </div>
        </div>

        <section className="auth-panel">
          <div className="auth-header">
            <span className="auth-header-icon">⚡</span>
            CONTROL PANEL
          </div>
          <div className="auth-tabs" role="tablist" aria-label="Authentication tabs">
            <button
              type="button"
              className={`tab-button${mode === 'login' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => setMode('login')}
            >
              LOGIN
            </button>
            <button
              type="button"
              className={`tab-button${mode === 'signup' ? ' active' : ''}`}
              role="tab"
              aria-selected={mode === 'signup'}
              onClick={() => setMode('signup')}
            >
              SIGN UP
            </button>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              <span>Email address</span>
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="creator@narrivox.ai"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <span>Password</span>
              <input
                name="password"
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder={mode === 'login' ? 'Enter password' : 'At least 8 characters'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <button type="submit" className="cta-button" disabled={busy}>
              {mode === 'login' ? 'ENTER WORKSPACE' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <p className="helper-text">{status}</p>
        </section>
      </section>
    </main>
  );
}
