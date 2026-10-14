import { db } from '../mocks/db';
import { newReference } from '../utils/referenceNumber';
import { USE_MOCKS, request } from './apiClient';
// payload.type is 'quote' or 'bulk'. Statuses: new, in_review, quoted, closed.
export async function createQuote(payload) {
  if (!USE_MOCKS) return request('/quotes', { method: 'POST', body: payload });
  return db.insert('quotes', { ...payload, ref: newReference(payload.type === 'bulk' ? 'B' : 'Q'), status: 'new' });
}
export async function getQuote(ref) { return USE_MOCKS ? db.find('quotes', ref) : request(`/quotes/${ref}`); }
