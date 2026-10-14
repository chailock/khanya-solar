export default function SpecificationTable({ rows }) {
  return (<div className="tablewrap"><table className="spec-table"><tbody>{rows.map(([k, v]) => (<tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>))}</tbody></table></div>);
}
