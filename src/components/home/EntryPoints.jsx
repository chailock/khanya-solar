import { Link } from 'react-router-dom';
const icons = {
  shop: <path d="M5 8h14l-1.2 11H6.2zM9 8a3 3 0 0 1 6 0" />,
  design: <><circle cx="12" cy="12" r="4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  projects: <path d="M4 20V9l6 3V9l6 3V5h4v15z" />,
};
const items = [
  ['shop', 'Shop products', 'Browse Hanchu inverters, batteries and storage. Compare specifications and request a quote.', '/products'],
  ['design', 'Design my system', 'Share your bill, loads and site for a preliminary summary and a recommended next step.', '/design-my-system'],
  ['projects', 'Commercial and EPC projects', 'Farms, factories and large sites. Engineering assessment by Solar Farming Systems Capital.', '/commercial-projects'],
];
export default function EntryPoints() {
  return (
    <section className="paths"><div className="container grid">
      {items.map(([k, t, d, to]) => (
        <Link key={to} to={to} className="path">
          <span className="path__icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[k]}</svg></span>
          <h3>{t}</h3><p>{d}</p><span className="path__go">Get started</span>
        </Link>))}
    </div></section>
  );
}
