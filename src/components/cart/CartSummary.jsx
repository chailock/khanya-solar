import { siteConfig } from '../../data/siteConfig';
import { subtotalLabel } from '../../features/cart/cartUtils';
export default function CartSummary({ totals, children }) {
  return (
    <aside className="summary" aria-label="Order summary">
      <h3>Order summary</h3>
      <dl className="dl"><dt>Subtotal</dt><dd>{subtotalLabel(totals)}</dd><dt>Delivery</dt><dd>Quoted separately</dd><dt>VAT</dt><dd>{siteConfig.vat.note}</dd></dl>
      <p className="note">Prices are demonstration values until Hanchu confirms pricing, VAT treatment and stock.</p>
      {children}
    </aside>
  );
}
