import { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import StatusBadge from '../../components/admin/StatusBadge';
import StatusHistory from '../../components/admin/StatusHistory';
import { SECTIONS, statusLabel } from '../../features/admin/collections';
import { db } from '../../mocks/db';
export default function RecordDetailPage() {
  const { section, ref } = useParams();
  const s = SECTIONS[section];
  const [rec, setRec] = useState(() => (s ? db.find(s.db, ref) : null));
  const [next, setNext] = useState(rec?.status || '');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);
  if (!s || !rec) return <><h1>Record not found</h1><p><Link to={s ? `/admin/${section}` : '/admin'}>Back</Link></p></>;
  const update = (e) => {
    e.preventDefault();
    const r = db.setStatus(s.db, ref, next, note.trim());
    setRec({ ...r }); setNote(''); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };
  return (
    <>
      <p className="crumbs"><Link to={`/admin/${section}`}>{s.title}</Link> / {rec.ref}</p>
      <div className="adm__head"><h1>{rec.ref}</h1><StatusBadge status={rec.status} /></div>
      <div className="detailgrid">
        <div className="panel"><h2>Details</h2>
          <dl className="dl dl--left">{s.fields.map(([k, fn]) => (<Fragment key={k}><dt>{k}</dt><dd style={{ whiteSpace: 'pre-line' }}>{fn(rec)}</dd></Fragment>))}</dl>
          <p className="note">Received {new Date(rec.createdAt).toLocaleString('en-ZA')} · Last updated {new Date(rec.updatedAt).toLocaleString('en-ZA')}</p></div>
        <div style={{ display: 'grid', gap: 20, alignContent: 'start' }}>
          <form className="panel" onSubmit={update}><h2>Update status</h2>
            <div className="field"><label htmlFor="st">Status</label><select id="st" value={next} onChange={(e) => setNext(e.target.value)}>{s.statuses.map((x) => <option key={x} value={x}>{statusLabel(x)}</option>)}</select></div>
            <div className="field" style={{ marginTop: 12 }}><label htmlFor="nt">Note <span>(optional)</span></label><textarea id="nt" rows="3" value={note} onChange={(e) => setNote(e.target.value)} /></div>
            <p style={{ marginBottom: 0 }}><button className="btn btn--primary btn--sm" type="submit" disabled={next === rec.status && !note.trim()}>Save update</button>{saved && <span className="saved" role="status"> Saved</span>}</p></form>
          <div className="panel"><h2>Status history</h2><StatusHistory history={rec.history} /></div>
        </div>
      </div>
    </>
  );
}
