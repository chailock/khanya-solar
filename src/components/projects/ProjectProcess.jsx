const steps = [['Submit your project', 'Share location, size, site and timeline.'], ['Qualification', 'SFSC reviews the lead and contacts you.'], ['Feasibility', 'Site, grid and technical assessment.'], ['Proposal', 'Design, equipment and commercial terms.'], ['Delivery', 'Agreed separately once a proposal is accepted.']];
export default function ProjectProcess() {
  return (<section className="section section--mist"><div className="container"><div className="section__head"><h2>How a project lead is handled</h2></div>
    <ol className="steps">{steps.map(([t, d]) => <li key={t}><h3>{t}</h3><p>{d}</p></li>)}</ol>
    <p className="note" style={{ marginTop: 20 }}>Pricing, feasibility and delivery commitments are subject to separate assessment.</p></div></section>);
}
