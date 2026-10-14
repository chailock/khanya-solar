import ProjectHero from '../../components/projects/ProjectHero';
import ProjectBenefits from '../../components/projects/ProjectBenefits';
import ProjectProcess from '../../components/projects/ProjectProcess';
import SFSCBrandSection from '../../components/projects/SFSCBrandSection';
import Button from '../../components/common/Button';
import { projectTypes } from '../../data/projectTypes';
export default function ProjectTypePage({ type }) {
  const t = projectTypes.find((p) => p.slug === type);
  return (<><ProjectHero title={t.name} intro={t.intro} type={t.slug} /><ProjectBenefits points={t.points} />
    {t.slug === 'battery-storage' && <div className="container" style={{ marginTop: -40 }}><Button to="/products/bess-5015s-h" variant="line">See the 5 MWh container</Button></div>}
    <ProjectProcess /><SFSCBrandSection /></>);
}
