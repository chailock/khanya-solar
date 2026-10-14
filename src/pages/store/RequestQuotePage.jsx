import QuoteForm from '../../components/forms/QuoteForm';
export default function RequestQuotePage() {
  return (<><div className="page-head"><div className="container"><h1>Request a quotation</h1><p>Choose your equipment and tell us where it is going. You will receive a reference number straight away.</p></div></div>
    <section className="section" style={{ paddingTop: 40 }}><div className="container narrow"><QuoteForm mode="quote" /></div></section></>);
}
