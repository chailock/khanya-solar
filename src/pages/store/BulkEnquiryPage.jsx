import QuoteForm from '../../components/forms/QuoteForm';
export default function BulkEnquiryPage() {
  return (<><div className="page-head"><div className="container"><h1>Bulk and reseller enquiry</h1><p>For installers, resellers and larger orders. Tell us what you need and how often.</p></div></div>
    <section className="section" style={{ paddingTop: 40 }}><div className="container narrow"><QuoteForm mode="bulk" /></div></section></>);
}
