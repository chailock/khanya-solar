import { Link } from 'react-router-dom';
import ImageSlot from '../common/ImageSlot';
import { projectCategories } from '../../data/projectCategories';
export default function ProjectsSection() {
  return (
    <section className="section section--mist" id="projects"><div className="container">
      <div className="section__head"><h2>Solar projects by Solar Farming Systems Capital</h2>
        <p className="lead">Engineering-led solar for farms, businesses and large sites. Each project is assessed and priced separately.</p></div>
      <div className="grid">{projectCategories.map((c) => (
        <Link key={c.slug} to={c.to} className="proj">
          <ImageSlot src={c.image} alt={c.name} />
          <div className="proj__body"><h3>{c.name}</h3><p>{c.blurb}</p><span className="path__go">View project type</span></div>
        </Link>))}
      </div>
    </div></section>
  );
}
