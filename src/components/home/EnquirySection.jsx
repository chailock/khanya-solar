import Button from '../common/Button';
const routes = [
  ['Request a solar assessment', 'Share your bill, loads and site. Receive a preliminary summary and the next step.', '/design-my-system', 'Start assessment'],
  ['Request a project proposal', 'For farms, businesses and large sites. SFSC qualifies the project and follows up.', '/project-enquiry', 'Submit a project'],
  ['Request a bulk quotation', 'Installers, resellers and multi-unit orders of Hanchu equipment.', '/bulk-enquiry', 'Request bulk quote'],
];
export default function EnquirySection() {
  return (
    <section className="section enq" id="enquiries"><div className="container">
      <div className="section__head"><h2>Tell us what you need</h2><p className="lead">Choose the route that fits. Every enquiry gets a reference number.</p></div>
      <div className="grid">{routes.map(([t, d, to, cta]) => (
        <div key={to} className="enq__card"><h3>{t}</h3><p>{d}</p><Button to={to}>{cta}</Button></div>))}
      </div>
    </div></section>
  );
}
