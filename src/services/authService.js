import { USE_MOCKS, request } from './apiClient';
// Browser-side sign-in, used until the app is connected to the server (then POST /auth/login does the real check).
// Values prefixed VITE_ are visible in the built site, so never reuse a real password for them.
const EMAIL = import.meta.env.VITE_ADMIN_EMAIL || import.meta.env.VITE_DEMO_ADMIN_EMAIL;
const PASS = import.meta.env.VITE_ADMIN_PASSWORD || import.meta.env.VITE_DEMO_ADMIN_PASSWORD;
const FAIL_KEY = 'khanya:admin:fails';
const readFails = () => { try { return JSON.parse(sessionStorage.getItem(FAIL_KEY) || '{"n":0,"until":0}'); } catch (e) { return { n: 0, until: 0 }; } };
export async function login(email, password) {
  if (!USE_MOCKS) return request('/auth/login', { method: 'POST', body: { email, password } });
  if (!EMAIL || !PASS) throw new Error('Admin sign-in is not configured. Copy .env.example to .env, set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD, then restart the dev server.');
  const f = readFails();
  if (f.until > Date.now()) throw new Error(`Too many attempts. Try again in ${Math.ceil((f.until - Date.now()) / 1000)} seconds.`);
  await new Promise((r) => setTimeout(r, 400));
  if (email.trim().toLowerCase() === EMAIL.toLowerCase() && password === PASS) {
    try { sessionStorage.removeItem(FAIL_KEY); } catch (e) { /* ignore */ }
    return { user: { email: EMAIL, name: 'Administrator', role: 'admin' }, expiresAt: Date.now() + 8 * 3600 * 1000 };
  }
  const n = f.n + 1;
  try { sessionStorage.setItem(FAIL_KEY, JSON.stringify({ n: n >= 5 ? 0 : n, until: n >= 5 ? Date.now() + 60000 : 0 })); } catch (e) { /* ignore */ }
  throw new Error('Incorrect email or password.');
}
