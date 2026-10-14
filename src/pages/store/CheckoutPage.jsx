import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import CartSummary from '../../components/cart/CartSummary';
import TestCheckoutNotice from '../../components/cart/TestCheckoutNotice';
import FormField from '../../components/forms/FormField';
import useForm from '../../hooks/useForm';
import { required, email, phone, postal, checked } from '../../utils/validation';
import { PROVINCES } from '../../utils/constants';
import { siteConfig } from '../../data/siteConfig';
import { useCart } from '../../features/cart/CartContext';
import { lines, totals } from '../../features/cart/cartUtils';
import { createOrder } from '../../services/orderService';
const rules = () => ({ name: [required], email: [required, email], phone: [required, phone], street: [required], suburb: [required], city: [required], province: [required], postal: [required, postal], consent: [checked] });
export default function CheckoutPage() {
  const { items, clear } = useCart();
  const nav = useNavigate();
  const ls = lines(items);
  const t = totals(ls);
  const f = useForm({ name: '', email: '', phone: '', street: '', suburb: '', city: '', province: '', postal: '', notes: '', consent: false }, rules);
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  if (!ls.length) return (<div className="page-head"><div className="container"><h1>Checkout</h1><p>Your cart is empty. <Link to="/products">Browse products</Link></p></div></div>);
  const submit = async (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    setBusy(true); setFail('');
    try {
      const v = f.values;
      const o = await createOrder({
        customer: { name: v.name, email: v.email, phone: v.phone },
        delivery: { street: v.street, suburb: v.suburb, city: v.city, province: v.province, postal: v.postal, notes: v.notes },
        items: ls.map((l) => ({ slug: l.product.slug, model: l.product.model, name: l.product.name, qty: l.qty, unitPrice: l.product.price })),
        totals: { ...t, delivery: 'quoted separately', vat: siteConfig.vat.note }, consent: true,
      });
      clear();
      nav(`/order-confirmation/${o.ref}`);
    } catch (err) { setFail('Something went wrong. Please try again.'); setBusy(false); }
  };
  return (
    <>
      <div className="page-head"><div className="container"><h1>Test checkout</h1><p>Enter synthetic details to see the full order journey.</p></div></div>
      <section className="section" style={{ paddingTop: 40 }}><div className="container cartgrid">
        <form className="form" onSubmit={submit} noValidate>
          <TestCheckoutNotice />
          <fieldset><legend>Contact</legend>
            <FormField id="name" label="Full name" error={f.errors.name}><input {...f.bind('name')} autoComplete="name" /></FormField>
            <div className="row2">
              <FormField id="email" label="Email" error={f.errors.email}><input {...f.bind('email')} type="email" autoComplete="email" /></FormField>
              <FormField id="phone" label="Phone" error={f.errors.phone}><input {...f.bind('phone')} type="tel" autoComplete="tel" /></FormField>
            </div>
          </fieldset>
          <fieldset><legend>Delivery address</legend>
            <FormField id="street" label="Street address" error={f.errors.street}><input {...f.bind('street')} autoComplete="street-address" /></FormField>
            <div className="row2">
              <FormField id="suburb" label="Suburb" error={f.errors.suburb}><input {...f.bind('suburb')} /></FormField>
              <FormField id="city" label="City or town" error={f.errors.city}><input {...f.bind('city')} /></FormField>
            </div>
            <div className="row2">
              <FormField id="province" label="Province" error={f.errors.province}><select {...f.bind('province')}><option value="">Select</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select></FormField>
              <FormField id="postal" label="Postal code" error={f.errors.postal}><input {...f.bind('postal')} inputMode="numeric" maxLength="4" autoComplete="postal-code" /></FormField>
            </div>
            <FormField id="notes" label="Delivery notes" optional><textarea rows="3" {...f.bind('notes')} /></FormField>
          </fieldset>
          <fieldset><legend>Payment</legend><p className="note" style={{ marginTop: 0 }}>Payment is not collected in this demo. No card details are requested or stored.</p></fieldset>
          <div className={`field${f.errors.consent ? ' field--err' : ''}`}>
            <label className="check"><input type="checkbox" {...f.bind('consent')} checked={f.values.consent} /> <span>I agree to {siteConfig.brand.name} contacting me about this order. See the <Link to="/privacy">privacy notice</Link>.</span></label>
            {f.errors.consent && <small className="err" role="alert">{f.errors.consent}</small>}
          </div>
          {fail && <p className="err" role="alert">{fail}</p>}
          <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Placing test order…' : 'Place test order'}</button>
        </form>
        <CartSummary totals={t}><ul className="mini">{ls.map((l) => <li key={l.product.slug}>{l.qty} × {l.product.model}</li>)}</ul><Button to="/cart" variant="line">Edit cart</Button></CartSummary>
      </div></section>
    </>
  );
}
