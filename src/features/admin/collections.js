import { CUSTOMER_TYPES } from '../../utils/constants';
import { lab } from '../system/systemOptions';
import { projectTypes, CAPACITY, SITE_STATUS, GRID_STATUS, TIMELINE, projectLabel } from '../../data/projectTypes';
import { subtotalLabel } from '../cart/cartUtils';
import { PROPERTY_TYPES, ROOF_TYPES, optLabel } from '../quote/quoteOptions';
const items = (r) => (r.items || []).map((i) => `${i.qty} × ${i.name} (${i.model})`).join('\n') || '—';
const qty = (r) => (r.items || []).reduce((n, i) => n + i.qty, 0);
const loc = (l) => (l ? [l.place, l.province].filter(Boolean).join(', ') || '—' : '—');
const TOPICS = { general: 'General enquiry', products: 'Products and quotations', system: 'Solar system design', project: 'Commercial or EPC project', support: 'Support or maintenance' };
// Route sections -> stored collections. statuses[0] is the "new / needs attention" state.
export const SECTIONS = {
  orders: { db: 'orders', title: 'Orders', statuses: ['received', 'processing', 'completed', 'cancelled'], who: (r) => r.customer.name, summary: (r) => `${qty(r)} item(s)`,
    fields: [['Customer', (r) => r.customer.name], ['Email', (r) => r.customer.email], ['Phone', (r) => r.customer.phone],
      ['Delivery address', (r) => `${r.delivery.street}, ${r.delivery.suburb}, ${r.delivery.city}, ${r.delivery.province} ${r.delivery.postal}`], ['Delivery notes', (r) => r.delivery.notes || '—'],
      ['Items', items], ['Subtotal', (r) => subtotalLabel(r.totals)], ['Delivery cost', () => 'Quoted separately'], ['Payment', () => 'No payment taken online']] },
  quotes: { db: 'quotes', title: 'Quotations', statuses: ['new', 'in_review', 'quoted', 'closed'], who: (r) => r.contact.name, summary: (r) => `${r.type === 'bulk' ? 'Bulk' : 'Quote'}: ${r.items?.length ? items(r).split('\n')[0] : 'no products selected'}`,
    fields: [['Type', (r) => (r.type === 'bulk' ? 'Bulk or reseller enquiry' : 'Quotation request')], ['Customer type', (r) => (r.propertyType ? optLabel(PROPERTY_TYPES, r.propertyType) : CUSTOMER_TYPES[r.customerType] || r.customerType)], ['Name', (r) => r.contact.name],
      ['Monthly bill (R)', (r) => r.monthlyBill || '—'], ['Roof type', (r) => (r.roofType ? optLabel(ROOF_TYPES, r.roofType) : '—')], ['Installation address', (r) => r.location?.address || '—'],
      ['Company', (r) => r.contact.company || '—'], ['Email', (r) => r.contact.email], ['Phone', (r) => r.contact.phone], ['Location', (r) => loc(r.location)], ['Products', items],
      ['Delivery requirements', (r) => r.deliveryNotes || '—'], ['Message', (r) => r.message || '—']] },
  'solar-enquiries': { db: 'systemEnquiries', title: 'System enquiries', statuses: ['new', 'in_review', 'contacted', 'closed'], who: (r) => r.contact.name, summary: (r) => `${lab('customerType', r.customerType)}, ${r.location.place}`,
    fields: [['Customer type', (r) => lab('customerType', r.customerType)], ['Name', (r) => r.contact.name], ['Email', (r) => r.contact.email], ['Phone', (r) => r.contact.phone], ['Site', (r) => loc(r.location)],
      ['Monthly bill (R)', (r) => r.consumption?.bill || '—'], ['Monthly use (kWh)', (r) => r.consumption?.kwh || '—'], ['Supply', (r) => lab('supply', r.supply)],
      ['Main loads', (r) => [...(r.loads || []), r.otherLoads].filter(Boolean).join(', ') || '—'], ['Operating hours', (r) => lab('hours', r.hours)],
      ['Backup', (r) => (r.backup === 'none' ? lab('backup', 'none') : `${lab('backup', r.backup)}, ${lab('backupHours', r.backupHours)}`)],
      ['Solar panels', (r) => lab('pv', r.pv)], ['Batteries', (r) => lab('battery', r.battery)], ['Grid preference', (r) => lab('gridPref', r.gridPref)], ['Notes', (r) => r.notes || '—']] },
  projects: { db: 'projects', title: 'Project leads', statuses: ['new', 'qualifying', 'site_assessment', 'proposal', 'closed'], who: (r) => r.contact.name, summary: (r) => `${projectLabel(projectTypes.map((t) => [t.slug, t.name]), r.projectType)}, ${r.location.place}`,
    fields: [['Project type', (r) => projectLabel(projectTypes.map((t) => [t.slug, t.name]), r.projectType)], ['Name', (r) => r.contact.name], ['Company', (r) => r.contact.company], ['Email', (r) => r.contact.email], ['Phone', (r) => r.contact.phone],
      ['Location', (r) => loc(r.location)], ['Capacity', (r) => projectLabel(CAPACITY, r.capacity)], ['Capacity detail', (r) => r.capacityNote || '—'], ['Land or roof', (r) => projectLabel(SITE_STATUS, r.siteStatus)],
      ['Grid connection', (r) => projectLabel(GRID_STATUS, r.gridStatus)], ['Timeline', (r) => projectLabel(TIMELINE, r.timeline)], ['Description', (r) => r.description || '—'], ['Linked system enquiry', (r) => r.linkedEnquiry || '—'], ['Routed to', (r) => r.routedTo || 'SFSC']] },
  messages: { db: 'messages', title: 'Messages', statuses: ['new', 'replied', 'closed'], who: (r) => r.contact.name, summary: (r) => TOPICS[r.topic] || r.topic,
    fields: [['Topic', (r) => TOPICS[r.topic] || r.topic], ['Name', (r) => r.contact.name], ['Email', (r) => r.contact.email], ['Phone', (r) => r.contact.phone || '—'], ['Message', (r) => r.message]] },
};
export const statusLabel = (s) => (s || '').replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
export const csvColumns = (sec) => [['Reference', (r) => r.ref], ['Status', (r) => statusLabel(r.status)], ['Created', (r) => r.createdAt], ['Last updated', (r) => r.updatedAt], ...sec.fields];
