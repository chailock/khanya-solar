export const OPTIONS = {
  customerType: [['residential', 'Residential', 'Home or small property'], ['agricultural', 'Agricultural', 'Farm, irrigation, packhouse or cold storage'], ['commercial', 'Commercial or industrial', 'Business, factory, retail or warehouse']],
  supply: [['single', 'Single-phase'], ['three', 'Three-phase'], ['unsure', 'Not sure', 'Check your distribution board or ask your electrician']],
  hours: [['day', 'Mostly daytime'], ['evening', 'Mostly evenings and nights'], ['always', 'Around the clock']],
  backup: [['none', 'No backup needed'], ['essential', 'Essential loads only', 'Lights, fridge, internet and similar'], ['whole', 'Whole site']],
  backupHours: [['2', 'Up to 2 hours'], ['4', 'Up to 4 hours'], ['8', '4 to 8 hours'], ['12', 'More than 8 hours']],
  pv: [['yes', 'Yes, add solar panels'], ['no', 'No, I already have panels'], ['unsure', 'Not sure']],
  battery: [['yes', 'Yes, add batteries'], ['no', 'No batteries'], ['unsure', 'Not sure']],
  gridPref: [['hybrid', 'Stay on the grid with backup'], ['selfuse', 'Use as little grid power as possible'], ['offgrid', 'Fully off-grid'], ['unsure', 'Not sure']],
};
export const LOADS = ['Lights, TV and computers', 'Fridge and freezer', 'Geyser or water heating', 'Air conditioning', 'Pool pump', 'Borehole or irrigation pump', 'Cold room or refrigeration', 'Workshop machinery', 'Servers or tills'];
export const lab = (g, v) => OPTIONS[g]?.find((o) => o[0] === v)?.[1] || v || '—';
