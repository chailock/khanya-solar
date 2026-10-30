import { siteConfig } from '../../data/siteConfig';
import { subtotalLabel } from '../../features/cart/cartUtils';
export default function CartSummary({ totals, children }) {
  return (
    <aside className="summary" aria-label="Order summary">
      <h3>Order summary</h3>
      <dl className="dl"><dt>Subtotal</dt><dd>{subtotalLabel(totals)}</dd><dt>Delivery</dt><dd>Quoted separately</dd><dt>VAT</dt><dd>{siteConfig.vat.note}</dd></dl>
      <p className="note">Prices are in rand, as supplied by Hanchu Energy SA. Stock, delivery and VAT are confirmed when your order or quote is processed.</p>
      {children}
    </aside>
  );
}
