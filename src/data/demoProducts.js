// The live product catalogue. Source: Hanchu Energy SA (Pty) Ltd distributor price list, July 2026 ("A Price", in rand),
// plus technical details from the Hanchu ESS brochure (2026) where a product clearly matches. "available" on the price list is shown as In stock.
// Prices are as supplied by Hanchu; their VAT treatment is not stated on the list. null shows "Price on request".
// Change CATALOGUE_VERSION whenever this list changes, so catalogues saved earlier in a browser are replaced.
export const CATALOGUE_VERSION = '2026-07-hanchu-sa';
export const applications = { residential: 'Residential', commercial: 'Commercial and industrial', utility: 'Utility-scale', general: 'All applications' };
export const phases = { single: 'Single-phase', three: 'Three-phase' };
export const availabilityLabels = { stock: 'In stock', tbc: 'Availability to be confirmed', soon: 'Coming soon' };

const battery = (o) => ({ category: 'batteries', application: 'residential', phase: null, manufacturer: 'Hanchu', datasheet: null, efficiency: null, ip: null, dims: null, weight: null, highlights: [], availability: 'stock', ...o });
const accessory = (o) => ({ category: 'accessories', application: 'general', phase: null, manufacturer: 'Hanchu', datasheet: null, headline: null, voltage: null, efficiency: null, ip: null, dims: null, weight: null, highlights: [], availability: 'stock', ...o });
const offGrid = (o) => ({ category: 'off-grid-inverters', application: 'residential', phase: null, manufacturer: 'Hanchu', datasheet: null, efficiency: null, ip: null, dims: null, weight: null, highlights: [], availability: 'stock', ...o });
const panel = (o) => ({ category: 'pv-modules', application: 'general', phase: null, manufacturer: 'Renesolar', datasheet: null, voltage: null, efficiency: null, ip: null, dims: null, weight: null, highlights: [], availability: 'stock', ...o });

// Series specifications for the three-phase C&I hybrid range, from the brochure. Rated power and parallel operation come from the price list.
const cessSeries = [['Grid connection', '3L / N / PE; 220/380 V, 230/400 V or 240/415 V'], ['PV inputs', '4 MPPT, up to 30 A each'], ['MPPT voltage range', '200 to 850 V'], ['Max. DC input voltage', '1000 V'],
  ['Battery type', 'Lithium battery (with BMS)'], ['Battery voltage range', '135 to 750 V'], ['Max. charge / discharge current', '100 / 100 A'], ['Max. efficiency', '98.8%'], ['Dimensions', '800 × 620 × 300 mm'], ['Weight', '76 kg'], ['Ingress protection', 'IP65']];
const cessHighlights = ['Up to 100% unbalanced load', 'Within 20 ms UPS-level switching', 'Up to 110% AC output overloading', 'Parallel operation from kW to MW level'];

