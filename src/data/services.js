// Text is exactly as published on solarfarmingsystems.co.za ("What We Do"). Button links go to this site's own forms.
// keywords help match photos in public/banners by file name; set image: '/images/banners/your-file.jpg' to pin one.
export const servicesIntro = {
  label: 'What We Do',
  title: 'Complete Solar Solutions For Every Application',
  text: 'From a single farm dwelling to a 100 kW agri-commercial array — SFSC designs, supplies, installs and maintains grid-tied, off-grid and hybrid solar systems across South Africa.',
};
export const services = [
  { id: 'agricultural', icon: '🌾', title: 'Agricultural & Farm Solar', cta: 'Get farm quote →', to: '/project-enquiry?type=agricultural', keywords: ['agri', 'farm', 'irrigation', 'pump', 'grain', 'cold'],
    text: 'Ground-mounted and rooftop systems purpose-built for irrigation pumps, cold storage, grain elevators and farm infrastructure. Designed to maximise Section 12B tax depreciation.' },
  { id: 'commercial', icon: '🏭', title: 'Commercial & Industrial', cta: 'Get commercial quote →', to: '/project-enquiry?type=commercial-industrial', keywords: ['commercial', 'industrial', 'factory', 'business', 'warehouse'],
    text: 'Grid-tied and hybrid systems for businesses, factories and commercial properties. SSEG compliant, NRS 097-2-3 certified, with bi-directional metering and municipally approved designs.' },
  { id: 'off-grid', icon: '🔋', title: 'Off-Grid & Hybrid Systems', cta: 'Get off-grid quote →', to: '/design-my-system', keywords: ['off-grid', 'offgrid', 'off_grid', 'hybrid', 'battery', 'lodge', 'storage'],
    text: 'Battery storage solutions using Freedom Won, Solis and leading inverter brands. Complete energy independence for remote farms, game lodges and rural communities.' },
  { id: 'water-heating', icon: '🌡️', title: 'Solar Water Heating', cta: 'Get SWH quote →', to: '/contact', keywords: ['water', 'heat', 'swh', 'geyser', 'tube'],
    text: 'Evacuated tube and flat-plate solar water heaters for residential, lodge and commercial use. Reduce geyser electricity costs by up to 80%. SABS approved systems.' },
  { id: 'upgrades', icon: '⚡', title: 'Inverter & Battery Upgrades', cta: 'Get upgrade quote →', to: '/request-quote', keywords: ['inverter', 'upgrade', 'deye', 'solis', 'sunsynk'],
    text: 'Upgrade existing systems with new Solis, Deye or Sunsynk inverters and Freedom Won lithium battery storage. Extend backup time and improve system performance.' },
  { id: 'maintenance', icon: '🔧', title: 'Maintenance & Monitoring', cta: 'Book service →', to: '/contact', keywords: ['maint', 'monitor', 'service', 'clean', 'audit'],
    text: 'Annual service contracts, panel cleaning, system audits and remote monitoring via SolarmanPV. Keep your system performing at peak efficiency year after year.' },
];
