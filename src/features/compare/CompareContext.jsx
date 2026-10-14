import { createContext, useContext, useEffect, useState } from 'react';
export const MAX_COMPARE = 3;
const Ctx = createContext(null);
const read = () => { try { return JSON.parse(sessionStorage.getItem('compare') || '[]'); } catch (e) { return []; } };
export function CompareProvider({ children }) {
  const [slugs, setSlugs] = useState(read);
  useEffect(() => { try { sessionStorage.setItem('compare', JSON.stringify(slugs)); } catch (e) { /* storage unavailable */ } }, [slugs]);
  const toggle = (s) => setSlugs((c) => (c.includes(s) ? c.filter((x) => x !== s) : c.length < MAX_COMPARE ? [...c, s] : c));
  const value = { slugs, toggle, has: (s) => slugs.includes(s), full: slugs.length >= MAX_COMPARE, clear: () => setSlugs([]) };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCompare = () => useContext(Ctx);
