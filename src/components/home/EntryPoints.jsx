import { Link } from 'react-router-dom';
import { demoProducts } from '../../data/demoProducts';
import { services } from '../../data/services';
const icons = {
  shop: <path d="M5 8h14l-1.2 11H6.2zM9 8a3 3 0 0 1 6 0" />,
  design: <><circle cx="12" cy="12" r="4" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></>,
  projects: <path d="M4 20V9l6 3V9l6 3V5h4v15z" />,
};
const items = [
  { k: 'shop', tone: 'blue', title: 'Shop products', text: 'Browse Hanchu inverters, batteries and storage. Compare specifications and request a quote.', to: '/products', cta: 'Browse the range', chip: () => `${demoProducts.length} Hanchu products` },
  { k: 'design', tone: 'amber', title: 'Design my system', text: 'Share your bill, loads and site for a preliminary summary and a recommended next step.', to: '/design-my-system', cta: 'Start my design', chip: () => '5 short steps' },
  { k: 'projects', tone: 'green', title: 'Commercial and EPC projects', text: 'Farms, factories and large sites. Engineering assessment by Solar Farming Systems Capital.', to: '/commercial-projects', cta: 'Explore projects', chip: () => `${services.length} solution types` },
];
export default function EntryPoints() {
  return (
    <section className="paths"><div className="container grid">
      {items.map((c, i) => (
        <Link key={c.to} to={c.to} className={`ep ep--${c.tone}`} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
          <span className="ep__blob" aria-hidden="true" />
          <span className="ep__icon"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[c.k]}</svg></span>
          <span className="ep__chip">{c.chip()}</span>
          <h3>{c.title}</h3><p>{c.text}</p>
          <span className="ep__cta">{c.cta}<i aria-hidden="true">→</i></span>
        </Link>))}
    </div></section>
  );
}
