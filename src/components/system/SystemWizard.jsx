import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../forms/FormField';
import FormProgress from '../forms/FormProgress';
import useForm from '../../hooks/useForm';
import { required, email, phone, checked } from '../../utils/validation';
import { PROVINCES } from '../../utils/constants';
import { OPTIONS, LOADS, lab } from '../../features/system/systemOptions';
import { createSystemEnquiry } from '../../services/solarService';
import { siteConfig } from '../../data/siteConfig';
const STEPS = ['Your site', 'Electricity', 'Loads and backup', 'Preferences', 'Your details'];
const rulesFor = (s, v) => [
  { customerType: [required], province: [required], place: [required] }, { supply: [required] },
  { hours: [required], backup: [required], ...(v.backup && v.backup !== 'none' ? { backupHours: [required] } : {}) },
  { pv: [required], battery: [required], gridPref: [required] },
  { name: [required], email: [required, email], phone: [required, phone], consent: [checked] }][s];
function Opts({ f, name, legend }) {
  return (
    <fieldset><legend>{legend}</legend>
      <div className="opts">{OPTIONS[name].map(([v, l, h]) => (
        <label key={v} className={`opt${f.values[name] === v ? ' on' : ''}`}><input type="radio" name={name} value={v} checked={f.values[name] === v} onChange={() => f.set(name, v)} /><span><strong>{l}</strong>{h && <small>{h}</small>}</span></label>))}</div>
      {f.errors[name] && <small className="err" role="alert">Please choose an option</small>}
    </fieldset>
  );
}
export default function SystemWizard() {
  const nav = useNavigate();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const top = useRef(null);
  const first = useRef(true);
  const f = useForm({ customerType: '', province: '', place: '', bill: '', kwh: '', supply: '', loads: [], otherLoads: '', hours: '', backup: '', backupHours: '', pv: '', battery: '', gridPref: '', notes: '', name: '', email: '', phone: '', consent: false }, (v) => rulesFor(step, v));
  useEffect(() => { if (first.current) { first.current = false; return; } top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, [step]);
  const v = f.values;
  const extra = () => {
    if (step === 1 && !(Number(v.bill) > 0) && !(Number(v.kwh) > 0)) return { consumption: 'Enter your monthly bill or your monthly kWh' };
    if (step === 2 && !v.loads.length && !v.otherLoads.trim()) return { loads: 'Choose at least one load, or describe it below' };
    return {};
  };
  const next = () => { if (f.validate(extra())) setStep(step + 1); };
  const submit = async (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    setBusy(true); setFail('');
    try {
      const r = await createSystemEnquiry({ customerType: v.customerType, location: { province: v.province, place: v.place }, consumption: { bill: v.bill, kwh: v.kwh }, supply: v.supply,
        loads: v.loads, otherLoads: v.otherLoads, hours: v.hours, backup: v.backup, backupHours: v.backupHours, pv: v.pv, battery: v.battery, gridPref: v.gridPref, notes: v.notes,
        contact: { name: v.name, email: v.email, phone: v.phone }, consent: true });
      nav(`/system-summary/${r.ref}`);
    } catch (err) { setFail('Something went wrong. Please try again.'); setBusy(false); }
  };
  const toggleLoad = (l) => f.set('loads', v.loads.includes(l) ? v.loads.filter((x) => x !== l) : [...v.loads, l]);
  return (
    <form className="form" onSubmit={submit} noValidate ref={top}>
      <FormProgress steps={STEPS} step={step} />
      {step === 0 && (<><Opts f={f} name="customerType" legend="What kind of site is this?" />
        <fieldset><legend>Site location</legend><div className="row2">
          <FormField id="place" label="Town or suburb" error={f.errors.place}><input {...f.bind('place')} /></FormField>
          <FormField id="province" label="Province" error={f.errors.province}><select {...f.bind('province')}><option value="">Select</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select></FormField></div></fieldset></>)}
      {step === 1 && (<><fieldset><legend>Electricity use</legend>
        <p className="note" style={{ marginTop: 0 }}>Enter either one. A recent bill is enough.</p>
        <div className="row2">
          <FormField id="bill" label="Monthly bill (R)" optional><input {...f.bind('bill')} type="number" min="0" inputMode="decimal" /></FormField>
          <FormField id="kwh" label="Monthly use (kWh)" optional><input {...f.bind('kwh')} type="number" min="0" inputMode="decimal" /></FormField></div>
        {f.errors.consumption && <small className="err" role="alert">{f.errors.consumption}</small>}</fieldset>
        <Opts f={f} name="supply" legend="Electricity supply" /></>)}
      {step === 2 && (<><fieldset><legend>Main loads</legend>
        <div className="chipsel">{LOADS.map((l) => (<label key={l} className={`chipcb${v.loads.includes(l) ? ' on' : ''}`}><input type="checkbox" checked={v.loads.includes(l)} onChange={() => toggleLoad(l)} />{l}</label>))}</div>
        <FormField id="otherLoads" label="Other loads" optional><input {...f.bind('otherLoads')} /></FormField>
        {f.errors.loads && <small className="err" role="alert">{f.errors.loads}</small>}</fieldset>
        <Opts f={f} name="hours" legend="When is most power used?" /><Opts f={f} name="backup" legend="Backup during outages" />
        {v.backup && v.backup !== 'none' && <Opts f={f} name="backupHours" legend="How long should backup last?" />}</>)}
      {step === 3 && (<><Opts f={f} name="pv" legend="Do you want solar panels added?" /><Opts f={f} name="battery" legend="Do you want battery storage?" /><Opts f={f} name="gridPref" legend="How should the system use the grid?" /></>)}
      {step === 4 && (<><fieldset><legend>Review</legend><dl className="dl dl--left">
        <dt>Site</dt><dd>{lab('customerType', v.customerType)}, {v.place}, {v.province}</dd><dt>Use</dt><dd>{[v.bill && `R${v.bill}/month`, v.kwh && `${v.kwh} kWh/month`].filter(Boolean).join(' · ')}</dd>
        <dt>Backup</dt><dd>{lab('backup', v.backup)}</dd><dt>Preferences</dt><dd>Panels: {lab('pv', v.pv)}; batteries: {lab('battery', v.battery)}</dd></dl></fieldset>
        <fieldset><legend>Your details</legend>
          <FormField id="name" label="Full name" error={f.errors.name}><input {...f.bind('name')} autoComplete="name" /></FormField>
          <div className="row2"><FormField id="email" label="Email" error={f.errors.email}><input {...f.bind('email')} type="email" autoComplete="email" /></FormField>
            <FormField id="phone" label="Phone" error={f.errors.phone}><input {...f.bind('phone')} type="tel" autoComplete="tel" /></FormField></div>
          <FormField id="notes" label="Anything else we should know" optional><textarea rows="3" {...f.bind('notes')} /></FormField></fieldset>
        <div className={`field${f.errors.consent ? ' field--err' : ''}`}>
          <label className="check"><input type="checkbox" {...f.bind('consent')} checked={v.consent} /> <span>I agree to {siteConfig.brand.name} contacting me about this enquiry. See the <Link to="/privacy">privacy notice</Link>.</span></label>
          {f.errors.consent && <small className="err" role="alert">{f.errors.consent}</small>}</div></>)}
      {fail && <p className="err" role="alert">{fail}</p>}
      <div className="wiz__nav">
        {step > 0 ? <button type="button" className="btn btn--line" onClick={() => setStep(step - 1)}>Back</button> : <span />}
        {step < STEPS.length - 1 ? <button type="button" className="btn btn--primary" onClick={next}>Continue</button>
          : <button type="submit" className="btn btn--primary" disabled={busy}>{busy ? 'Preparing…' : 'Get my preliminary summary'}</button>}
      </div>
    </form>
  );
}
