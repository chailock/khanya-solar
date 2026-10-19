// Product photos saved in public/images/products/ are matched to products by file name, so every device (phones included) shows them.
// Name a file after the product slug or model, e.g. hess-hy-s-6k-s.jpg or HESS-HY-S-6K-S.png.
const found = import.meta.glob('/public/**/products/*.{jpg,jpeg,png,webp,avif}', { query: '?url', import: 'default' });
const files = Object.keys(found).map((k) => k.replace(/^\/public/, ''));
const norm = (s) => String(s || '').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]/g, '');
export function autoProductImage(p) {
  const keys = [norm(p.slug), norm(p.model)].filter(Boolean);
  const stem = (f) => norm(f.split('/').pop());
  return files.find((f) => keys.includes(stem(f))) || files.find((f) => keys.some((k) => stem(f).includes(k))) || null;
}
