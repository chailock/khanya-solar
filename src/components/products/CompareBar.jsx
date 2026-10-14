import { Link } from 'react-router-dom';
import { useCompare, MAX_COMPARE } from '../../features/compare/CompareContext';
import { getProduct } from '../../features/products/productUtils';
export default function CompareBar() {
  const { slugs, clear } = useCompare();
  if (!slugs.length) return null;
  return (
    <div className="cmpbar" role="region" aria-label="Product comparison">
      <div className="container cmpbar__in">
        <p><strong>{slugs.length} of {MAX_COMPARE}</strong> selected: {slugs.map((s) => getProduct(s)?.model).filter(Boolean).join(', ')}</p>
        <div className="cmpbar__act">
          <button type="button" className="btn btn--line btn--sm" onClick={clear}>Clear</button>
          {slugs.length >= 2 ? <Link to="/compare" className="btn btn--primary btn--sm">Compare now</Link> : <span className="cmpbar__hint">Pick one more</span>}
        </div>
      </div>
    </div>
  );
}
