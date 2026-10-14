import { categories } from '../../data/categories';
import { applications, phases, availabilityLabels } from '../../data/demoProducts';
function Group({ label, name, value, options, onChange }) {
  return (
    <fieldset className="fgroup"><legend>{label}</legend>
      {[['', 'All'], ...options].map(([v, l]) => (<label key={v || 'all'}><input type="radio" name={name} checked={value === v} onChange={() => onChange(v)} /> {l}</label>))}
    </fieldset>
  );
}
export default function ProductFilters({ f, category, set, reset, open }) {
  return (
    <aside className={`filters${open ? ' open' : ''}`} aria-label="Filters">
      <Group label="Category" name="category" value={category} options={categories.map((c) => [c.slug, c.name])} onChange={(v) => set('category', v)} />
      <Group label="Application" name="application" value={f.application} options={Object.entries(applications)} onChange={(v) => set('application', v)} />
      <Group label="Supply" name="phase" value={f.phase} options={Object.entries(phases)} onChange={(v) => set('phase', v)} />
      <Group label="Availability" name="availability" value={f.availability} options={Object.entries(availabilityLabels)} onChange={(v) => set('availability', v)} />
      <button type="button" className="btn btn--line btn--sm" onClick={reset}>Reset filters</button>
    </aside>
  );
}
