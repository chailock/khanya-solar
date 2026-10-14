import { Link } from 'react-router-dom';
export default function Button({ to, variant = 'primary', className = '', children, ...rest }) {
  const cls = `btn btn--${variant} ${className}`.trim();
  return to ? <Link to={to} className={cls} {...rest}>{children}</Link> : <button className={cls} {...rest}>{children}</button>;
}
