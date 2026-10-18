import { prepareImage } from '../utils/imageUpload';
import { USE_MOCKS, BASE } from './apiClient';
// Demo: the image is shrunk and kept in the browser as a data URL.
// Production: the file is uploaded to the backend, which returns a stored URL: POST /uploads (multipart) -> { url }.
export async function uploadImage(file) {
  if (USE_MOCKS) return prepareImage(file);
  const body = new FormData();
  body.append('file', file);
  const res = await fetch(`${BASE}/uploads`, { method: 'POST', body });
  if (!res.ok) throw new Error('Upload failed. Please try again.');
  return (await res.json()).url;
}
