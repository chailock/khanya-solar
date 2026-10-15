import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
// Sun rising over a solar panel on a blue tile, with a green ground line. Colours match the site theme.
export function LogoMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="kmA" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2A8CFF" /><stop offset="1" stopColor="#0A56BD" /></linearGradient>
        <linearGradient id="kmB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFC857" /><stop offset="1" stopColor="#FF8A00" /></linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" fill="url(#kmA)" />
      <path d="M33 4.5v2.2M42.5 15h-2.2M39.7 8.3l-1.5 1.5M26.3 8.3l1.5 1.5M25.7 15h2.2" stroke="#FFD98A" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="33" cy="15" r="6.5" fill="url(#kmB)" />
      <path d="M9 38l5-14h26l-5 14z" fill="#fff" />
      <path d="M11.5 31h26M22.7 24l-5 14M30.3 24l-5 14" stroke="#0B6FE8" strokeWidth="1.2" opacity=".85" />
      <rect x="11" y="40.6" width="26" height="2.6" rx="1.3" fill="#12A06B" />
    </svg>
  );
}
export default function Logo() {
  const [first, ...rest] = siteConfig.brand.name.split(' ');
  return (
    <Link to="/" className="logo" aria-label={`${siteConfig.brand.name} home`}>
      <LogoMark />
      <span className="logo__word"><b>{first}</b>{rest.length > 0 && <i> {rest.join(' ')}</i>}</span>
    </Link>
  );
}
