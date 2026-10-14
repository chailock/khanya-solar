// Demo storage in the browser. Replaced by the Spring Boot API later (see services/apiClient.js).
const mem = {};
const key = (c) => `khanya:${c}`;
const load = (c) => mem[c] ?? (mem[c] = (() => { try { return JSON.parse(localStorage.getItem(key(c)) || '[]'); } catch (e) { return []; } })());
const save = (c) => { try { localStorage.setItem(key(c), JSON.stringify(mem[c])); } catch (e) { /* storage unavailable */ } };
export const db = {
  list: (c) => load(c),
  find: (c, ref) => load(c).find((r) => r.ref === ref) || null,
  insert(c, row) {
    const now = new Date().toISOString();
    const rec = { ...row, createdAt: now, updatedAt: now, history: [{ status: row.status, at: now }] };
    mem[c] = [rec, ...load(c)];
    save(c);
    return rec;
  },
};
