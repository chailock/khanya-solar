// Option lists match the quote form on solarfarmingsystems.co.za.
export const ROOF_TYPES = [['ibr-north', 'IBR Sheeting — North-facing'], ['ibr-ew', 'IBR Sheeting — East/West'], ['tile-north', 'Tile Roof — North-facing'], ['tile-ew', 'Tile Roof — East/West'], ['flat', 'Flat / Concrete Roof'], ['ground', 'Ground Mount'], ['other', 'Other / Not sure']];
export const PROPERTY_TYPES = [['agricultural', 'Agricultural / Farm'], ['commercial', 'Commercial / Industrial'], ['residential', 'Residential'], ['offgrid', 'Off-Grid / Remote'], ['lodge', 'Game Lodge / Tourism'], ['community', 'Community / Municipal']];
export const QUOTE_PROVINCES = ['KwaZulu-Natal', 'Mpumalanga', 'Free State', 'Gauteng', 'North West', 'Limpopo', 'Western Cape', 'Eastern Cape', 'Northern Cape', 'Other'];
export const CUSTOMER_TYPE_FOR = { agricultural: 'farm', commercial: 'business', residential: 'homeowner', offgrid: 'homeowner', lodge: 'business', community: 'business' };
export const optLabel = (list, v) => list.find((o) => o[0] === v)?.[1] || v || '—';
export const QUOTE_POINTS = ['Instant preliminary estimate based on your consumption', 'Detailed PVsyst simulation included in full proposal', 'Section 12B tax incentive calculated for agricultural & business clients',
  'Equipment schedule with Tier 1 panel specifications', '20-year financial projection with ROI crossover point', 'No obligation — quotes are 100% free'];
