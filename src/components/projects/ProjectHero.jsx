import Button from '../common/Button';
export default function ProjectHero({ title, intro, cta = true, type }) {
  return (<div className="page-head"><div className="container"><h1>{title}</h1><p>{intro}</p>
    {cta && <p style={{ marginTop: 20 }}><Button to={`/project-enquiry${type ? `?type=${type}` : ''}`}>Submit a project</Button></p>}</div></div>);
}
