import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import FormField from '../forms/FormField';
import useForm from '../../hooks/useForm';
import { required, email, phone, checked } from '../../utils/validation';
import { PROVINCES } from '../../utils/constants';
import { projectTypes, CAPACITY, SITE_STATUS, GRID_STATUS, TIMELINE } from '../../data/projectTypes';
import { siteConfig } from '../../data/siteConfig';
import { createProject } from '../../services/projectService';
const Sel = ({ f, id, label, list }) => (<FormField id={id} label={label} error={f.errors[id]}><select {...f.bind(id)}><option value="">Select</option>{list.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></FormField>);
export default function ProjectEnquiryForm() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const t = params.get('type');
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState('');
  const f = useForm({ projectType: projectTypes.some((p) => p.slug === t) ? t : '', province: '', place: '', capacity: '', capacityNote: '', siteStatus: '', gridStatus: '', timeline: '', description: '', name: '', company: '', email: '', phone: '', consent: false },
    () => ({ projectType: [required], province: [required], place: [required], capacity: [required], siteStatus: [required], gridStatus: [required], timeline: [required], name: [required], company: [required], email: [required, email], phone: [required, phone], consent: [checked] }));
  const submit = async (e) => {
    e.preventDefault();
    if (!f.validate()) return;
    setBusy(true); setFail('');
    try {
      const v = f.values;
      const r = await createProject({ projectType: v.projectType, location: { province: v.province, place: v.place }, capacity: v.capacity, capacityNote: v.capacityNote, siteStatus: v.siteStatus, gridStatus: v.gridStatus,
        timeline: v.timeline, description: v.description, linkedEnquiry: params.get('from') || '', contact: { name: v.name, company: v.company, email: v.email, phone: v.phone }, consent: true });
      nav(`/project-confirmation/${r.ref}`);
    } catch (err) { setFail('Something went wrong. Please try again.'); setBusy(false); }
  };
  return (
    <form className="form" onSubmit={submit} noValidate>
      <fieldset><legend>The project</legend>
        <Sel f={f} id="projectType" label="Project type" list={projectTypes.map((p) => [p.slug, p.name])} />
        <div className="row2"><Sel f={f} id="capacity" label="Approximate capacity" list={CAPACITY} />
          <FormField id="capacityNote" label="Capacity detail" optional hint="For example: 450 kWp roof, or 2 MWh storage."><input {...f.bind('capacityNote')} /></FormField></div>
        <div className="row2"><Sel f={f} id="siteStatus" label="Land or roof status" list={SITE_STATUS} /><Sel f={f} id="gridStatus" label="Grid connection status" list={GRID_STATUS} /></div>
        <Sel f={f} id="timeline" label="Expected timeline" list={TIMELINE} />
        <FormField id="description" label="Project description" optional><textarea rows="4" {...f.bind('description')} /></FormField>
      </fieldset>
      <fieldset><legend>Project location</legend><div className="row2">
        <FormField id="place" label="Farm, site or town" error={f.errors.place}><input {...f.bind('place')} /></FormField>
        <FormField id="province" label="Province" error={f.errors.province}><select {...f.bind('province')}><option value="">Select</option>{PROVINCES.map((p) => <option key={p}>{p}</option>)}</select></FormField></div></fieldset>
      <fieldset><legend>Your details</legend>
        <div className="row2"><FormField id="name" label="Full name" error={f.errors.name}><input {...f.bind('name')} autoComplete="name" /></FormField>
          <FormField id="company" label="Company or farm" error={f.errors.company}><input {...f.bind('company')} autoComplete="organization" /></FormField></div>
        <div className="row2"><FormField id="email" label="Email" error={f.errors.email}><input {...f.bind('email')} type="email" autoComplete="email" /></FormField>
          <FormField id="phone" label="Phone" error={f.errors.phone}><input {...f.bind('phone')} type="tel" autoComplete="tel" /></FormField></div></fieldset>
      <div className={`field${f.errors.consent ? ' field--err' : ''}`}>
        <label className="check"><input type="checkbox" {...f.bind('consent')} checked={f.values.consent} /> <span>I agree to {siteConfig.brand.name} and SFSC contacting me about this project. See the <Link to="/privacy">privacy notice</Link>.</span></label>
        {f.errors.consent && <small className="err" role="alert">{f.errors.consent}</small>}</div>
      <p className="note">Submitting a lead is not a commitment. Pricing, feasibility and delivery are assessed separately.</p>
      {fail && <p className="err" role="alert">{fail}</p>}
      <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Sending…' : 'Submit project to SFSC'}</button>
    </form>
  );
}
