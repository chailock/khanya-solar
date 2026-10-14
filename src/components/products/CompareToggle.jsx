import { useCompare } from '../../features/compare/CompareContext';
export default function CompareToggle({ slug }) {
  const { has, toggle, full } = useCompare();
  const on = has(slug);
  return (
    <button type="button" className={`cmp${on ? ' cmp--on' : ''}`} aria-pressed={on} disabled={full && !on}
      title={full && !on ? 'You can compare up to 3 products' : undefined} onClick={() => toggle(slug)}>
      {on ? '✓ Added to compare' : '+ Compare'}
    </button>
  );
}
