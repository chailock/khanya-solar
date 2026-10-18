import { Fragment } from 'react';
import CsvExportButton from '../../components/admin/CsvExportButton';
import { SECTIONS, csvColumns, statusLabel } from '../../features/admin/collections';
import { db } from '../../mocks/db';
import { demoProducts, availabilityLabels } from '../../data/demoProducts';
export default function ReportsPage() {
  const entries = Object.entries(SECTIONS);
  const days = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 864e5); return d.toISOString().slice(0, 10); });
  const perDay = days.map((d) => entries.reduce((n, [, s]) => n + db.list(s.db).filter((r) => r.createdAt.slice(0, 10) === d).length, 0));
  const max = Math.max(1, ...perDay);
  const top = {};
  [...db.list('orders'), ...db.list('quotes')].forEach((r) => (r.items || []).forEach((i) => { top[i.model] = (top[i.model] || 0) + i.qty; }));
  const topList = Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const stock = Object.keys(availabilityLabels).map((k) => [availabilityLabels[k], demoProducts.filter((p) => p.availability === k).length]);
  return (
    <>
      <h1>Reports</h1>
      <div className="panel"><h2>Submissions, last 14 days</h2>
        <div className="bars" role="img" aria-label="Submissions per day">{perDay.map((n, i) => (<div key={days[i]} className="bars__col"><span style={{ height: `${(n / max) * 100}%` }} title={`${n} on ${days[i]}`} /><small>{days[i].slice(8)}</small></div>))}</div></div>
      <div className="panel" style={{ marginTop: 20 }}><h2>Status by record type</h2>
        <div className="tablewrap"><table className="dtable"><thead><tr><th>Type</th><th>Total</th><th>By status</th><th /></tr></thead>
          <tbody>{entries.map(([k, s]) => { const rows = db.list(s.db); return (<tr key={k}><td>{s.title}</td><td>{rows.length}</td>
            <td>{s.statuses.map((x, i) => <Fragment key={x}>{i > 0 && ' · '}{statusLabel(x)}: {rows.filter((r) => r.status === x).length}</Fragment>)}</td>
            <td><CsvExportButton filename={`${k}-${new Date().toISOString().slice(0, 10)}.csv`} rows={rows} columns={csvColumns(s)} label="Export CSV" /></td></tr>); })}</tbody></table></div></div>
      <div className="detailgrid" style={{ marginTop: 20 }}>
        <div className="panel"><h2>Most requested products</h2>{topList.length ? <ol className="mini">{topList.map(([m, n]) => <li key={m}>{m}: {n} unit(s)</li>)}</ol> : <p className="note">Appears once orders or quotations include products.</p>}</div>
        <div className="panel"><h2>Catalogue availability</h2><ul className="mini">{stock.map(([l, n]) => <li key={l}>{l}: {n}</li>)}</ul></div>
      </div>
    </>
  );
}
