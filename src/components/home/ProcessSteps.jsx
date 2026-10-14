const steps = [['Free quote', 'Send your details and receive a preliminary estimate.'], ['Site assessment', 'Engineers check your roof or land, consumption and grid connection.'], ['Proposal and design', 'Simulation, equipment schedule and financial model.'], ['Installation', 'A qualified team installs and commissions the system.'], ['Live and monitored', 'Certificate of compliance issued and monitoring switched on.']];
export default function ProcessSteps() {
  return (
    <section className="section section--mist"><div className="container">
      <div className="section__head"><h2>From enquiry to first kilowatt-hour</h2></div>
      <ol className="steps">{steps.map(([t, d]) => (<li key={t}><h3>{t}</h3><p>{d}</p></li>))}</ol>
    </div></section>
  );
}
