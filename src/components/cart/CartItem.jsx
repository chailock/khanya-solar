import { Link } from 'react-router-dom';
import QuantitySelector from './QuantitySelector';
import { useCart } from '../../features/cart/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function CartItem({ product: p, qty }) {
  const { setQty, remove } = useCart();
  return (
    <li className="citem">
      <div className="citem__img" aria-hidden="true">{p.model}</div>
      <div className="citem__info">
        <Link to={`/products/${p.slug}`}><strong>{p.name}</strong></Link>
        <span>{p.manufacturer} · {p.model}</span>
        <span>{p.price == null ? 'Price on request' : `${formatCurrency(p.price)} each`}</span>
        <button type="button" className="linkbtn" onClick={() => remove(p.slug)}>Remove</button>
      </div>
      <QuantitySelector value={qty} label={p.model} onChange={(n) => setQty(p.slug, n)} />
      <div className="citem__total">{p.price == null ? 'Quoted' : formatCurrency(p.price * qty)}</div>
    </li>
  );
}
