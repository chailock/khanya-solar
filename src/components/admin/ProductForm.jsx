import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../forms/FormField';
import ImageUpload from './ImageUpload';
import { categories } from '../../data/categories';
import { applications, phases, availabilityLabels, demoProducts } from '../../data/demoProducts';
import { saveProductRecord, deleteProductRecord } from '../../services/productService';
const lines = (s) => s.split('\n').map((l) => l.trim()).filter(Boolean);
const toForm = (p) => ({ name: p.name, model: p.model, manufacturer: p.manufacturer, category: p.category, application: p.application, phase: p.phase || '', price: p.price ?? '', availability: p.availability,
  specs: (p.specs || []).join('\n'), table: (p.table || []).map(([k, v]) => `${k}: ${v}`).join('\n'), highlights: (p.highlights || []).join('\n'), datasheet: p.datasheet || '', image: p.image || '',
  headline: p.headline || '', voltage: p.voltage || '', efficiency: p.efficiency || '', ip: p.ip || '', dims: p.dims || '', weight: p.weight || '' });
const EMPTY = toForm({ name: '', model: '', manufacturer: 'Hanchu', category: categories[0].slug, application: 'residential', availability: 'tbc' });
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const okUrl = (v) => !v || /^(https?:\/\/|\/|data:image\/(png|jpeg|webp);base64,)/.test(v);
export default function ProductForm({ product }) {
  const nav = useNavigate();
  const [f, setF] = useState(product ? toForm(product) : EMPTY);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const bind = (k) => ({ id: k, value: f[k], onChange: (e) => setF({ ...f, [k]: e.target.value }) });
  const text = (k, label, extra = {}) => <FormField id={k} label={label} error={errors[k]} optional={extra.optional}><input {...bind(k)} /></FormField>;
  const save = async (e) => {
    e.preventDefault();
    const er = {};
    if (!f.name.trim()) er.name = 'Required';
    if (!f.model.trim()) er.model = 'Required';
    if (f.price !== '' && !(Number(f.price) >= 0)) er.price = 'Enter a price in rand, or leave empty for "Price on request"';
    if (!okUrl(f.datasheet)) er.datasheet = 'Use a full link (https://…) or a path starting with /';
    if (!okUrl(f.image)) er.image = 'Use a full link (https://…) or a path starting with /';
    setErrors(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      let slug = product?.slug;
      if (!slug) { const base = slugify(f.model) || 'product'; slug = base; let n = 2; while (demoProducts.some((p) => p.slug === slug)) slug = `${base}-${n++}`; }
      const rows = lines(f.table).map((l) => { const i = l.indexOf(':'); return i > 0 ? [l.slice(0, i).trim(), l.slice(i + 1).trim()] : [l, '']; });
      await saveProductRecord({ ...(product || {}), slug, category: f.category, application: f.application, phase: f.phase || null, manufacturer: f.manufacturer.trim() || 'Hanchu', model: f.model.trim(), name: f.name.trim(),
        price: f.price === '' ? null : Number(f.price), availability: f.availability, datasheet: f.datasheet.trim() || null, image: f.image.trim() || null, specs: lines(f.specs), table: rows, highlights: lines(f.highlights),
        headline: f.headline || null, voltage: f.voltage || null, efficiency: f.efficiency || null, ip: f.ip || null, dims: f.dims || null, weight: f.weight || null }, product?.slug);
      nav('/admin/products');
    } catch (err) { setErrors({ image: err.message }); setBusy(false); }
  };
  const remove = async () => { if (window.confirm(`Delete ${product.model}? This removes it from the storefront.`)) { await deleteProductRecord(product.slug); nav('/admin/products'); } };
  return (
    <form className="form" onSubmit={save} noValidate>
      <fieldset><legend>Product</legend>
        <div className="row2">{text('name', 'Name')}{text('model', 'Model')}</div>
        <div className="row2">{text('manufacturer', 'Manufacturer')}
          <FormField id="category" label="Category"><select {...bind('category')}>{categories.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></FormField></div>
        <div className="row2">
          <FormField id="application" label="Application"><select {...bind('application')}>{Object.entries(applications).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></FormField>
          <FormField id="phase" label="Supply" optional><select {...bind('phase')}><option value="">Not applicable</option>{Object.entries(phases).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></FormField></div>
      </fieldset>
      <fieldset><legend>Price and availability</legend><div className="row2">
        <FormField id="price" label="Price (R)" optional error={errors.price} hint='Leave empty to show "Price on request".'><input {...bind('price')} type="number" min="0" step="1" /></FormField>
        <FormField id="availability" label="Availability label"><select {...bind('availability')}>{Object.entries(availabilityLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></FormField></div></fieldset>
      <fieldset><legend>Content</legend>
        <FormField id="specs" label="Key specifications" hint="One per line. Shown on product cards."><textarea rows="3" {...bind('specs')} /></FormField>
        <FormField id="table" label="Specification table" hint="One per line as Label: value."><textarea rows="6" {...bind('table')} /></FormField>
        <FormField id="highlights" label="Highlights" optional hint="One per line."><textarea rows="3" {...bind('highlights')} /></FormField>
        <ImageUpload value={f.image} onChange={(v) => setF({ ...f, image: v })} error={errors.image} slug={product?.slug || slugify(f.model) || 'product'} />
        {text('datasheet', 'Datasheet path or link', { optional: true })}
        <p className="note" style={{ margin: 0 }}>Datasheets go in the project's <code>public/documents/datasheets</code> folder, for example <code>/documents/datasheets/6k.pdf</code>.</p>
      </fieldset>
      <fieldset><legend>Comparison fields</legend>
        <div className="row2">{text('headline', 'Power or capacity', { optional: true })}{text('voltage', 'Battery or system voltage', { optional: true })}</div>
        <div className="row2">{text('efficiency', 'Efficiency', { optional: true })}{text('ip', 'Ingress protection', { optional: true })}</div>
        <div className="row2">{text('dims', 'Dimensions', { optional: true })}{text('weight', 'Weight', { optional: true })}</div></fieldset>
      <div className="wiz__nav">
        {product ? <button type="button" className="btn btn--line" onClick={remove} style={{ color: '#B3261E' }}>Delete product</button> : <span />}
        <button className="btn btn--primary" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save product'}</button></div>
    </form>
  );
}
