import { Link } from 'react-router-dom';
import ImageSlot from '../common/ImageSlot';
import { services } from '../../data/services';
import { pickBannerImages } from '../../utils/bannerImages';
const images = pickBannerImages(services);
// The six SFSC service cards, shared by the home page and the Commercial and EPC projects page.
export default function ServiceCards() {
  return (
    <div className="svc-grid">{services.map((s, i) => (
      <article className="svc" key={s.id}>
        <ImageSlot src={images[i]} alt={s.title} ratio="16 / 10" label="Photo to be supplied" />
        <span className="svc__icon" aria-hidden="true">{s.icon}</span>
        <div className="svc__body"><h3>{s.title}</h3><p>{s.text}</p><Link to={s.to} className="svc__cta">{s.cta}</Link></div>
      </article>))}
    </div>
  );
}
