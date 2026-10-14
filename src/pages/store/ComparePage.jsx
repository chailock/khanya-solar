import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import AvailabilityBadge from '../../components/products/AvailabilityBadge';
import { applications, phases, availabilityLabels } from '../../data/demoProducts';
import { useCompare } from '../../features/compare/CompareContext';
import { getProduct } from '../../features/products/productUtils';
import { formatCurrency } from '../../utils/formatCurrency';
const rows = [
  ['Application', (p) => applications[p.application]], ['Supply', (p) => phases[p.phase]], ['Power / capacity', (p) => p.headline],
  ['Battery / system voltage', (p) => p.voltage], ['Efficiency', (p) => p.efficiency], ['Ingress protection', (p) => p.ip],
  ['Dimensions', (p) => p.dims], ['Weight', (p) => p.weight], ['Availability', (p) => availabilityLabels[p.availability]], ['Indicative price', (p) => formatCurrency(p.price)],
];
export default function ComparePage() {
  const { slugs, toggle, clear } = useCompare();
  const items = slugs.map(getProduct).filter(Boolean);
  return (
    <>
      <div className="page-head"><div className="container"><h1>Compare products</h1><p>Side-by-side specifications from Hanchu documentation.</p></div></div>
      <section className="section" style={{ paddingTop: 40 }}><div className="container">
        {items.length < 2 ? (
          <div className="empty"><h3>Choose at least two products to compare</h3><p>Use the Compare button on any product card.</p><Button to="/products">Browse products</Button></div>
        ) : (
          <>
            <div className="tablewrap"><table className="ctable">
              <thead><tr><th /> {items.map((p) => (
                <th key={p.slug} scope="col"><Link to={`/products/${p.slug}`}>{p.name}</Link><small>{p.model}</small>
                  <button type="button" className="linkbtn" onClick={() => toggle(p.slug)}>Remove</button></th>))}</tr></thead>
              <tbody>{rows.map(([label, fn]) => (<tr key={label}><th scope="row">{label}</th>{items.map((p) => <td key={p.slug}>{fn(p) || '—'}</td>)}</tr>))}</tbody>
              <tfoot><tr><th /> {items.map((p) => <td key={p.slug}><Button to={`/request-quote?product=${p.slug}`} className="btn--sm">Request a quote</Button></td>)}</tr></tfoot>
            </table></div>
            <p className="note">A dash means the value is not stated in the Hanchu brochure. <button type="button" className="linkbtn" onClick={clear}>Clear comparison</button></p>
          </>)}
      </div></section>
    </>
  );
}
