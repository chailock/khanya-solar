// Reads an image file, shrinks it to a web-friendly size and returns a data URL.
// Browser demo storage is small, so images are resized (longest side 1400 px) and compressed.
const TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_INPUT = 10 * 1024 * 1024;
const MAX_SIDE = 1400;
const MAX_OUTPUT = 1_200_000;
export async function prepareImage(file) {
  if (!TYPES.includes(file.type)) throw new Error('Use a JPG, PNG or WebP image.');
  if (file.size > MAX_INPUT) throw new Error('That image is over 10 MB. Choose a smaller one.');
  let bmp;
  try { bmp = await createImageBitmap(file); } catch (e) { throw new Error('That file could not be read as an image.'); }
  const scale = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
  const w = Math.max(1, Math.round(bmp.width * scale));
  const h = Math.max(1, Math.round(bmp.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(bmp, 0, 0, w, h);
  if (bmp.close) bmp.close();
  let url = canvas.toDataURL('image/webp', 0.85);
  if (!url.startsWith('data:image/webp')) url = canvas.toDataURL('image/jpeg', 0.85);
  if (url.length > MAX_OUTPUT) url = canvas.toDataURL('image/jpeg', 0.65);
  if (url.length > MAX_OUTPUT) throw new Error('That image is too detailed to store. Try a smaller or simpler one.');
  return url;
}
