import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AnnouncementBar from '../components/layout/AnnouncementBar';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CompareBar from '../components/products/CompareBar';
import CartToast from '../components/cart/CartToast';
import useScrollReveal from '../hooks/useScrollReveal';
import { siteConfig } from '../data/siteConfig';
export default function StoreLayout() {
  useScrollReveal();
  // Brand name lives only in siteConfig.js, including the browser tab title.
  useEffect(() => { document.title = `${siteConfig.brand.name} | ${siteConfig.brand.tagline}`; }, []);
  return (<><a className="skip" href="#main">Skip to content</a><AnnouncementBar /><Navbar /><main id="main"><Outlet /></main><Footer /><CompareBar /><CartToast /></>);
}
