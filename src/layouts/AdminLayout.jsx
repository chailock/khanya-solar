import { useEffect } from 'react';
import { Link, NavLink, Navigate, Outlet, useLocation } from 'react-router-dom';
import { LogoMark } from '../components/common/Logo';
import { useAuth } from '../features/auth/AuthContext';
import { SECTIONS } from '../features/admin/collections';
import { db } from '../mocks/db';
import { siteConfig } from '../data/siteConfig';
export default function AdminLayout() {
  const { user, logout } = useAuth();
  const loc = useLocation();
  useEffect(() => { document.title = `Admin | ${siteConfig.brand.name}`; }, []);
  if (!user) return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />;
  const open = (s) => db.list(s.db).filter((r) => r.status === s.statuses[0]).length;
  const nav = [['/admin', 'Dashboard', 0, true], ['/admin/products', 'Products'], ...Object.entries(SECTIONS).map(([k, s]) => [`/admin/${k}`, s.title, open(s)]), ['/admin/reports', 'Reports'], ['/admin/settings', 'Settings']];
  return (
    <div className="adm">
      <aside className="adm__side">
        <Link to="/admin" className="adm__brand"><LogoMark size={34} /><span>{siteConfig.brand.name}<small>Admin</small></span></Link>
        <nav aria-label="Admin">{nav.map(([to, label, n, end]) => (<NavLink key={to} to={to} end={!!end}>{label}{n > 0 && <b>{n}</b>}</NavLink>))}</nav>
        <div className="adm__foot"><Link to="/">View storefront</Link><button type="button" onClick={logout}>Sign out</button></div>
      </aside>
      <div className="adm__main"><header className="adm__bar"><span>Signed in as {user.email}</span><span className="sbadge sbadge--amber">Data stored in this browser</span></header><main className="adm__content"><Outlet /></main></div>
    </div>
  );
}
