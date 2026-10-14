import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { siteConfig as c } from '../../data/siteConfig';
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid">
          <div><Logo /><p style={{ marginTop: 14 }}>{c.brand.tagline}.</p></div>
          <div><h3>Shop</h3><ul><li><Link to="/products">All products</Link></li><li><Link to="/request-quote">Request a quote</Link></li><li><Link to="/bulk-enquiry">Bulk and reseller</Link></li></ul></div>
          <div><h3>Projects</h3><ul><li><Link to="/design-my-system">Design my system</Link></li><li><Link to="/commercial-projects">Commercial and EPC</Link></li><li><Link to="/agricultural-solar">Agricultural solar</Link></li></ul></div>
          <div><h3>Contact</h3><ul><li>{c.contact.email}</li><li>{c.contact.phone}</li><li><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link></li></ul></div>
        </div>
        <div className="footer__legal">
          <p>Equipment supplier: {c.supplier.name} ({c.supplier.note.toLowerCase()}). Engineering and EPC: {c.engineering.name}.</p>
          <p>{c.demoNotice} © {new Date().getFullYear()} {c.brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
