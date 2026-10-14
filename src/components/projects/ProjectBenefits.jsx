export default function ProjectBenefits({ title = 'What SFSC assesses', points }) {
  return (<section className="section"><div className="container"><div className="section__head"><h2>{title}</h2></div><ul className="specs" style={{ fontSize: '1.05rem', gap: 10 }}>{points.map((p) => <li key={p}>{p}</li>)}</ul></div></section>);
}
