import { Link } from 'react-router-dom';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import { SECTIONS } from '../../features/admin/collections';
import { db } from '../../mocks/db';
import { demoProducts } from '../../data/demoProducts';
export default function DashboardPage() {
  const entries = Object.entries(SECTIONS);
  const recent = entries.flatMap(([k, s]) => db.list(s.db).map((r) => ({ ...r, k, s }))).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);
  const total = entries.reduce((n, [, s]) => n + db.list(s.db).length, 0);
  return (
    <>
      <h1>Dashboard</h1>
      <div className="stat-grid">
        {entries.map(([k, s]) => <StatCard key={k} to={`/admin/${k}`} label={s.title} value={db.list(s.db).filter((r) => r.status === s.statuses[0]).length} hint={`new of ${db.list(s.db).length} total`} />)}
        <StatCard to="/admin/products" label="Products" value={demoProducts.length} hint="in the catalogue" />
      </div>
      <h2 style={{ fontSize: '1.3rem', marginTop: 32 }}>Latest activity</h2>
      {total === 0 ? (<div className="empty"><h3>No records yet</h3><p>Submit a form on the storefront, or load sample data to explore the admin.</p><Link className="btn btn--primary btn--sm" to="/admin/settings">Open settings</Link></div>) : (
        <div className="tablewrap"><table className="dtable"><thead><tr><th>Type</th><th>Reference</th><th>From</th><th>Received</th><th>Status</th></tr></thead>
          <tbody>{recent.map((r) => (<tr key={r.ref}><td>{r.s.title}</td><td><Link to={`/admin/${r.k}/${r.ref}`}>{r.ref}</Link></td><td>{r.s.who(r)}</td><td>{new Date(r.createdAt).toLocaleString('en-ZA')}</td><td><StatusBadge status={r.status} /></td></tr>))}</tbody></table></div>)}
    </>
  );
}
