import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LogoMark } from '../../components/common/Logo';
import FormField from '../../components/forms/FormField';
import { useAuth } from '../../features/auth/AuthContext';
import { siteConfig } from '../../data/siteConfig';
export default function LoginPage() {
  const { user, login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/admin" replace />;
  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) { setError('Enter your email and password.'); return; }
    setBusy(true); setError('');
    try { await login(email, password); nav(loc.state?.from || '/admin', { replace: true }); } catch (err) { setError(err.message); setBusy(false); }
  };
  return (
    <div className="authwrap"><form className="authcard" onSubmit={submit} noValidate>
      <LogoMark size={48} /><h1>Admin sign in</h1><p className="note" style={{ margin: 0 }}>Sign in to manage {siteConfig.brand.name} products, orders and enquiries.</p>
      <FormField id="email" label="Email"><input id="email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} /></FormField>
      <FormField id="password" label="Password"><input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} /></FormField>
      {error && <p className="err" role="alert">{error}</p>}
      <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form></div>
  );
}
