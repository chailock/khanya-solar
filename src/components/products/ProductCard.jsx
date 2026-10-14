

// import { Link } from 'react-router-dom';
// import AvailabilityBadge from './AvailabilityBadge';
// import ImageSlot from '../common/ImageSlot';
// import Button from '../common/Button';
// import CompareToggle from './CompareToggle';
// import { formatCurrency } from '../../utils/formatCurrency';
// export default function ProductCard({ p }) {
//   return (
//     <article className="pcard">
//       <ImageSlot src={p.image} alt={`${p.manufacturer} ${p.model}`} label={p.model} ratio="16 / 9" />
//       <div className="pcard__body">
//         <span className="pcard__mfr">{p.manufacturer} · {p.model}</span>
//         <h3><Link to={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>{p.name}</Link></h3>
//         <ul className="specs">{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
//         <div className="pcard__foot"><span className="price">{formatCurrency(p.price)}</span><AvailabilityBadge status={p.availability} /></div>
//         <div className="pcard__actions">
//           <Button to={`/request-quote?product=${p.slug}`} variant="dark" className="btn--sm">Request a quote</Button>
//           <Button to={`/products/${p.slug}`} variant="line" className="btn--sm">Specifications</Button>
//           <CompareToggle slug={p.slug} />
//         </div>
//       </div>
//     </article>
//   );
// }


import { Link } from 'react-router-dom';
import AvailabilityBadge from './AvailabilityBadge';
import ImageSlot from '../common/ImageSlot';
import Button from '../common/Button';
import CompareToggle from './CompareToggle';
import { useCart } from '../../features/cart/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function ProductCard({ p }) {
  const { add } = useCart();
  return (
    <article className="pcard">
      <ImageSlot src={p.image} alt={`${p.manufacturer} ${p.model}`} label={p.model} ratio="16 / 9" />
      <div className="pcard__body">
        <span className="pcard__mfr">{p.manufacturer} · {p.model}</span>
        <h3><Link to={`/products/${p.slug}`} style={{ textDecoration: 'none' }}>{p.name}</Link></h3>
        <ul className="specs">{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
        <div className="pcard__foot"><span className="price">{formatCurrency(p.price)}</span><AvailabilityBadge status={p.availability} /></div>
        <div className="pcard__actions">
          <button type="button" className="btn btn--dark btn--sm" onClick={() => add(p.slug)}>Add to cart</button>
          <Button to={`/request-quote?product=${p.slug}`} variant="line" className="btn--sm">Request a quote</Button>
        </div>
        <div className="pcard__links"><CompareToggle slug={p.slug} /><Link to={`/products/${p.slug}`}>Specifications</Link></div>
      </div>
    </article>
  );
}
