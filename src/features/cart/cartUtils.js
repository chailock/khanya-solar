import { getProduct } from '../products/productUtils';
import { formatCurrency } from '../../utils/formatCurrency';
export const lines = (items) => items.map((i) => ({ product: getProduct(i.slug), qty: i.qty })).filter((l) => l.product);
export function totals(ls) {
  const priced = ls.filter((l) => l.product.price != null);
  return { subtotal: priced.reduce((s, l) => s + l.product.price * l.qty, 0), hasUnpriced: priced.length < ls.length, allUnpriced: priced.length === 0 };
}
export const subtotalLabel = (t) => (t.allUnpriced ? 'Quoted on confirmation' : formatCurrency(t.subtotal) + (t.hasUnpriced ? ' + items quoted separately' : ''));
