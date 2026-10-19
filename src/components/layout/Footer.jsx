import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import { siteConfig as c } from '../../data/siteConfig';
export default function Footer() {
  const { contact: k, legal } = c;
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div><Logo /><p style={{ marginTop: 14 }}>{c.brand.tagline}.</p></div>
          <div><h3>Company</h3><ul><li><Link to="/about">About us</Link></li><li><Link to="/contact">Contact us</Link></li><li><Link to="/privacy">Privacy</Link></li><li><Link to="/terms">Terms</Link></li></ul></div>
          <div><h3>Shop</h3><ul><li><Link to="/products">All products</Link></li><li><Link to="/request-quote">Request a quote</Link></li><li><Link to="/bulk-enquiry">Bulk and reseller</Link></li></ul></div>
          <div><h3>Projects</h3><ul><li><Link to="/design-my-system">Design my system</Link></li><li><Link to="/commercial-projects">Commercial and EPC</Link></li><li><Link to="/agricultural-solar">Agricultural solar</Link></li></ul></div>
          <div><h3>Contact</h3><ul>
            <li><a href={`mailto:${k.email}`}>{k.email}</a></li>
            <li><a href={`tel:${k.phone.replace(/\s/g, '')}`}>{k.phone}</a></li>
            <li>{k.location}</li></ul></div>
        </div>
        <div className="footer__legal">
          <p>Copyright © {new Date().getFullYear()} {legal.copyrightName} | Powered by {legal.poweredBy.join(' & ')}</p>
          <button type="button" className="totop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button>
        </div>
      </div>
    </footer>
  );
}
