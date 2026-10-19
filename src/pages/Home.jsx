import Hero from '../components/home/Hero';
import EntryPoints from '../components/home/EntryPoints';
import ProductsSection from '../components/home/ProductsSection';
import ProjectsSection from '../components/home/ProjectsSection';
import StatsBar from '../components/home/StatsBar';
import ProcessSteps from '../components/home/ProcessSteps';
import CallToAction from '../components/home/CallToAction';
// Story order: hero, three routes, Hanchu equipment, SFSC services, trust numbers, how it works, one closing call to action.
export default function Home() {
  return (<><Hero /><EntryPoints /><ProductsSection /><ProjectsSection /><StatsBar /><ProcessSteps /><CallToAction /></>);
}
