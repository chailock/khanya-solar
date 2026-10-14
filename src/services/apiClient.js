export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
const BASE = import.meta.env.VITE_API_URL || '/api';
export async function request(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE}${path}`, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}
