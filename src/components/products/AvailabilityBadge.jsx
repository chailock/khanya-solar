import { availabilityLabels } from '../../data/demoProducts';
export default function AvailabilityBadge({ status }) {
  const mod = status === 'stock' ? ' badge--stock' : status === 'soon' ? ' badge--soon' : '';
  return <span className={`badge${mod}`}>{availabilityLabels[status]}</span>;
}