export const demoProducts = [
  { slug: 'hess-hy-s-6k-s', category: 'hybrid-inverters', application: 'residential', phase: 'single', manufacturer: 'Hanchu', model: 'HESS-HY-S-6K-S', name: 'Single-phase hybrid inverter 6 kW', price: 8300, availability: 'stock', datasheet: null,
    specs: ['6 kW rated output', '2 MPPT inputs, 48 V battery', '5 years warranty'], headline: '6 kW', voltage: '48 V (40 to 60 VDC)', efficiency: '97.5%', ip: null, dims: '556 × 345 × 182 mm', weight: '20 kg',
    highlights: ['Advanced MPPT with up to 99.9% tracking efficiency', 'Up to 16 A + 16 A PV input current', 'Easy to install and simple to use'],
    table: [['Rated output power', '6000 W'], ['Max. peak power', '12000 VA'], ['Rated output voltage', '230 VAC, single phase'], ['Battery type', 'Lead-acid / Li-ion / user-defined'], ['Battery voltage', '48 V (range 40 to 60 VDC)'], ['PV inputs', '2 MPPT, 4500 W + 4500 W max.'],
      ['MPPT voltage range', '120 to 450 VDC'], ['Max. efficiency', '97.5%'], ['Parallel operation', '1 to 6 units'], ['Dimensions', '556 × 345 × 182 mm'], ['Weight', '20 kg'], ['Warranty', '5 years']] },
  { slug: 'cess-hy-30k', category: 'hybrid-inverters', application: 'commercial', phase: 'three', manufacturer: 'Hanchu', model: 'CESS-HY-30K', name: 'Three-phase hybrid inverter 30 kW', price: 55000, availability: 'stock', datasheet: null,
    specs: ['30 kW rated output', 'Up to 4 units in parallel', '5 years warranty'], headline: '30 kW', voltage: '135 to 750 V', efficiency: '98.8%', ip: 'IP65', dims: '800 × 620 × 300 mm', weight: '76 kg', highlights: cessHighlights,
    table: [['Rated output power', '30 kW'], ['Parallel operation', 'Up to 4 units'], ['Warranty', '5 years'], ...cessSeries] },
  { slug: 'home-ess-lv-5-12k', category: 'batteries', application: 'residential', phase: null, manufacturer: 'Hanchu', model: 'HOME-ESS-LV-5.12K', name: 'Wall-mount lithium battery 5.12 kWh', price: 11000, availability: 'stock', datasheet: null,
    specs: ['LFP (LiFePO4), 51.2 V / 100 Ah', '95% depth of discharge', 'Up to 16 units in parallel'], headline: '5.12 kWh', voltage: '51.2 V (43.2 to 57.6 V)', efficiency: null, ip: 'IP54', dims: '338 × 138.5 × 600 mm', weight: '46.5 kg',
    highlights: ['Up to 95% depth of discharge, more usable energy', 'Fire protection for every pack', 'Max. 220 A main circuit in parallel, no combiner box needed'],
    table: [['Nominal energy', '5.12 kWh'], ['Nominal voltage', '51.2 V'], ['Capacity', '100 Ah'], ['Operating voltage range', '43.2 to 57.6 V'], ['Cell type', 'LFP (LiFePO4)'], ['Depth of discharge', '95%'], ['Charge / discharge current', '100 A / 100 A'],
      ['Parallel operation', 'Up to 16 units'], ['Ingress protection', 'IP54'], ['Cooling', 'Natural convection'], ['Communication', 'CAN / RS485 / WIFI / Bluetooth'], ['Safety certification', 'IEC 62619 / CE'], ['Transport certification', 'UN38.3'],
      ['Dimensions (W × D × H)', '338 × 138.5 × 600 mm'], ['Weight', '46.5 kg'], ['Warranty', '5+5 years']] },
  { slug: 'home-ess-lv-2-56k', model: 'HOME-ESS-LV-2.56K', name: 'Low-voltage lithium battery 2.56 kWh', price: 5500, specs: ['25.6 V / 100 Ah', '95% depth of discharge', 'Up to 8 units in parallel'], headline: '2.56 kWh', voltage: '25.6 V',
    table: [['Nominal energy', '2.56 kWh'], ['Nominal voltage', '25.6 V'], ['Capacity', '100 Ah'], ['Depth of discharge', '95%'], ['Parallel operation', 'Up to 8 units'], ['Warranty', '5+5 years']] },
  { slug: 'home-ess-lv-5-12k-s', model: 'HOME-ESS-LV-5.12K-S', name: 'Low-voltage lithium battery 5.12 kWh (S)', price: 10450, specs: ['51.2 V / 100 Ah', '95% depth of discharge', 'Up to 16 units in parallel'], headline: '5.12 kWh', voltage: '51.2 V',
    table: [['Nominal energy', '5.12 kWh'], ['Nominal voltage', '51.2 V'], ['Capacity', '100 Ah'], ['Depth of discharge', '95%'], ['Parallel operation', 'Up to 16 units'], ['Warranty', '5+5 years']] },
  { slug: 'home-ess-lv-9-4k', model: 'HOME-ESS-LV-9.4K', name: 'Low-voltage lithium battery 9.4 kWh with WiFi dongle', price: 17600, specs: ['51.2 V / 184 Ah', '95% depth of discharge', 'WiFi dongle, up to 16 units in parallel'], headline: '9.4 kWh', voltage: '51.2 V',
    table: [['Nominal energy', '9.4 kWh'], ['Nominal voltage', '51.2 V'], ['Capacity', '184 Ah'], ['Depth of discharge', '95%'], ['Connectivity', 'WiFi dongle'], ['Parallel operation', 'Up to 16 units'], ['Warranty', '5+5 years']] },
  { slug: 'home-ess-lv-16k-s', model: 'HOME-ESS-LV-16K-S', name: 'Low-voltage lithium battery 16 kWh (S)', price: 22450, specs: ['51.2 V / 314 Ah', '90% depth of discharge', 'Up to 16 units in parallel'], headline: '16 kWh', voltage: '51.2 V',
    table: [['Nominal energy', '16 kWh'], ['Nominal voltage', '51.2 V'], ['Capacity', '314 Ah'], ['Depth of discharge', '90%'], ['Parallel operation', 'Up to 16 units'], ['Warranty', '5+5 years']] },
  { slug: 'home-ess-hv-5-12k', model: 'HOME-ESS-HV-5.12K', name: 'High-voltage lithium battery 5.12 kWh', price: 10500, specs: ['51.2 V / 100 Ah', '95% depth of discharge', 'Up to 12 units in parallel'], headline: '5.12 kWh', voltage: '51.2 V',
    table: [['Nominal energy', '5.12 kWh'], ['Nominal voltage', '51.2 V'], ['Capacity', '100 Ah'], ['Depth of discharge', '95%'], ['Parallel operation', 'Up to 12 units'], ['Warranty', '5+5 years']] },
  { slug: 'home-ess-hv-9-4k', model: 'HOME-ESS-HV-9.4K', name: 'High-voltage lithium battery 9.4 kWh', price: 19500, specs: ['51.2 V / 184 Ah', '95% depth of discharge', 'Up to 12 units in parallel'], headline: '9.4 kWh', voltage: '51.2 V',
    table: [['Nominal energy', '9.4 kWh'], ['Nominal voltage', '51.2 V'], ['Capacity', '184 Ah'], ['Depth of discharge', '95%'], ['Parallel operation', 'Up to 12 units'], ['Warranty', '5+5 years']] },
  { slug: 'hess-hy-s-12k-s', category: 'hybrid-inverters', application: 'residential', phase: 'single', manufacturer: 'Hanchu', model: 'HESS-HY-S-12K-S', name: 'Single-phase hybrid inverter 12 kW', price: 20450, availability: 'stock', datasheet: null,
    specs: ['12 kW rated output', 'Single-phase hybrid', '5 years warranty'], headline: '12 kW', voltage: null, efficiency: null, ip: null, dims: null, weight: null, highlights: [],
    table: [['Rated output power', '12 kW'], ['Phase', 'Single phase'], ['Warranty', '5 years']] },
  { slug: 'cess-hy-50k', category: 'hybrid-inverters', application: 'commercial', phase: 'three', manufacturer: 'Hanchu', model: 'CESS-HY-50K', name: 'Three-phase hybrid inverter 50 kW', price: 65000, availability: 'stock', datasheet: null,
    specs: ['50 kW rated output', 'Up to 4 units in parallel', '5 years warranty'], headline: '50 kW', voltage: '135 to 750 V', efficiency: '98.8%', ip: 'IP65', dims: '800 × 620 × 300 mm', weight: '76 kg', highlights: cessHighlights,
    table: [['Rated output power', '50 kW'], ['Parallel operation', 'Up to 4 units'], ['Warranty', '5 years'], ...cessSeries] },
  { slug: 'hess-of-e-3-5k', model: 'HESS-OF-E-3.5K', name: 'Off-grid inverter, 24 V', price: 2960, specs: ['24 V system', 'PV MPPT voltage range 120 to 450 VDC', '2 years warranty'], headline: null, voltage: '24 V',
    table: [['Battery voltage', '24 V'], ['PV MPPT voltage range', '120 to 450 VDC'], ['Warranty', '2 years']] },
  { slug: 'hess-of-s-5-0k', model: 'HESS-OF-S-5.0K', name: 'Off-grid inverter 5 kW, 48 V', price: 4800, specs: ['5 kW, 48 V system', 'PV: 1 MPPT tracker', '2 years warranty'], headline: '5 kW', voltage: '48 V',
    table: [['Rated power', '5 kW'], ['Battery voltage', '48 V'], ['PV inputs', '1 MPPT tracker'], ['Warranty', '2 years']] },
  { slug: 'hess-of-s-10k', model: 'HESS-OF-S-10K', name: 'Off-grid inverter 10 kW, 48 V', price: 11000, specs: ['10 kW, 48 V system', 'PV: 2 MPPT trackers', '2 years warranty'], headline: '10 kW', voltage: '48 V',
    table: [['Rated power', '10 kW'], ['Battery voltage', '48 V'], ['PV inputs', '2 MPPT trackers'], ['Warranty', '2 years']] },
  { slug: 'cess-215-a', category: 'integrated-storage', application: 'commercial', phase: null, manufacturer: 'Hanchu', model: 'CESS 215-A', name: '100 kW inverter with 215 kWh battery storage system', price: 740000, availability: 'soon', datasheet: null,
    specs: ['100 kW inverter', '215 kWh battery energy storage', 'Available soon'], headline: '215 kWh', voltage: null, efficiency: null, ip: null, dims: null, weight: null, highlights: [],
    table: [['Inverter', '100 kW'], ['Battery storage', '215 kWh'], ['System', 'Battery energy storage system']] },
  { slug: 'hv-9-4k-cabinet', model: 'HV 9.4K cabinet', name: 'Cabinet for the HV 9.4K battery', price: 15000, specs: ['HV 9.4K cabinet'], table: [['Item', 'HV 9.4K cabinet']] },
  { slug: 'hv-5-12k-cabinet', model: 'HV 5.12K cabinet', name: 'Cabinet for the HV 5.12K battery', price: 12000, specs: ['HV 5.12K cabinet'], table: [['Item', 'HV 5.12K cabinet']] },
  { slug: 'combiner-box-12k-4-1', model: 'Combiner Box 12K 4-1', name: 'Combiner box 12K 4-1', price: 4200, specs: ['Combiner box 12K 4-1'], table: [['Item', 'Combiner box 12K 4-1']] },
  { slug: 'wall-mount-bracket-9-4k', model: '9.4K wall mount bracket', name: 'Wall mount bracket for the 9.4 kW battery', price: 420, specs: ['9.4 kW battery wall mount bracket'], table: [['Item', '9.4 kW battery wall mount bracket']] },
  { slug: 'wifi-dongle-e', model: 'WIFI Dongle-E', name: 'WiFi dongle (E)', price: 350, specs: ['WiFi dongle, type E'], table: [['Item', 'WiFi dongle-E']] },
  { slug: 'wifi-dongle-common', model: 'WIFI Dongle-Common', name: 'WiFi dongle (common)', price: 400, specs: ['WiFi dongle, common type'], table: [['Item', 'WiFi dongle-common']] },
  { slug: 'renesolar-585w', model: '585W', name: 'Renesolar 585W mono bifacial solar panel', price: 1365, specs: ['585 W', 'Mono, bifacial', 'Tier 1 brand'], headline: '585 W',
    table: [['Rated power', '585 W'], ['Cell type', 'Mono'], ['Construction', 'Bifacial'], ['Brand tier', 'Tier 1']] },
  { slug: 'renesolar-640w', model: '640W', name: 'Renesolar 640W mono bifacial solar panel', price: 1491, specs: ['640 W', 'Mono, bifacial', 'Tier 1 brand'], headline: '640 W',
    table: [['Rated power', '640 W'], ['Cell type', 'Mono'], ['Construction', 'Bifacial'], ['Brand tier', 'Tier 1']] },
  { slug: 'bess-5015s-h', category: 'integrated-storage', application: 'utility', phase: null, manufacturer: 'Hanchu', model: 'BESS-5015S-H', name: '5 MWh containerised storage', price: null, availability: 'soon', datasheet: null,
    specs: ['5.015 MWh nominal energy', 'LFP 3.2 V / 314 Ah cells', 'IP55, liquid cooled'], headline: '5.015 MWh', voltage: '1331.2 Vdc', efficiency: '≥95%', ip: 'IP55', dims: '6058 × 2438 × 2896 mm', weight: '≤43 t',
    highlights: ['Intelligent liquid cooling thermal management', 'IP55, C5 anti-corrosion and 3-tier fire protection', 'Standard rack design with a small footprint'],
    table: [['Nominal energy', '5.015 MWh'], ['Nominal voltage', '1331.2 Vdc'], ['Configuration', '12 × 1P416S'], ['Cell type', 'LFP 3.2 V / 314 Ah'], ['Charge / discharge rate', '0.25P / 0.5P'], ['Efficiency', '≥95%'], ['Protection level', 'IP55'],
      ['Anti-corrosion level', 'C5'], ['Dimensions (D × W × H)', '6058 × 2438 × 2896 mm'], ['Weight', '≤43 t']] },
].map((p) => {
  // The shorter entries above leave out fields their product family always shares; fill them in here.
  if (p.category) return p;
  const family = p.slug.startsWith('home-ess-') ? battery : p.slug.startsWith('hess-of-') ? offGrid : p.slug.startsWith('renesolar') ? panel : accessory;
  return family(p);
});
