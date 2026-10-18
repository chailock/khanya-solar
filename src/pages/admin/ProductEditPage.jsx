import { Link, useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/ProductForm';
import { demoProducts } from '../../data/demoProducts';
export default function ProductEditPage() {
  const { slug } = useParams();
  const p = slug ? demoProducts.find((x) => x.slug === slug) : null;
  if (slug && !p) return <><h1>Product not found</h1><p><Link to="/admin/products">Back to products</Link></p></>;
  return (<><p className="crumbs"><Link to="/admin/products">Products</Link> / {p ? p.model : 'New product'}</p><h1>{p ? `Edit ${p.model}` : 'Add product'}</h1><div className="narrow" style={{ maxWidth: 860 }}><ProductForm key={slug || 'new'} product={p} /></div></>);
}
