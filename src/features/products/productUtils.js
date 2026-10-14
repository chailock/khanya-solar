import { demoProducts } from '../../data/demoProducts';
export const getProduct = (slug) => demoProducts.find((p) => p.slug === slug);
export function filterProducts(list, { q = '', category = '', application = '', phase = '', availability = '' }) {
  const t = q.trim().toLowerCase();
  return list.filter((p) => (!category || p.category === category) && (!application || p.application === application)
    && (!phase || p.phase === phase) && (!availability || p.availability === availability)
    && (!t || `${p.name} ${p.model} ${p.manufacturer}`.toLowerCase().includes(t)));
}
const rank = { stock: 0, tbc: 1, soon: 2 };
export function sortProducts(list, sort) {
  const a = [...list];
  if (sort === 'name') a.sort((x, y) => x.name.localeCompare(y.name));
  if (sort === 'availability') a.sort((x, y) => rank[x.availability] - rank[y.availability]);
  return a;
}
