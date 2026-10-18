// Admin edits to the catalogue. The shared demoProducts array is updated in place so the storefront shows changes straight away.
import { demoProducts } from '../../data/demoProducts';
const KEY = 'khanya:products';
export const seedProducts = JSON.parse(JSON.stringify(demoProducts));
const apply = (list) => demoProducts.splice(0, demoProducts.length, ...list);
try { const raw = localStorage.getItem(KEY); if (raw) apply(JSON.parse(raw)); } catch (e) { /* ignore */ }
const persist = () => {
  try { localStorage.setItem(KEY, JSON.stringify(demoProducts)); } catch (e) {
    throw new Error('Browser storage is full, so this change will be lost on reload. Remove or shrink some product images and try again.');
  }
};
export function saveProduct(p, originalSlug) {
  const i = demoProducts.findIndex((x) => x.slug === (originalSlug || p.slug));
  if (i >= 0) demoProducts[i] = p; else demoProducts.push(p);
  persist();
  return p;
}
export function removeProduct(slug) { const i = demoProducts.findIndex((x) => x.slug === slug); if (i >= 0) demoProducts.splice(i, 1); persist(); }
export function resetProducts() { apply(JSON.parse(JSON.stringify(seedProducts))); try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ } }
