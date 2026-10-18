export default function DataTable({ columns, rows, empty = 'Nothing here yet.' }) {
  if (!rows.length) return <div className="empty"><p style={{ margin: 0 }}>{empty}</p></div>;
  return (
    <div className="tablewrap"><table className="dtable">
      <thead><tr>{columns.map((c) => <th key={c.label} scope="col">{c.label}</th>)}</tr></thead>
      <tbody>{rows.map((r, i) => (<tr key={r.ref || r.slug || i}>{columns.map((c) => <td key={c.label}>{c.render(r)}</td>)}</tr>))}</tbody>
    </table></div>
  );
}
