import { Fragment } from 'react';
import { lab } from '../../features/system/systemOptions';
export default function EstimateSummaryCard({ e }) {
  const c = e.consumption || {};
  const use = [c.bill && `R${c.bill} per month`, c.kwh && `${c.kwh} kWh per month`].filter(Boolean).join(' · ') || '—';
  const loads = [...(e.loads || []), e.otherLoads].filter(Boolean).join(', ') || '—';
  const rows = [['Customer type', lab('customerType', e.customerType)], ['Site', `${e.location.place}, ${e.location.province}`], ['Electricity use', use], ['Supply', lab('supply', e.supply)],
    ['Main loads', loads], ['Operating hours', lab('hours', e.hours)], ['Backup', e.backup === 'none' ? lab('backup', 'none') : `${lab('backup', e.backup)}, ${lab('backupHours', e.backupHours)}`],
    ['Solar panels', lab('pv', e.pv)], ['Batteries', lab('battery', e.battery)], ['Grid preference', lab('gridPref', e.gridPref)]];
  return (<dl className="dl dl--left sumcard">{rows.map(([k, v]) => (<Fragment key={k}><dt>{k}</dt><dd>{v}</dd></Fragment>))}</dl>);
}
