import Button from '../common/Button';
export default function CallToAction() {
  return (
    <section className="section" style={{ paddingTop: 0 }}><div className="container"><div className="cta">
      <h2>Not sure what you need? Start with a quote.</h2><Button to="/request-quote" variant="dark">Request a quote</Button>
    </div></div></section>
  );
}
