import { useState } from 'react';
import { siteConfig } from '../../data/siteConfig';
import { COLLECTION_NAMES, db } from '../../mocks/db';
import { seedSampleRecords } from '../../mocks/seed';
import { resetProducts } from '../../features/products/productStore';
export default function SettingsPage() {
  const [msg, setMsg] = useState('');
  const c = siteConfig.contact;
  const run = (fn, text, ask) => { if (!ask || window.confirm(ask)) { fn(); setMsg(text); } };
  return (
    <>
      <h1>Settings</h1>
      <div className="panel"><h2>Brand and contact</h2>
        <dl className="dl dl--left"><dt>Brand</dt><dd>{siteConfig.brand.name}</dd><dt>Supplier</dt><dd>{siteConfig.supplier.name} ({siteConfig.supplier.note})</dd><dt>Engineering and EPC</dt><dd>{siteConfig.engineering.name}</dd>
          <dt>Email</dt><dd>{c.email}</dd><dt>Phone</dt><dd>{c.phone}</dd><dt>Reference prefix</dt><dd>{siteConfig.refPrefix}</dd></dl>
        <p className="note">These come from <code>src/data/siteConfig.js</code>. Edit that file to rebrand the site.</p></div>
      <div className="panel" style={{ marginTop: 20 }}><h2>Sample records</h2>
        <p className="note" style={{ marginTop: 0 }}>Records are stored in this browser only. Sample records use fictional customers and are useful for trying the admin screens.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          <button type="button" className="btn btn--primary btn--sm" onClick={() => run(() => { seedSampleRecords(); }, 'Added 10 sample records with fictional customers.')}>Load sample records</button>
          <button type="button" className="btn btn--line btn--sm" onClick={() => run(() => COLLECTION_NAMES.forEach((n) => db.clear(n)), 'All records cleared.', 'Delete all orders, quotations, enquiries, leads and messages in this browser?')}>Clear all records</button>
          <button type="button" className="btn btn--line btn--sm" onClick={() => run(resetProducts, 'Catalogue reset to the Hanchu Energy SA price list.', 'Discard all product edits and restore the Hanchu Energy SA price list?')}>Reset catalogue</button>
        </div>
        {msg && <p className="saved" role="status" style={{ marginTop: 14 }}>{msg}</p>}</div>
      <div className="panel" style={{ marginTop: 20 }}><h2>Security notes</h2>
        <ul className="mini"><li>Until the server connection is switched on, sign-in is checked in this browser. Production uses server-side authentication, hashed passwords, role checks and audit logging.</li><li>No payment card details are collected or stored anywhere in the system.</li><li>Clear the sample records before real customers use the site.</li></ul></div>
    </>
  );
}
