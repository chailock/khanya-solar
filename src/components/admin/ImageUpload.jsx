import { useState } from 'react';
import { uploadImage } from '../../services/imageService';
export default function ImageUpload({ value, onChange, error }) {
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const isData = value.startsWith('data:');
  const take = async (file) => {
    if (!file) return;
    setBusy(true); setMsg('');
    try { onChange(await uploadImage(file)); } catch (e) { setMsg(e.message || 'Could not use that image.'); }
    setBusy(false);
  };
  return (
    <div className="upl">
      <span className="upl__label">Product image <em>(optional)</em></span>
      <label className={`drop${drag ? ' drop--on' : ''}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
        onDrop={(e) => { e.preventDefault(); setDrag(false); take(e.dataTransfer.files?.[0]); }}>
        <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => { take(e.target.files?.[0]); e.target.value = ''; }} />
        {value && <img src={value} alt="Product preview" />}
        <span className="drop__text">{busy ? 'Processing…' : value ? 'Drop a new image or click to replace' : 'Drag and drop an image here, or click to choose'}<small>JPG, PNG or WebP. It is resized automatically.</small></span>
      </label>
      {value && <button type="button" className="linkbtn" onClick={() => { onChange(''); setMsg(''); }}>Remove image</button>}
      {!isData && (<div className="field"><label htmlFor="imageLink">Or use an image link or path <span>(optional)</span></label><input id="imageLink" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or /images/products/photo.jpg" /></div>)}
      {(msg || error) && <small className="err" role="alert">{msg || error}</small>}
    </div>
  );
}
