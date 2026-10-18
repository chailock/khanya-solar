import { Routes, Route } from 'react-router-dom';
import StoreLayout from './layouts/StoreLayout';
import Home from './pages/Home';
import Placeholder from './pages/Placeholder';
import ProductsPage from './pages/store/ProductsPage';
import ProductDetailPage from './pages/store/ProductDetailPage';
import ComparePage from './pages/store/ComparePage';
import CartPage from './pages/store/CartPage';
import CheckoutPage from './pages/store/CheckoutPage';
import OrderConfirmationPage from './pages/store/OrderConfirmationPage';
import RequestQuotePage from './pages/store/RequestQuotePage';
import QuoteConfirmationPage from './pages/store/QuoteConfirmationPage';
import BulkEnquiryPage from './pages/store/BulkEnquiryPage';
import DesignMySystemPage from './pages/store/DesignMySystemPage';
import SystemSummaryPage from './pages/store/SystemSummaryPage';
import AboutPage from './pages/store/AboutPage';
import ContactPage from './pages/store/ContactPage';
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import ProductsAdminPage from './pages/admin/ProductsAdminPage';
import ProductEditPage from './pages/admin/ProductEditPage';
import RecordsPage from './pages/admin/RecordsPage';
import RecordDetailPage from './pages/admin/RecordDetailPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminLayout from './layouts/AdminLayout';
import CommercialProjectsPage from './pages/projects/CommercialProjectsPage';
import ProjectTypePage from './pages/projects/ProjectTypePage';
import ProjectEnquiryPage from './pages/projects/ProjectEnquiryPage';
import ProjectConfirmationPage from './pages/projects/ProjectConfirmationPage';
const pages = [['terms', 'Terms'], ['privacy', 'Privacy']];
export default function App() {
  return (
    <Routes>
      <Route path="admin/login" element={<LoginPage />} />
      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="products/new" element={<ProductEditPage />} />
        <Route path="products/edit/:slug" element={<ProductEditPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path=":section" element={<RecordsPage />} />
        <Route path=":section/:ref" element={<RecordDetailPage />} />
      </Route>
      <Route element={<StoreLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:slug" element={<ProductDetailPage />} />
        <Route path="compare" element={<ComparePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order-confirmation/:id" element={<OrderConfirmationPage />} />
        <Route path="request-quote" element={<RequestQuotePage />} />
        <Route path="quote-confirmation/:ref" element={<QuoteConfirmationPage />} />
        <Route path="bulk-enquiry" element={<BulkEnquiryPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="design-my-system" element={<DesignMySystemPage />} />
        <Route path="system-summary/:ref" element={<SystemSummaryPage />} />
        <Route path="commercial-projects" element={<CommercialProjectsPage />} />
        <Route path="agricultural-solar" element={<ProjectTypePage type="agricultural" />} />
        <Route path="commercial-industrial" element={<ProjectTypePage type="commercial-industrial" />} />
        <Route path="battery-storage" element={<ProjectTypePage type="battery-storage" />} />
        <Route path="utility-scale-solar" element={<ProjectTypePage type="utility-scale" />} />
        <Route path="project-enquiry" element={<ProjectEnquiryPage />} />
        <Route path="project-confirmation/:ref" element={<ProjectConfirmationPage />} />
        {pages.map(([path, title]) => <Route key={path} path={path} element={<Placeholder title={title} />} />)}
        <Route path="*" element={<Placeholder title="Page not found" />} />
      </Route>
    </Routes>
  );
}
