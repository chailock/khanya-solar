// Sample records with fictional customers, for trying the admin screens. Names and contact details are not real.
import { db } from './db';
import { newReference } from '../utils/referenceNumber';
const ago = (d, h = 0) => new Date(Date.now() - d * 864e5 - h * 36e5);
const I = (slug, model, name, qty) => ({ slug, model, name, qty });
const sixk = I('hess-hy-s-6k-s', 'HESS-HY-S-6K-S', 'Single-phase hybrid inverter 6 kW', 1);
const batt = (q) => I('home-ess-lv-5-12k', 'HOME-ESS-LV-5.12K', 'Wall-mount lithium battery 5.12 kWh', q);
const cess = I('cess-hy-30k', 'CESS-HY-30K', 'Three-phase hybrid inverter 30 kW', 1);
const c = (name, n, company = '') => ({ name, email: `${name.split(' ')[0].toLowerCase()}@example.com`, phone: `082 000 01${n}`, company });
const t0 = { allUnpriced: true, hasUnpriced: true, subtotal: 0 };
export function seedSampleRecords() {
  const rows = [
    ['orders', 'O', 1, { customer: c('Thandi Nkosi', 11), delivery: { street: '12 Demo Street', suburb: 'Newcastle Park', city: 'Newcastle', province: 'KwaZulu-Natal', postal: '2940', notes: '' }, items: [sixk, batt(2)], totals: t0, consent: true, status: 'received', payment: 'test-checkout' }],
    ['orders', 'O', 4, { customer: c('Pieter Botha', 12), delivery: { street: '8 Sample Road', suburb: 'Central', city: 'Standerton', province: 'Mpumalanga', postal: '2430', notes: 'Call before delivery' }, items: [cess], totals: t0, consent: true, status: 'processing', payment: 'test-checkout' }],
    ['quotes', 'Q', 0, { type: 'quote', customerType: 'homeowner', contact: c('Lerato Mokoena', 13), location: { province: 'Gauteng', place: 'Midrand' }, items: [sixk, batt(1)], deliveryNotes: 'Gate access needed', message: '', consent: true, status: 'new' }],
    ['quotes', 'B', 3, { type: 'bulk', customerType: 'installer', contact: c('Sarah van Wyk', 14, 'Sample Installers (Pty) Ltd'), location: { province: 'Free State', place: 'Bethlehem' }, items: [sixk], deliveryNotes: '', message: 'About 20 units per quarter', consent: true, status: 'in_review' }],
    ['systemEnquiries', 'S', 0, { customerType: 'residential', location: { province: 'KwaZulu-Natal', place: 'Dundee' }, consumption: { bill: '2400', kwh: '' }, supply: 'single', loads: ['Fridge and freezer', 'Geyser or water heating'], otherLoads: '', hours: 'evening', backup: 'essential', backupHours: '4', pv: 'yes', battery: 'yes', gridPref: 'hybrid', notes: '', contact: c('Sipho Dlamini', 15), consent: true, status: 'new' }],
    ['systemEnquiries', 'S', 6, { customerType: 'agricultural', location: { province: 'Mpumalanga', place: 'Volksrust' }, consumption: { bill: '', kwh: '3200' }, supply: 'three', loads: ['Borehole or irrigation pump', 'Cold room or refrigeration'], otherLoads: '', hours: 'day', backup: 'none', backupHours: '', pv: 'yes', battery: 'unsure', gridPref: 'selfuse', notes: 'Pumps run mostly in daylight', contact: c('Johan Pretorius', 16), consent: true, status: 'contacted' }],
    ['projects', 'P', 1, { projectType: 'agricultural', location: { province: 'Free State', place: 'Frankfort' }, capacity: '100kw-1mw', capacityNote: '350 kWp ground mount', siteStatus: 'ground', gridStatus: 'connected-unknown', timeline: '6m', description: 'Irrigation and cold storage', linkedEnquiry: '', contact: c('Anri Venter', 17, 'Sample Farms (Pty) Ltd'), consent: true, status: 'new', routedTo: 'SFSC' }],
    ['projects', 'P', 9, { projectType: 'commercial-industrial', location: { province: 'KwaZulu-Natal', place: 'Newcastle' }, capacity: 'u100kw', capacityNote: '80 kWp roof', siteStatus: 'roof', gridStatus: 'connected', timeline: '3m', description: 'Warehouse roof', linkedEnquiry: '', contact: c('Mandla Zulu', 18, 'Sample Logistics (Pty) Ltd'), consent: true, status: 'proposal', routedTo: 'SFSC' }],
    ['messages', 'C', 0, { topic: 'products', contact: c('Naledi Khumalo', 19), message: 'Do you stock the 5.12 kWh battery in Gauteng?', consent: true, status: 'new' }],
    ['messages', 'C', 2, { topic: 'support', contact: c('Willem Smit', 20), message: 'Looking for an annual service contract for a 30 kW system.', consent: true, status: 'replied' }],
  ];
  rows.forEach(([col, kind, days, rec]) => db.insert(col, { ...rec, ref: newReference(kind) }, ago(days, 2)));
  return rows.length;
}
