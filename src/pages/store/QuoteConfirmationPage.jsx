import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { CUSTOMER_TYPES } from '../../utils/constants';
import { getQuote } from '../../services/quoteService';
import { PROPERTY_TYPES, optLabel } from '../../features/quote/quoteOptions';
export default function QuoteConfirmationPage() {
  const { ref } = useParams();
  const [q, setQ] = useState(undefined);
  useEffect(() => { getQuote(ref).then(setQ).catch(() => setQ(null)); }, [ref]);
  if (q === undefined) return <div className="page-head"><div className="container"><h1>Loading…</h1></div></div>;
  if (!q) return (<div className="page-head"><div className="container"><h1>Request not found</h1><p><Link to="/products">Back to products</Link></p></div></div>);
  return (
    <section className="section"><div className="container confirm">
      <h1>{q.type === 'bulk' ? 'Bulk enquiry received' : 'Quotation request received'}</h1>
      <p className="lead">Thank you, {q.contact.name.split(' ')[0]}. Keep this reference for any follow-up.</p>
      <div className="ref"><span>Reference number</span><strong>{q.ref}</strong></div>
      <dl className="dl"><dt>Status</dt><dd>New</dd><dt>Submitted</dt><dd>{new Date(q.createdAt).toLocaleString('en-ZA')}</dd>
        <dt>Customer</dt><dd>{q.propertyType ? optLabel(PROPERTY_TYPES, q.propertyType) : CUSTOMER_TYPES[q.customerType]}{q.contact.company ? `, ${q.contact.company}` : ''}</dd>
        <dt>Contact</dt><dd>{q.contact.email}, {q.contact.phone}</dd><dt>Location</dt><dd>{[q.location.place, q.location.province].filter(Boolean).join(', ')}</dd></dl>
      {q.items.length > 0 && (<><h3>Requested products</h3><ul className="mini">{q.items.map((i) => <li key={i.slug}>{i.qty} × {i.name} ({i.model})</li>)}</ul></>)}
      <p className="note">This is a provisional request, not an order. Pricing, VAT, stock and delivery are confirmed in writing.</p>
      <p><Button to="/products">Continue shopping</Button></p>
    </div></section>
  );
}
