import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
// Artwork lives in public/images/logo/. horizontal = header and footer, stacked = large uses, mark = icon only.
const ART = { horizontal: ['/images/logo/khanya-logo-horizontal.png', 401, 120], stacked: ['/images/logo/khanya-logo.png', 640, 617] };
export function LogoMark({ size = 40 }) {
  return <img src="/images/logo/khanya-mark.png" alt="" height={size} width={Math.round(size * 1.315)} style={{ height: size, width: 'auto', display: 'block' }} />;
}
export default function Logo({ variant = 'horizontal' }) {
  const [src, w, h] = ART[variant];
  return (
    <Link to="/" className={`logo logo--${variant}`} aria-label={`${siteConfig.brand.name} home`}>
      <img src={src} width={w} height={h} alt={siteConfig.brand.name} />
    </Link>
  );
}
