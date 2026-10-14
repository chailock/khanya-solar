import CountUp from '../common/CountUp';
const stats = [
  { to: 170, suffix: '+', label: 'countries and regions served', src: 'Hanchu group' },
  { to: 5.7, decimals: 1, suffix: ' GWh', label: 'storage delivered in 2025', src: 'Hanchu group' },
  { text: 'Tier 1', label: 'BNEF energy storage list, Q2 2026', src: 'Hanchu group' },
  { to: 150, suffix: '+', label: 'solar projects completed', src: 'SFSC' },
];
export default function StatsBar() {
  return (
    <section className="section"><div className="container">
      <div className="section__head"><h2>Global manufacturing. Local engineering.</h2><p className="lead">Hanchu builds the equipment. SFSC designs and installs the systems.</p></div>
      <div className="stats">{stats.map((s) => (
        <div className="stat" key={s.label}><b>{s.text || <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />}</b><span>{s.label}</span><i>{s.src}</i></div>))}
      </div>
    </div></section>
  );
}
