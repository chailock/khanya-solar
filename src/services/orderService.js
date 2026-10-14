import { db } from '../mocks/db';
import { newReference } from '../utils/referenceNumber';
import { USE_MOCKS, request } from './apiClient';
// Test orders only: no payment is taken. Statuses: received, processing, completed, cancelled.
export async function createOrder(payload) {
  if (!USE_MOCKS) return request('/orders', { method: 'POST', body: payload });
  return db.insert('orders', { ...payload, ref: newReference('O'), status: 'received', payment: 'test-checkout' });
}
export async function getOrder(ref) { return USE_MOCKS ? db.find('orders', ref) : request(`/orders/${ref}`); }
