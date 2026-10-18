import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DataTable from '../../components/admin/DataTable';
import StatusBadge from '../../components/admin/StatusBadge';
import CsvExportButton from '../../components/admin/CsvExportButton';
import { SECTIONS, csvColumns, statusLabel } from '../../features/admin/collections';
import { db } from '../../mocks/db';
export default function RecordsPage() {
  const { section } = useParams();
  const s = SECTIONS[section];
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const all = s ? db.list(s.db) : [];
  const rows = useMemo(() => all.filter((r) => (!status || r.status === status) && (!q.trim() || `${r.ref} ${s.who(r)} ${r.contact?.email || r.customer?.email || ''}`.toLowerCase().includes(q.trim().toLowerCase()))), [all, q, status, s]);
  if (!s) return <><h1>Not found</h1><p><Link to="/admin">Back to dashboard</Link></p></>;
  const cols = [
    { label: 'Reference', render: (r) => <Link to={`/admin/${section}/${r.ref}`}><strong>{r.ref}</strong></Link> },
    { label: 'Received', render: (r) => new Date(r.createdAt).toLocaleString('en-ZA') },
    { label: 'From', render: s.who }, { label: 'Summary', render: s.summary },
    { label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];
  return (
    <>
      <div className="adm__head"><h1>{s.title}</h1><CsvExportButton filename={`${section}-${new Date().toISOString().slice(0, 10)}.csv`} rows={rows} columns={csvColumns(s)} label={`Export ${rows.length} to CSV`} /></div>
      <div className="toolbar" style={{ marginBottom: 16 }}>
        <input type="search" placeholder="Search reference, name or email" aria-label="Search" value={q} onChange={(e) => setQ(e.target.value)} />
        <select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option>{s.statuses.map((x) => <option key={x} value={x}>{statusLabel(x)}</option>)}</select>
      </div>
      <DataTable columns={cols} rows={rows} empty={all.length ? 'No records match your filters.' : 'No records yet. They appear here when customers submit forms on the storefront.'} />
    </>
  );
}
