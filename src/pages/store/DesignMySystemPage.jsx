import SystemWizard from '../../components/system/SystemWizard';
import PreliminaryNotice from '../../components/system/PreliminaryNotice';
export default function DesignMySystemPage() {
  return (<><div className="page-head"><div className="container"><h1>Design my system</h1><p>Five short steps. You will get a preliminary summary and a recommended next step.</p></div></div>
    <section className="section" style={{ paddingTop: 40 }}><div className="container narrow"><PreliminaryNotice /><div style={{ height: 20 }} /><SystemWizard /></div></section></>);
}
