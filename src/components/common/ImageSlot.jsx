// Shows the real image when src is set; otherwise a clearly labelled placeholder. fit="contain" shows whole product shots without cropping.
export default function ImageSlot({ src, alt, label = 'Approved photo to be supplied', ratio = '4 / 3', fit = 'cover' }) {
  return src
    ? <img className="imgslot" src={src} alt={alt} loading="lazy" style={{ aspectRatio: ratio, objectFit: fit, background: fit === 'contain' ? '#fff' : undefined }} />
    : <div className="imgslot imgslot--empty" style={{ aspectRatio: ratio }} role="img" aria-label={alt}><span>{label}</span></div>;
}
