import { Link } from 'react-router-dom';
import { useCart } from '../../features/cart/CartContext';
export default function CartToast() {
  const { notice } = useCart();
  return notice ? <div className="toast" role="status">{notice} · <Link to="/cart">View cart</Link></div> : null;
}
