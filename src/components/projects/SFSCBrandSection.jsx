import Button from '../common/Button';
export default function SFSCBrandSection() {
  return (<section className="section"><div className="container sfsc">
    <div><h2>Engineering by Solar Farming Systems Capital</h2><p className="lead">SFSC is the proposed engineering and EPC partner for larger projects. It is an owner-operated engineering firm in Volksrust serving KZN, Mpumalanga and the Free State.</p>
      <p><a href="https://solarfarmingsystems.co.za" target="_blank" rel="noopener noreferrer">solarfarmingsystems.co.za</a></p></div>
    <div className="sfsc__panel"><h3>Have a project in mind?</h3><p>Send the basics. SFSC qualifies the lead and follows up with an engineer.</p><Button to="/project-enquiry">Submit a project</Button></div>
  </div></section>);
}
