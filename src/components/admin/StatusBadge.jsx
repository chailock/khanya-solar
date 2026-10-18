import { statusLabel } from '../../features/admin/collections';
const tone = (s) => (['new', 'received'].includes(s) ? 'blue' : ['completed', 'quoted', 'replied'].includes(s) ? 'green' : ['closed', 'cancelled'].includes(s) ? 'grey' : 'amber');
export default function StatusBadge({ status }) { return <span className={`sbadge sbadge--${tone(status)}`}>{statusLabel(status)}</span>; }
