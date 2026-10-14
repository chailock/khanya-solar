import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { getProduct } from '../products/productUtils';
const Ctx = createContext(null);
const read = () => { try { return JSON.parse(localStorage.getItem('khanya:cart') || '[]'); } catch (e) { return []; } };
export function CartProvider({ children }) {
  const [items, setItems] = useState(read);
  const [notice, setNotice] = useState('');
  const timer = useRef();
  useEffect(() => { try { localStorage.setItem('khanya:cart', JSON.stringify(items)); } catch (e) { /* storage unavailable */ } }, [items]);
  const add = (slug, qty = 1) => {
    setItems((c) => (c.some((i) => i.slug === slug) ? c.map((i) => (i.slug === slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i)) : [...c, { slug, qty }]));
    setNotice(`${getProduct(slug)?.model || 'Item'} added to cart`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(''), 2800);
  };
  const setQty = (slug, qty) => setItems((c) => c.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, Math.min(99, qty)) } : i)));
  const remove = (slug) => setItems((c) => c.filter((i) => i.slug !== slug));
  const value = { items, add, setQty, remove, clear: () => setItems([]), count: items.reduce((n, i) => n + i.qty, 0), notice };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useCart = () => useContext(Ctx);
