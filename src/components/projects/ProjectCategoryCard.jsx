import { Link } from 'react-router-dom';
import ImageSlot from '../common/ImageSlot';
export default function ProjectCategoryCard({ t }) {
  return (<Link to={t.path} className="proj"><ImageSlot src={t.image} alt={t.name} /><div className="proj__body"><h3>{t.name}</h3><p>{t.blurb}</p><span className="path__go">Learn more</span></div></Link>);
}
