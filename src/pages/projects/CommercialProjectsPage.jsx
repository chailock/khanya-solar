import ProjectHero from '../../components/projects/ProjectHero';
import ProjectCategoryCard from '../../components/projects/ProjectCategoryCard';
import ProjectProcess from '../../components/projects/ProjectProcess';
import SFSCBrandSection from '../../components/projects/SFSCBrandSection';
import { projectTypes } from '../../data/projectTypes';
export default function CommercialProjectsPage() {
  return (<><ProjectHero title="Commercial and EPC projects" intro="Larger solar and battery projects for farms, businesses and utility sites, assessed by Solar Farming Systems Capital." />
    <section className="section"><div className="container"><div className="grid">{projectTypes.map((t) => <ProjectCategoryCard key={t.slug} t={t} />)}</div></div></section>
    <ProjectProcess /><SFSCBrandSection /></>);
}
