import { Link } from 'react-router-dom';
export default function StatCard({ label, value, hint, to }) {
  const body = (<><span>{label}</span><b>{value}</b>{hint && <small>{hint}</small>}</>);
  return to ? <Link to={to} className="stat-card">{body}</Link> : <div className="stat-card">{body}</div>;
}
