const stats = [['170+', 'countries and regions served', 'Hanchu group'], ['5.7 GWh', 'storage delivered in 2025', 'Hanchu group'], ['Tier 1', 'BNEF energy storage list, Q2 2026', 'Hanchu group'], ['150+', 'solar projects completed', 'SFSC']];
export default function StatsBar() {
  return (
    <section className="section"><div className="container">
      <div className="section__head"><h2>Global manufacturing. Local engineering.</h2><p className="lead">Hanchu builds the equipment. SFSC designs and installs the systems.</p></div>
      <div className="stats">{stats.map(([n, l, s]) => (<div className="stat" key={l}><b>{n}</b><span>{l}</span><i>{s}</i></div>))}</div>
    </div></section>
  );
}
