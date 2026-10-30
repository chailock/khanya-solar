// Preliminary pathway only. Suggestions use products in the catalogue and are not a design or bill of materials.
export function recommend(e) {
  const eq = [];
  const notes = [];
  const three = e.supply === 'three';
  const wantsBattery = e.battery !== 'no' || e.backup !== 'none';
  if (e.gridPref === 'offgrid' && e.customerType !== 'commercial') eq.push(['hess-of-e-3-5k', 'Compact 24 V off-grid inverter for smaller sites. Larger loads need engineering.']);
  else if (e.customerType === 'commercial' || (e.customerType === 'agricultural' && three)) {
    eq.push(['cess-hy-30k', 'Three-phase hybrid inverter, 30 kW. A 50 kW model is also available.']);
    notes.push('Systems of this size pair the inverter with a high-voltage battery. An engineer will confirm the right battery for your site.');
  } else if (three) notes.push('Hanchu also lists three-phase hybrid inverters. An engineer will confirm the right model for your supply.');
  else eq.push(['hess-hy-s-6k-s', 'Single-phase hybrid inverter with 6 kW rated output.']);
  if (wantsBattery && eq.some((x) => x[0] === 'hess-hy-s-6k-s')) eq.push(['home-ess-lv-5-12k', '5.12 kWh wall-mount lithium battery. Units can be installed in parallel for more capacity.']);
  const large = e.customerType !== 'residential';
  const next = large
    ? { label: 'Request an SFSC engineering consultation', to: `/project-enquiry?from=${e.ref}&type=${e.customerType === 'agricultural' ? 'agricultural' : 'commercial-industrial'}`, text: 'Farms and businesses are assessed by SFSC engineers before any system is specified.' }
    : { label: 'Request a quotation', to: `/request-quote${eq[0] ? `?product=${eq[0][0]}` : ''}`, text: 'Ask for pricing on the suggested equipment. An engineer validates the design before installation.' };
  return { eq, notes, next };
}
