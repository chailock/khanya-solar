import QuoteRequestForm from '../../components/forms/QuoteRequestForm';
import { QUOTE_POINTS } from '../../features/quote/quoteOptions';
import { siteConfig } from '../../data/siteConfig';
export default function RequestQuotePage() {
  return (
    <section className="qhero"><div className="container qgrid">
      <div className="qintro">
        <span className="eyebrow">Instant Estimate</span>
        <h1>Get Your Free <span>Solar Quote</span></h1>
        <p className="lead">Fill in the form for an instant estimate, or complete all details for a detailed follow-up proposal. All quotes are free with no obligation.</p>
        <ul className="qlist">{QUOTE_POINTS.map((p) => <li key={p}>{p}</li>)}</ul>
      </div>
      <div className="qcard">
        <h2>Request a Quote</h2>
        <p className="qcard__sub">We'll respond {siteConfig.contact.response}</p>
        <QuoteRequestForm />
      </div>
    </div></section>
  );
}
