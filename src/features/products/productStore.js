// Admin edits to the catalogue. The shared demoProducts array is updated in place so the storefront shows changes straight away.
// Edits are saved with the catalogue version. When the catalogue itself is updated (see CATALOGUE_VERSION), older saved edits are
// discarded so they cannot hide the current Hanchu products and prices.
import { demoProducts, CATALOGUE_VERSION } from '../../data/demoProducts';
const KEY = 'khanya:products';
const VERSION_KEY = 'khanya:products:version';
export const seedProducts = JSON.parse(JSON.stringify(demoProducts));
const apply = (list) => demoProducts.splice(0, demoProducts.length, ...list);
try {
  const raw = localStorage.getItem(KEY);
  if (raw && localStorage.getItem(VERSION_KEY) === CATALOGUE_VERSION) apply(JSON.parse(raw));
  else if (raw) localStorage.removeItem(KEY);
} catch (e) { /* ignore */ }
const persist = () => {
  try {
    localStorage.setItem(KEY, JSON.stringify(demoProducts));
    localStorage.setItem(VERSION_KEY, CATALOGUE_VERSION);
  } catch (e) {
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
export function resetProducts() { apply(JSON.parse(JSON.stringify(seedProducts))); try { localStorage.removeItem(KEY); localStorage.removeItem(VERSION_KEY); } catch (e) { /* ignore */ } }
