import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label={siteConfig.brand.name}>
      <svg width="38" height="38" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="11" fill="#0B6FE8" />
        <path d="M8 27a12 12 0 0 1 24 0" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M14 27a6 6 0 0 1 12 0" fill="#FFB020" />
        <path d="M7 31h26" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span>{siteConfig.brand.name}</span>
    </Link>
  );
}
