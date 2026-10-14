import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import PreliminaryNotice from '../../components/system/PreliminaryNotice';
import EstimateSummaryCard from '../../components/system/EstimateSummaryCard';
import { getSystemEnquiry } from '../../services/solarService';
import { recommend } from '../../features/system/recommend';
import { getProduct } from '../../features/products/productUtils';
export default function SystemSummaryPage() {
  const { ref } = useParams();
  const [e, setE] = useState(undefined);
  useEffect(() => { getSystemEnquiry(ref).then(setE).catch(() => setE(null)); }, [ref]);
  if (e === undefined) return <div className="page-head"><div className="container"><h1>Loading…</h1></div></div>;
  if (!e) return (<div className="page-head"><div className="container"><h1>Enquiry not found</h1><p><Link to="/design-my-system">Start a new enquiry</Link></p></div></div>);
  const r = recommend(e);
  return (
    <section className="section"><div className="container confirm" style={{ maxWidth: 820 }}>
      <PreliminaryNotice />
      <h1>Your preliminary summary</h1>
      <p className="lead">Thank you, {e.contact.name.split(' ')[0]}. Here is what we recorded and where we suggest starting.</p>
      <div className="ref"><span>Enquiry reference</span><strong>{e.ref}</strong></div>
      <h2 style={{ fontSize: '1.4rem', marginTop: 8 }}>Suggested starting equipment</h2>
      {r.eq.length ? <div className="grid">{r.eq.map(([slug, note]) => { const p = getProduct(slug); return (
        <Link key={slug} to={`/products/${slug}`} className="proj" style={{ padding: 20 }}><span className="pcard__mfr">{p.manufacturer} · {p.model}</span><h3>{p.name}</h3><p style={{ color: 'var(--slate)', margin: 0 }}>{note}</p><span className="path__go" style={{ marginTop: 10 }}>View specifications</span></Link>); })}</div>
        : <p>No catalogue product matches yet.</p>}
      {r.notes.map((n) => <p className="note" key={n}>{n}</p>)}
      <h2 style={{ fontSize: '1.4rem', marginTop: 8 }}>Recommended next step</h2>
      <div className="enq__card" style={{ background: 'var(--brand-soft)', borderColor: 'transparent', color: 'var(--ink)' }}><p style={{ color: 'var(--ink-2)' }}>{r.next.text}</p><Button to={r.next.to}>{r.next.label}</Button></div>
      <h2 style={{ fontSize: '1.4rem', marginTop: 8 }}>What you told us</h2>
      <EstimateSummaryCard e={e} />
      <p className="note">Final sizing, equipment and pricing are set by an engineer after reviewing your bills, loads and site. Nothing here is a quotation or a guarantee.</p>
      <p><Button to="/products" variant="line">Browse the full range</Button></p>
    </div></section>
  );
}
