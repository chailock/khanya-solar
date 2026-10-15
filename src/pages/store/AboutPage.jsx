import Button from '../../components/common/Button';
import CountUp from '../../components/common/CountUp';
import { siteConfig } from '../../data/siteConfig';
const hanchu = ['Energy storage brand of Guoxia Technology (HKEX: 02655)', 'Headquartered in Wuxi, Jiangsu, China', 'Partners in 170+ countries and regions', '5.7 GWh of energy storage equipment delivered in 2025',
  'On the BNEF Energy Storage Tier 1 list for Q2 2026', 'A local warehouse in South Africa and a South African entity, Hanchu Energy SA (Pty) Ltd'];
const sfsc = ['Solar Farming Systems Capital (Pty) Ltd, owner-operated and based in Volksrust', 'Serving KwaZulu-Natal, Mpumalanga and the Free State', 'Designs led by Jan-Hendrik Wiesemann: BTech Electrical Engineering (Power), Red Seal Electrician, PV Green Card holder',
  '150+ projects completed and 30+ MW designed and installed', 'Certificate of compliance issued and SSEG applications handled', 'Proposals backed by PVsyst energy simulation'];
const flow = [['1', 'Hanchu makes the equipment', 'Inverters, batteries and storage systems from a global energy storage manufacturer.'], ['2', `${siteConfig.brand.name} sells it online`, 'Customers browse specifications, compare products and request quotations.'], ['3', 'SFSC engineers the system', 'Site assessment, design, installation and compliance for farms and businesses.']];
const why = [['Equipment you can compare', 'Manufacturer specifications side by side, with no guesswork.'], ['Engineers who stay with you', 'You speak to the qualified engineer who designs and oversees your system.'], ['Compliance handled', 'Certificate of compliance and SSEG paperwork are part of SFSC projects.'], ['One route, product to project', 'Start with a single product or a full farm, factory or utility-scale project.']];
export default function AboutPage() {
  const b = siteConfig.brand.name;
  return (
    <>
      <div className="page-head"><div className="container"><h1>Global equipment. Local engineering.</h1>
        <p>{b} brings together Hanchu, a global energy storage manufacturer, and Solar Farming Systems Capital, a South African solar engineering firm, so customers can go from choosing equipment to a working system in one place.</p></div></div>
      <section className="section"><div className="container">
        <div className="partners">
          <article className="partner partner--hanchu"><span className="partner__badge" aria-hidden="true">H</span><span className="badge">Equipment partner</span><h2>Hanchu</h2>
            <p className="lead">HANCHU ESS delivers energy solutions for residential, commercial and industrial, and utility customers worldwide.</p>
            <ul className="specs">{hanchu.map((x) => <li key={x}>{x}</li>)}</ul></article>
          <article className="partner partner--sfsc"><span className="partner__badge" aria-hidden="true">S</span><span className="badge">Engineering and EPC partner</span><h2>Solar Farming Systems Capital</h2>
            <p className="lead">An owner-operated engineering firm designing, installing and maintaining solar systems for farms and businesses.</p>
            <ul className="specs">{sfsc.map((x) => <li key={x}>{x}</li>)}</ul></article>
        </div>
      </div></section>
      <section className="section section--mist"><div className="container">
        <div className="section__head"><h2>How the partnership works</h2></div>
        <div className="flow">{flow.map(([n, t, d]) => (<div className="flow__step" key={n}><span className="flow__n">{n}</span><h3>{t}</h3><p>{d}</p></div>))}</div>
      </div></section>
      <section className="section"><div className="container">
        <div className="stats">
          <div className="stat"><b><CountUp to={170} suffix="+" /></b><span>countries and regions served</span><i>Hanchu group</i></div>
          <div className="stat"><b><CountUp to={5.7} decimals={1} suffix=" GWh" /></b><span>storage delivered in 2025</span><i>Hanchu group</i></div>
          <div className="stat"><b><CountUp to={150} suffix="+" /></b><span>solar projects completed</span><i>SFSC</i></div>
          <div className="stat"><b><CountUp to={30} suffix="+ MW" /></b><span>designed and installed</span><i>SFSC</i></div>
        </div>
      </div></section>
      <section className="section section--mist"><div className="container">
        <div className="section__head"><h2>What this means for customers</h2></div>
        <div className="grid">{why.map(([t, d]) => (<div className="why" key={t}><h3>{t}</h3><p>{d}</p></div>))}</div>
        <p className="note" style={{ marginTop: 28, maxWidth: 760 }}>This is a proposed partnership. Stock, pricing, fulfilment and the partnership itself are not confirmed until formally agreed. Figures are each company's own, from the Hanchu ESS brochure (2026) and the SFSC website.</p>
      </div></section>
      <section className="section" style={{ paddingTop: 0 }}><div className="container"><div className="cta"><h2>Ready to start?</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}><Button to="/products" variant="dark">Shop products</Button><Button to="/contact" variant="line">Contact us</Button></div></div></div></section>
    </>
  );
}
