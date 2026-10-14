import { siteConfig } from '../data/siteConfig';
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
// kind: Q = quotation request, B = bulk enquiry, O = test order. Example: KS-Q-261014-7HK2
export function newReference(kind) {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const rand = Array.from({ length: 4 }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
  return `${siteConfig.refPrefix}-${kind}-${ymd}-${rand}`;
}
