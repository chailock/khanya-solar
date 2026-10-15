import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import FormField from '../../components/forms/FormField';
import useForm from '../../hooks/useForm';
import { required, email, phone, checked } from '../../utils/validation';
import { createMessage } from '../../services/contactService';
import { siteConfig } from '../../data/siteConfig';
const TOPICS = [['general', 'General enquiry'], ['products', 'Products and quotations'], ['system', 'Solar system design'], ['project', 'Commercial or EPC project'], ['support', 'Support or maintenance']];
const optionalPhone = (v) => (String(v).trim() ? phone(v) : '');
const enough = (v) => (String(v).trim().length >= 10 ? '' : 'Please add a few more details (at least 10 characters)');
const I = (d) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>;
function ContactForm({ onDone }) {
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const f = useForm({ topic: '', name: '', email: '', phone: '', message: '', consent: false },
    () => ({ topic: [required], name: [required], email: [required, email], phone: [optionalPhone], message: [required, enough], consent: [checked] }));
  const submit = async (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    setBusy(true); setFail('');
    try {
      const v = f.values;
      onDone(await createMessage({ topic: v.topic, contact: { name: v.name, email: v.email, phone: v.phone }, message: v.message, consent: true }));
    } catch (err) { setFail('Something went wrong. Please try again.'); setBusy(false); }
  };
  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="row2">
        <FormField id="name" label="Full name" error={f.errors.name}><input {...f.bind('name')} autoComplete="name" /></FormField>
        <FormField id="email" label="Email" error={f.errors.email}><input {...f.bind('email')} type="email" autoComplete="email" /></FormField>
      </div>
      <div className="row2">
        <FormField id="phone" label="Phone or WhatsApp" optional error={f.errors.phone}><input {...f.bind('phone')} type="tel" autoComplete="tel" /></FormField>
        <FormField id="topic" label="What is this about?" error={f.errors.topic}><select {...f.bind('topic')}><option value="">Select</option>{TOPICS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></FormField>
      </div>
      <FormField id="message" label="Your message" error={f.errors.message}><textarea rows="5" {...f.bind('message')} /></FormField>
      <div className={`field${f.errors.consent ? ' field--err' : ''}`}>
        <label className="check"><input type="checkbox" {...f.bind('consent')} checked={f.values.consent} /> <span>I agree to {siteConfig.brand.name} contacting me about this message. See the <Link to="/privacy">privacy notice</Link>.</span></label>
        {f.errors.consent && <small className="err" role="alert">{f.errors.consent}</small>}
      </div>
      {fail && <p className="err" role="alert">{fail}</p>}
      <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
    </form>
  );
}
export default function ContactPage() {
  const c = siteConfig.contact;
  const [done, setDone] = useState(null);
  const [n, setN] = useState(0);
  const digits = c.phone.replace(/\s/g, '');
  const wa = `https://wa.me/27${digits.replace(/^0/, '')}`;
  const info = [
    [I(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />), 'WhatsApp / Call', <><a href={`tel:${digits}`}>{c.phone}</a> · <a href={wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></>],
    [I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>), 'Email', <a href={`mailto:${c.email}`}>{c.email}</a>],
    [I(<><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>), 'Based in', c.location],
    [I(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>), 'Office hours', c.hours.map((h) => <span key={h} style={{ display: 'block' }}>{h}</span>)],
    [I(<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2z M9 4v14 M15 6v14" />), 'Service areas', c.serviceAreas],
  ];
  return (
    <>
      <div className="page-head"><div className="container"><h1>Get in touch with us</h1>
        <p>{siteConfig.brand.name} is supported by {siteConfig.engineering.name}, an owner-operated engineering firm. You speak directly with the qualified engineer who will design and oversee your installation, not a salesperson.</p></div></div>
      <section className="section" style={{ paddingTop: 48 }}><div className="container contactgrid">
        <div className="formcard">
          {done ? (
            <div className="confirm" style={{ gap: 14 }}>
              <h2 style={{ marginBottom: 0 }}>Message sent</h2>
              <p className="lead" style={{ margin: 0 }}>Thank you. We respond {c.response}. For urgent enquiries, WhatsApp {c.whatsapp} directly.</p>
              <div className="ref"><span>Reference number</span><strong>{done.ref}</strong></div>
              <p><button type="button" className="btn btn--line" onClick={() => { setDone(null); setN(n + 1); }}>Send another message</button></p>
            </div>
          ) : (<><h2 style={{ fontSize: '1.5rem' }}>Send us a message</h2><p className="lead" style={{ fontSize: '1rem' }}>We respond {c.response}.</p><ContactForm key={n} onDone={setDone} /></>)}
        </div>
        <div className="contactstack">
          {info.map(([icon, title, body]) => (<div className="crow" key={title}><span className="path__icon">{icon}</span><div><h3>{title}</h3><p>{body}</p></div></div>))}
        </div>
      </div></section>
      <section className="section section--mist"><div className="container">
        <div className="section__head"><h2>Prefer a specific form?</h2><p className="lead">Each one gives you a reference number straight away.</p></div>
        <div className="grid">
          <div className="why"><h3>Request a quotation</h3><p>Pricing for Hanchu equipment.</p><Button to="/request-quote" variant="line" className="btn--sm">Request a quote</Button></div>
          <div className="why"><h3>Design my system</h3><p>A preliminary summary from your bill and loads.</p><Button to="/design-my-system" variant="line" className="btn--sm">Start assessment</Button></div>
          <div className="why"><h3>Submit a project</h3><p>Farms, factories and large sites.</p><Button to="/project-enquiry" variant="line" className="btn--sm">Submit a project</Button></div>
        </div>
      </div></section>
    </>
  );
}
