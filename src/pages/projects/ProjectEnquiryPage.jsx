import ProjectEnquiryForm from '../../components/projects/ProjectEnquiryForm';
export default function ProjectEnquiryPage() {
  return (<><div className="page-head"><div className="container"><h1>Submit a project</h1><p>Tell us about your agricultural, commercial, storage or utility-scale project. It is routed to SFSC for qualification.</p></div></div>
    <section className="section" style={{ paddingTop: 40 }}><div className="container narrow"><ProjectEnquiryForm /></div></section></>);
}
