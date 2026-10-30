import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import TestCheckoutNotice from '../../components/cart/TestCheckoutNotice';
import { getOrder } from '../../services/orderService';
import { subtotalLabel } from '../../features/cart/cartUtils';
export default function OrderConfirmationPage() {
  const { id } = useParams();
  const [o, setO] = useState(undefined);
  useEffect(() => { getOrder(id).then(setO).catch(() => setO(null)); }, [id]);
  if (o === undefined) return <div className="page-head"><div className="container"><h1>Loading…</h1></div></div>;
  if (!o) return (<div className="page-head"><div className="container"><h1>Order not found</h1><p><Link to="/products">Back to products</Link></p></div></div>);
  return (
    <section className="section"><div className="container confirm">
      <TestCheckoutNotice />
      <h1>Thank you, {o.customer.name.split(' ')[0]}</h1>
      <p className="lead">Your order has been received. Our team will contact you to confirm it.</p>
      <div className="ref"><span>Order reference</span><strong>{o.ref}</strong></div>
      <dl className="dl"><dt>Status</dt><dd>Received</dd><dt>Placed</dt><dd>{new Date(o.createdAt).toLocaleString('en-ZA')}</dd>
        <dt>Subtotal</dt><dd>{subtotalLabel(o.totals)}</dd><dt>Delivery</dt><dd>Quoted separately</dd>
        <dt>Deliver to</dt><dd>{o.delivery.street}, {o.delivery.suburb}, {o.delivery.city}, {o.delivery.province} {o.delivery.postal}</dd></dl>
      <h3>Items</h3><ul className="mini">{o.items.map((i) => <li key={i.slug}>{i.qty} × {i.name} ({i.model})</li>)}</ul>
      <p className="note">No payment was taken. Pricing, VAT, stock and delivery are confirmed with you before your order goes ahead.</p>
      <p><Button to="/products">Continue shopping</Button></p>
    </div></section>
  );
}
