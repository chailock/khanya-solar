import { db } from '../mocks/db';
import { newReference } from '../utils/referenceNumber';
import { USE_MOCKS, request } from './apiClient';
// General messages from the contact page. Statuses: new, replied, closed.
export async function createMessage(payload) {
  if (!USE_MOCKS) return request('/messages', { method: 'POST', body: payload });
  return db.insert('messages', { ...payload, ref: newReference('C'), status: 'new' });
}
