import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FormField from './FormField';
import useForm from '../../hooks/useForm';
import { required, email, phone, checked } from '../../utils/validation';
import { PROVINCES, CUSTOMER_TYPES } from '../../utils/constants';
import { demoProducts } from '../../data/demoProducts';
import { siteConfig } from '../../data/siteConfig';
import { createQuote } from '../../services/quoteService';
import { useCart } from '../../features/cart/CartContext';
export default function QuoteForm({ mode = 'quote' }) {
  const bulk = mode === 'bulk';
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { items: cartItems } = useCart();
  const [sel, setSel] = useState(() => {
    const s = {};
    if (params.get('from') === 'cart') cartItems.forEach((i) => { s[i.slug] = i.qty; });
    const one = params.get('product');
    if (one && demoProducts.some((p) => p.slug === one)) s[one] = 1;
    return s;
  });
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const needsCompany = (t) => ['business', 'farm', 'installer', 'reseller'].includes(t);
  const f = useForm({ customerType: bulk ? 'installer' : 'homeowner', name: '', company: '', email: '', phone: '', province: '', place: '', deliveryNotes: '', message: '', consent: false },
    (v) => ({ name: [required], email: [required, email], phone: [required, phone], province: [required], place: [required], consent: [checked], ...(needsCompany(v.customerType) ? { company: [required] } : {}) }));
  const chosen = Object.keys(sel);
  const toggle = (slug) => setSel((s) => { const n = { ...s }; if (n[slug]) delete n[slug]; else n[slug] = 1; return n; });
  const submit = async (e) => {
    e.preventDefault();
    const noItems = bulk ? !chosen.length && !f.values.message.trim() : !chosen.length;
    if (!f.validate(noItems ? { items: bulk ? 'Choose at least one product or describe your needs below' : 'Choose at least one product' } : {})) return;
    setBusy(true); setFail('');
    try {
      const v = f.values;
      const q = await createQuote({
        type: mode, customerType: v.customerType, contact: { name: v.name, company: v.company, email: v.email, phone: v.phone },
        location: { province: v.province, place: v.place }, deliveryNotes: v.deliveryNotes, message: v.message, consent: true,
        items: chosen.map((slug) => { const p = demoProducts.find((x) => x.slug === slug); return { slug, model: p.model, name: p.name, qty: sel[slug] }; }),
      });
      nav(`/quote-confirmation/${q.ref}`);
    } catch (err) { setFail('Something went wrong. Please try again.'); setBusy(false); }
  };
  const types = bulk ? ['installer', 'reseller', 'business', 'farm'] : ['homeowner', 'business', 'farm', 'installer'];
  return (
    <form className="form" onSubmit={submit} noValidate>
      <fieldset><legend>Products</legend>
        <div className={`picker${f.errors.items ? ' field--err' : ''}`}>
          {demoProducts.map((p) => (
            <div key={p.slug} className={`picker__row${sel[p.slug] ? ' on' : ''}`}>
              <label><input type="checkbox" checked={!!sel[p.slug]} onChange={() => toggle(p.slug)} /> <span><strong>{p.name}</strong><small>{p.model}</small></span></label>
              {sel[p.slug] && <input type="number" min="1" max="9999" aria-label={`Quantity for ${p.model}`} value={sel[p.slug]} onChange={(e) => setSel((s) => ({ ...s, [p.slug]: Math.max(1, Number(e.target.value) || 1) }))} />}
            </div>))}
        </div>
        {f.errors.items && <small className="err" role="alert">{f.errors.items}</small>}
      </fieldset>
      <fieldset><legend>Your details</legend>
        <div className="row2">
          <FormField id="customerType" label="I am a"><select {...f.bind('customerType')}>{types.map((t) => <option key={t} value={t}>{CUSTOMER_TYPES[t]}</option>)}</select></FormField>
          <FormField id="company" label="Company" error={f.errors.company} optional={!needsCompany(f.values.customerType)}><input {...f.bind('company')} autoComplete="organization" /></FormField>
        </div>
        <div className="row2">
          <FormField id="name" label="Full name" error={f.errors.name}><input {...f.bind('name')} autoComplete="name" /></FormField>
          <FormField id="phone" label="Phone" error={f.errors.phone}><input {...f.bind('phone')} type="tel" autoComplete="tel" /></FormField>
        </div>
        <FormField id="email" label="Email" error={f.errors.email}><input {...f.bind('email')} type="email" autoComplete="email" /></FormField>
      </fieldset>
      <fieldset><legend>Delivery location</legend>
        <div className="row2">
          <FormField id="place" label="Town or suburb" error={f.errors.place}><input {...f.bind('place')} /></FormField>
          <FormField id="province" label="Province" error={f.errors.province}><select {...f.bind('province')}><option value="">Select</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select></FormField>
        </div>
        <FormField id="deliveryNotes" label="Delivery requirements" optional hint="For example: site access, offloading equipment, preferred timing."><textarea rows="3" {...f.bind('deliveryNotes')} /></FormField>
        <FormField id="message" label={bulk ? 'Estimated quantities and ordering frequency' : 'Anything else we should know'} optional={!bulk || chosen.length > 0}><textarea rows="3" {...f.bind('message')} /></FormField>
      </fieldset>
      <div className={`field${f.errors.consent ? ' field--err' : ''}`}>
        <label className="check"><input type="checkbox" {...f.bind('consent')} checked={f.values.consent} /> <span>I agree to {siteConfig.brand.name} contacting me about this request. See the <Link to="/privacy">privacy notice</Link>.</span></label>
        {f.errors.consent && <small className="err" role="alert">{f.errors.consent}</small>}
      </div>
      <p className="note">Quotations are provisional. Pricing, VAT, stock and delivery are confirmed in writing before any order.</p>
      {fail && <p className="err" role="alert">{fail}</p>}
      <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Sending…' : bulk ? 'Send bulk enquiry' : 'Request quotation'}</button>
    </form>
  );
}
