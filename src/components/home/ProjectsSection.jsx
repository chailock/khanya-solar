import ServiceCards from './ServiceCards';
import { servicesIntro } from '../../data/services';
export default function ProjectsSection() {
  return (
    <section className="section section--mist" id="projects"><div className="container">
      <div className="section__head"><span className="eyebrow">{servicesIntro.label}</span><h2>{servicesIntro.title}</h2><p className="lead">{servicesIntro.text}</p></div>
      <ServiceCards />
    </div></section>
  );
}
