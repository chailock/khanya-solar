import { Link } from 'react-router-dom';
export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="crumbs">
      {items.map(([label, to], i) => (<span key={label}>{to ? <Link to={to}>{label}</Link> : <span aria-current="page">{label}</span>}{i < items.length - 1 && ' / '}</span>))}
    </nav>
  );
}
