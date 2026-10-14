import { db } from '../mocks/db';
import { newReference } from '../utils/referenceNumber';
import { USE_MOCKS, request } from './apiClient';
// Project leads go to SFSC. Statuses: new, qualifying, site_assessment, proposal, closed.
export async function createProject(payload) {
  if (!USE_MOCKS) return request('/projects', { method: 'POST', body: payload });
  return db.insert('projects', { ...payload, ref: newReference('P'), status: 'new', routedTo: 'SFSC' });
}
export async function getProject(ref) { return USE_MOCKS ? db.find('projects', ref) : request(`/projects/${ref}`); }
