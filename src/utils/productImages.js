import { matchProductImage } from './matchProductImage';
// Photos saved in public/images/products/ are matched to products by file name, so every device (phones included) shows them.
// Best names: the product slug or model, e.g. hess-hy-s-6k-s.jpg or HESS-HY-S-6K-S.png.
const found = import.meta.glob('/public/**/products/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}', { query: '?url', import: 'default' });
export const productPhotoFiles = Object.keys(found).map((k) => k.replace(/^\/public/, '')).sort();
export const autoProductImage = (p) => matchProductImage(p, productPhotoFiles);
// Photos in the folder that no product matches (shown in admin so they can be renamed).
export const unmatchedPhotos = (products) => { const used = new Set(products.map(autoProductImage).filter(Boolean)); return productPhotoFiles.filter((f) => !used.has(f)); };
