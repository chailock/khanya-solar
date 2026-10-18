import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FormField from './FormField';
import useForm from '../../hooks/useForm';
import { required, email, phone, checked } from '../../utils/validation';
import { ROOF_TYPES, PROPERTY_TYPES, QUOTE_PROVINCES, CUSTOMER_TYPE_FOR } from '../../features/quote/quoteOptions';
import { demoProducts } from '../../data/demoProducts';
import { createQuote } from '../../services/quoteService';
import { useCart } from '../../features/cart/CartContext';
import { siteConfig } from '../../data/siteConfig';
const positive = (v) => (Number(v) > 0 ? '' : 'Enter your average monthly bill in rand');
const Select = ({ f, id, label, children, optional }) => (<FormField id={id} label={label} error={f.errors[id]} optional={optional}><select {...f.bind(id)}><option value="">— Select —</option>{children}</select></FormField>);
export default function QuoteRequestForm() {
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
  const [hp, setHp] = useState('');
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const f = useForm({ firstName: '', surname: '', company: '', email: '', phone: '', address: '', place: '', roofType: '', propertyType: '', monthlyBill: '', province: '', notes: '', consent: false },
    () => ({ firstName: [required], surname: [required], email: [required, email], phone: [required, phone], propertyType: [required], monthlyBill: [required, positive], province: [required], consent: [checked] }));
  const chosen = Object.keys(sel);
  const toggle = (slug) => setSel((s) => { const n = { ...s }; if (n[slug]) delete n[slug]; else n[slug] = 1; return n; });
  const submit = async (e) => {
    e.preventDefault();
    if (hp) return; // honeypot: real visitors never see or fill this field
    if (!f.validate()) return;
    setBusy(true); setFail('');
    try {
      const v = f.values;
      const q = await createQuote({
        type: 'quote', propertyType: v.propertyType, customerType: CUSTOMER_TYPE_FOR[v.propertyType], roofType: v.roofType, monthlyBill: v.monthlyBill,
        contact: { name: `${v.firstName.trim()} ${v.surname.trim()}`, firstName: v.firstName.trim(), surname: v.surname.trim(), company: v.company.trim(), email: v.email, phone: v.phone },
        location: { address: v.address.trim(), place: v.place.trim(), province: v.province }, deliveryNotes: '', message: v.notes, consent: true,
        items: chosen.map((slug) => { const p = demoProducts.find((x) => x.slug === slug); return { slug, model: p.model, name: p.name, qty: sel[slug] }; }),
      });
      nav(`/quote-confirmation/${q.ref}`);
    } catch (err) { setFail('Something went wrong. Please try again.'); setBusy(false); }
  };
  const c = siteConfig.contact;
  return (
    <form className="qform" onSubmit={submit} noValidate>
      <div className="hp" aria-hidden="true"><label>Don't fill this out:<input name="website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label></div>
      <div className="row2">
        <FormField id="firstName" label="First Name *" error={f.errors.firstName}><input {...f.bind('firstName')} autoComplete="given-name" /></FormField>
        <FormField id="surname" label="Surname *" error={f.errors.surname}><input {...f.bind('surname')} autoComplete="family-name" /></FormField>
      </div>
      <FormField id="company" label="Company / Farm Name (if applicable)"><input {...f.bind('company')} autoComplete="organization" /></FormField>
      <div className="row2">
        <FormField id="email" label="Email Address *" error={f.errors.email}><input {...f.bind('email')} type="email" autoComplete="email" /></FormField>
        <FormField id="phone" label="Phone / WhatsApp *" error={f.errors.phone}><input {...f.bind('phone')} type="tel" autoComplete="tel" /></FormField>
      </div>
      <FormField id="address" label="Installation Address"><input {...f.bind('address')} autoComplete="street-address" /></FormField>
      <FormField id="place" label="Suburb / City"><input {...f.bind('place')} autoComplete="address-level2" /></FormField>
      <div className="row2">
        <Select f={f} id="roofType" label="Roof Type & Orientation">{ROOF_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</Select>
        <Select f={f} id="propertyType" label="Property / Application Type *">{PROPERTY_TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</Select>
      </div>
      <div className="row2">
        <FormField id="monthlyBill" label="Monthly Electricity Bill (R) *" error={f.errors.monthlyBill}><input {...f.bind('monthlyBill')} type="number" min="0" inputMode="decimal" /></FormField>
        <Select f={f} id="province" label="Province *">{QUOTE_PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}</Select>
      </div>
      <details className="qprod" open={chosen.length > 0}>
        <summary>Hanchu products you are interested in <span>(optional)</span></summary>
        <div className="picker">{demoProducts.map((p) => (
          <div key={p.slug} className={`picker__row${sel[p.slug] ? ' on' : ''}`}>
            <label><input type="checkbox" checked={!!sel[p.slug]} onChange={() => toggle(p.slug)} /> <span><strong>{p.name}</strong><small>{p.model}</small></span></label>
            {sel[p.slug] && <input type="number" min="1" max="9999" aria-label={`Quantity for ${p.model}`} value={sel[p.slug]} onChange={(e) => setSel((s) => ({ ...s, [p.slug]: Math.max(1, Number(e.target.value) || 1) }))} />}
          </div>))}</div>
      </details>
      <FormField id="notes" label="Additional Notes"><textarea rows="4" {...f.bind('notes')} /></FormField>
      <div className={`field${f.errors.consent ? ' field--err' : ''}`}>
        <label className="check"><input type="checkbox" {...f.bind('consent')} checked={f.values.consent} /> <span>I agree to {siteConfig.brand.name} contacting me about this quote request. See the <Link to="/privacy">privacy notice</Link>.</span></label>
        {f.errors.consent && <small className="err" role="alert">{f.errors.consent}</small>}
      </div>
      {fail && <p className="err" role="alert">{fail}</p>}
      <button className="btn btn--primary btn--block" type="submit" disabled={busy}>{busy ? 'Sending…' : '⚡ Send Quote Request'}</button>
      <p className="qprivacy">🔒 Your information is private and never shared. {c.person.split(' ')[0]} will contact you {c.response}.</p>
    </form>
  );
}
