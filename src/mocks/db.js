// Demo storage in the browser. Replaced by the Spring Boot API later (see services/apiClient.js).
const mem = {};
const key = (c) => `khanya:${c}`;
const load = (c) => mem[c] ?? (mem[c] = (() => { try { return JSON.parse(localStorage.getItem(key(c)) || '[]'); } catch (e) { return []; } })());
const save = (c) => { try { localStorage.setItem(key(c), JSON.stringify(mem[c])); } catch (e) { /* storage unavailable */ } };
export const COLLECTION_NAMES = ['orders', 'quotes', 'systemEnquiries', 'projects', 'messages'];
export const db = {
  list: (c) => load(c),
  find: (c, ref) => load(c).find((r) => r.ref === ref) || null,
  insert(c, row, at = new Date()) {
    const now = at.toISOString();
    const rec = { ...row, createdAt: now, updatedAt: now, history: [{ status: row.status, at: now, by: 'customer' }] };
    mem[c] = [rec, ...load(c)];
    save(c);
    return rec;
  },
  setStatus(c, ref, status, note = '') {
    const rec = load(c).find((r) => r.ref === ref);
    if (!rec) return null;
    const now = new Date().toISOString();
    rec.status = status; rec.updatedAt = now; rec.history = [...rec.history, { status, at: now, by: 'admin', note }];
    save(c);
    return rec;
  },
  clear(c) { mem[c] = []; save(c); },
};
