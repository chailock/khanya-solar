import { db } from '../mocks/db';
import { newReference } from '../utils/referenceNumber';
import { USE_MOCKS, request } from './apiClient';
// Statuses: new, in_review, contacted, closed.
export async function createSystemEnquiry(payload) {
  if (!USE_MOCKS) return request('/system-enquiries', { method: 'POST', body: payload });
  return db.insert('systemEnquiries', { ...payload, ref: newReference('S'), status: 'new' });
}
export async function getSystemEnquiry(ref) { return USE_MOCKS ? db.find('systemEnquiries', ref) : request(`/system-enquiries/${ref}`); }
