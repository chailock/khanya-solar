import { matchImages } from './matchImages';
// Lists the photos you placed in a public/banners folder (also public/images/banners or banner). The home hero photo (solar.*) is excluded.
const found = import.meta.glob('/public/**/banner*/*.{jpg,jpeg,png,webp,avif}', { query: '?url', import: 'default' });
const HERO = /(^|\/)solar\.[a-z0-9]+$/i;
export const bannerFiles = Object.keys(found).map((k) => k.replace(/^\/public/, '')).filter((f) => !HERO.test(f)).sort();
export const pickBannerImages = (items) => matchImages(items, bannerFiles);
