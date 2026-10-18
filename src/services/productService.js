import { demoProducts } from '../data/demoProducts';
import { saveProduct, removeProduct } from '../features/products/productStore';
import { USE_MOCKS, request } from './apiClient';
// Admin product management. Public pages read the same list.
export const listProducts = async () => (USE_MOCKS ? [...demoProducts] : request('/products'));
export const getProductBySlug = async (slug) => (USE_MOCKS ? demoProducts.find((p) => p.slug === slug) || null : request(`/products/${slug}`));
export const saveProductRecord = async (p, originalSlug) => (USE_MOCKS ? saveProduct(p, originalSlug) : request(originalSlug ? `/products/${originalSlug}` : '/products', { method: originalSlug ? 'PUT' : 'POST', body: p }));
export const deleteProductRecord = async (slug) => (USE_MOCKS ? removeProduct(slug) : request(`/products/${slug}`, { method: 'DELETE' }));
