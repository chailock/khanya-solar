// Matches a product to a photo by file name. Order: exact name, name contains the slug or model, then family hints (e.g. "bess", "cess-hy").
const norm = (s) => String(s || '').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]/g, '');
const HINTS = {
  'hess-hy-s-6k-s': ['hesshys', 'hybrid6k', '6kw'], 'cess-hy-25k-50k': ['cesshy', 'cess', 'ci hybrid'], 'home-ess-lv-5-12k': ['homeess', 'lv512', 'wallbattery'],
  'hess-of-e-3-5k1': ['hessof', 'offgrid', '35k1'], 'bess-5015s-h': ['bess', '5015', '5mwh'],
};
export const stemOf = (f) => norm(f.split('/').pop());
export function matchProductImage(p, files) {
  const stems = files.map((f) => [f, stemOf(f)]);
  const keys = [norm(p.slug), norm(p.model)].filter(Boolean);
  const hit = stems.find(([, s]) => keys.includes(s)) || stems.find(([, s]) => keys.some((k) => s.includes(k) || (s.length >= 6 && k.includes(s))));
  if (hit) return hit[0];
  const hints = (HINTS[p.slug] || []).map(norm);
  const h = stems.find(([, s]) => hints.some((k) => s.includes(k)));
  return h ? h[0] : null;
}
