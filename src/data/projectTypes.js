export const projectTypes = [
  { slug: 'agricultural', name: 'Agricultural energy', path: '/agricultural-solar', blurb: 'Solar and storage for irrigation, cold storage, packhouses and farm infrastructure.',
    intro: 'Farms often run their heaviest loads in daylight, which suits solar. SFSC assesses your pumps, cooling and processing loads before recommending a system.',
    points: ['Irrigation, borehole and pump loads', 'Cold rooms and packhouses', 'Roof or ground-mount options', 'Backup for critical farm operations', 'Grid connection and compliance support'] },
  { slug: 'commercial-industrial', name: 'Commercial and industrial PV', path: '/commercial-industrial', blurb: 'Rooftop and ground-mount solar for businesses, factories and warehouses.',
    intro: 'Businesses can cut grid dependence and manage demand with solar and hybrid systems sized to their load profile.',
    points: ['Load profile and tariff review', 'Roof structural and layout assessment', 'Hybrid inverters with optional storage', 'Phased rollout for larger sites', 'Grid connection and compliance support'] },
  { slug: 'battery-storage', name: 'Battery energy storage (BESS)', path: '/battery-storage', blurb: 'Stand-alone or solar-coupled battery storage for backup and load management.',
    intro: 'Storage can provide backup power, shift consumption and support larger solar plants. Hanchu lists containerised systems up to 5 MWh per container.',
    points: ['Backup and resilience', 'Load shifting and peak management', 'Solar-coupled or stand-alone storage', 'Containerised systems for larger sites', 'Site, grid and safety assessment'] },
  { slug: 'utility-scale', name: 'Utility-scale solar', path: '/utility-scale-solar', blurb: 'Large ground-mount generation and storage projects, assessed case by case.',
    intro: 'Large projects start with land, grid access and feasibility. Submit what you know and SFSC will qualify the opportunity.',
    points: ['Land and grid access review', 'Feasibility and yield assessment', 'Storage integration', 'Development timeline and phasing', 'Delivery commitments agreed separately'] },
];
export const CAPACITY = [['u100kw', 'Under 100 kW'], ['100kw-1mw', '100 kW to 1 MW'], ['1-10mw', '1 to 10 MW'], ['10mw+', 'More than 10 MW'], ['unsure', 'Not sure yet']];
export const SITE_STATUS = [['roof', 'Roof available'], ['ground', 'Ground-mount land available'], ['both', 'Roof and land available'], ['not-secured', 'Not yet secured']];
export const GRID_STATUS = [['connected', 'Connected, capacity known'], ['connected-unknown', 'Connected, capacity unknown'], ['applying', 'Connection application in progress'], ['none', 'No grid connection'], ['unsure', 'Not sure']];
export const TIMELINE = [['3m', 'Within 3 months'], ['6m', '3 to 6 months'], ['12m', '6 to 12 months'], ['12m+', 'More than 12 months'], ['exploring', 'Just exploring']];
export const projectLabel = (list, v) => list.find((o) => o[0] === v)?.[1] || v || '—';
