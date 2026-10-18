import StatusBadge from './StatusBadge';
export default function StatusHistory({ history }) {
  return (
    <ol className="history">{[...history].reverse().map((h, i) => (
      <li key={`${h.at}-${i}`}><StatusBadge status={h.status} /><span>{new Date(h.at).toLocaleString('en-ZA')} · {h.by === 'admin' ? 'Administrator' : 'Customer'}</span>{h.note && <em>{h.note}</em>}</li>))}</ol>
  );
}
