import ProjectHero from '../../components/projects/ProjectHero';
import ServiceCards from '../../components/home/ServiceCards';
import ProjectProcess from '../../components/projects/ProjectProcess';
import SFSCBrandSection from '../../components/projects/SFSCBrandSection';
export default function CommercialProjectsPage() {
  return (<><ProjectHero title="Commercial and EPC projects" intro="Larger solar and battery projects for farms, businesses and utility sites, assessed by Solar Farming Systems Capital." />
    <section className="section"><div className="container"><ServiceCards /></div></section>
    <ProjectProcess /><SFSCBrandSection /></>);
}
