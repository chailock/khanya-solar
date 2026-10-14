export const required = (v) => (String(v ?? '').trim() ? '' : 'This field is required');
export const email = (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()) ? '' : 'Enter a valid email address');
export const phone = (v) => (/^\+?[0-9 ()-]{9,16}$/.test(String(v).trim()) ? '' : 'Enter a valid phone number');
export const postal = (v) => (/^\d{4}$/.test(String(v).trim()) ? '' : 'Enter a 4-digit postal code');
export const checked = (v) => (v ? '' : 'Please confirm to continue');
// rules: { field: [fn, fn] }. The first failing rule's message is returned per field.
export const run = (rules, values) => Object.fromEntries(Object.entries(rules).map(([k, fns]) => [k, fns.map((f) => f(values[k])).find(Boolean) || '']).filter(([, m]) => m));
