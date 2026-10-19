import { useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from '../../components/admin/DataTable';
import { demoProducts, availabilityLabels } from '../../data/demoProducts';
import { categories } from '../../data/categories';
import { saveProductRecord } from '../../services/productService';
import { formatCurrency } from '../../utils/formatCurrency';
import { productImage } from '../../features/products/productUtils';
export default function ProductsAdminPage() {
  const [, tick] = useState(0);
  const setStock = async (p, v) => { await saveProductRecord({ ...p, availability: v }, p.slug); tick((n) => n + 1); };
  const cols = [
    { label: 'Product', render: (p) => (<div className="prodcell">{productImage(p) ? <img src={productImage(p)} alt="" /> : <span aria-hidden="true" />}<div><Link to={`/admin/products/edit/${p.slug}`}><strong>{p.model}</strong></Link><br /><small>{p.name}</small></div></div>) },
    { label: 'Category', render: (p) => categories.find((c) => c.slug === p.category)?.name || p.category },
    { label: 'Price', render: (p) => formatCurrency(p.price) },
    { label: 'Availability', render: (p) => (<select className="inline-select" aria-label={`Availability for ${p.model}`} value={p.availability} onChange={(e) => setStock(p, e.target.value)}>{Object.entries(availabilityLabels).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>) },
    { label: '', render: (p) => (<><Link to={`/admin/products/edit/${p.slug}`}>Edit</Link> · <Link to={`/products/${p.slug}`}>View</Link></>) },
  ];
  return (
    <>
      <div className="adm__head"><h1>Products</h1><Link to="/admin/products/new" className="btn btn--primary btn--sm">Add product</Link></div>
      <p className="note">Prices are demonstration values until Hanchu confirms pricing, VAT and stock. Changes appear on the storefront straight away.</p>
      <DataTable columns={cols} rows={[...demoProducts]} empty="No products. Add one to get started." />
    </>
  );
}
