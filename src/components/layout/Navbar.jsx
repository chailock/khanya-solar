import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../features/cart/CartContext';
import Logo from '../common/Logo';
import Button from '../common/Button';
const links = [['Shop', '/products'], ['Design my system', '/design-my-system'], ['Commercial projects', '/commercial-projects'], ['About', '/about'], ['Contact', '/contact']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="nav">
      <div className="container nav__bar">
        <Logo />
        <nav aria-label="Main">
          <ul className={`nav__links${open ? ' open' : ''}`}>
            {links.map(([label, to]) => (
              <li key={to}><NavLink to={to} onClick={() => setOpen(false)}>{label}</NavLink></li>
            ))}
          </ul>
        </nav>
        <div className="nav__cta">
          <Link to="/cart" className="cartlink" aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 8h14l-1.2 11H6.2zM9 8a3 3 0 0 1 6 0" /></svg>
            {count > 0 && <b>{count}</b>}
          </Link>
          <Button to="/request-quote" variant="dark">Request a quote</Button>
          <button className="nav__toggle" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>
      </div>
    </header>
  );
}
