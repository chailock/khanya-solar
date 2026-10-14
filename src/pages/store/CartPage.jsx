import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import { useCart } from '../../features/cart/CartContext';
import { lines, totals } from '../../features/cart/cartUtils';
export default function CartPage() {
  const { items, clear } = useCart();
  const ls = lines(items);
  return (
    <>
      <div className="page-head"><div className="container"><h1>Your cart</h1><p>Review your items, then continue to the test checkout or ask for a quotation.</p></div></div>
      <section className="section" style={{ paddingTop: 40 }}><div className="container">
        {!ls.length ? (<div className="empty"><h3>Your cart is empty</h3><p>Browse the range and add equipment to get started.</p><Button to="/products">Shop products</Button></div>) : (
          <div className="cartgrid">
            <div><ul className="clist">{ls.map((l) => <CartItem key={l.product.slug} {...l} />)}</ul>
              <p><button type="button" className="linkbtn" onClick={clear}>Clear cart</button> · <Link to="/products">Continue shopping</Link></p></div>
            <CartSummary totals={totals(ls)}>
              <Button to="/checkout">Proceed to test checkout</Button>
              <Button to="/request-quote?from=cart" variant="line">Request a quotation instead</Button>
            </CartSummary>
          </div>)}
      </div></section>
    </>
  );
}
