import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import { getProject } from '../../services/projectService';
import { projectTypes, CAPACITY, SITE_STATUS, GRID_STATUS, TIMELINE, projectLabel } from '../../data/projectTypes';
export default function ProjectConfirmationPage() {
  const { ref } = useParams();
  const [p, setP] = useState(undefined);
  useEffect(() => { getProject(ref).then(setP).catch(() => setP(null)); }, [ref]);
  if (p === undefined) return <div className="page-head"><div className="container"><h1>Loading…</h1></div></div>;
  if (!p) return (<div className="page-head"><div className="container"><h1>Project not found</h1><p><Link to="/commercial-projects">Back to projects</Link></p></div></div>);
  return (
    <section className="section"><div className="container confirm">
      <h1>Project received</h1>
      <p className="lead">Thank you, {p.contact.name.split(' ')[0]}. Your lead has been routed to SFSC for technical qualification.</p>
      <div className="ref"><span>Project reference</span><strong>{p.ref}</strong></div>
      <dl className="dl dl--left"><dt>Status</dt><dd>New, with SFSC</dd><dt>Type</dt><dd>{projectLabel(projectTypes.map((t) => [t.slug, t.name]), p.projectType)}</dd>
        <dt>Location</dt><dd>{p.location.place}, {p.location.province}</dd><dt>Capacity</dt><dd>{projectLabel(CAPACITY, p.capacity)}{p.capacityNote ? `, ${p.capacityNote}` : ''}</dd>
        <dt>Land or roof</dt><dd>{projectLabel(SITE_STATUS, p.siteStatus)}</dd><dt>Grid</dt><dd>{projectLabel(GRID_STATUS, p.gridStatus)}</dd><dt>Timeline</dt><dd>{projectLabel(TIMELINE, p.timeline)}</dd>
        <dt>Contact</dt><dd>{p.contact.name}, {p.contact.company}<br />{p.contact.email}, {p.contact.phone}</dd></dl>
      <p className="note">Next: SFSC reviews the lead and contacts you. Pricing, feasibility and delivery commitments are subject to separate assessment.</p>
      <p><Button to="/products" variant="line">Browse equipment</Button></p>
    </div></section>
  );
}
