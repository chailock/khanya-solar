import { createContext, useContext, useState } from 'react';
import { login as doLogin } from '../../services/authService';
const Ctx = createContext(null);
const KEY = 'khanya:admin';
const read = () => { try { const s = JSON.parse(sessionStorage.getItem(KEY) || 'null'); return s && s.expiresAt > Date.now() ? s.user : null; } catch (e) { return null; } };
export function AuthProvider({ children }) {
  const [user, setUser] = useState(read);
  const login = async (email, password) => {
    const s = await doLogin(email, password);
    try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* ignore */ }
    setUser(s.user);
  };
  const logout = () => { try { sessionStorage.removeItem(KEY); } catch (e) { /* ignore */ } setUser(null); };
  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
}
export const useAuth = () => useContext(Ctx);
