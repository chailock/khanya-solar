import { Link, useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import ImageSlot from '../../components/common/ImageSlot';
import Button from '../../components/common/Button';
import AvailabilityBadge from '../../components/products/AvailabilityBadge';
import CompareToggle from '../../components/products/CompareToggle';
import SpecificationTable from '../../components/products/SpecificationTable';
import ProductCard from '../../components/products/ProductCard';
import { demoProducts, applications, phases } from '../../data/demoProducts';
import { categories } from '../../data/categories';
import { getProduct } from '../../features/products/productUtils';
import { useCart } from '../../features/cart/CartContext';
import { formatCurrency } from '../../utils/formatCurrency';
export default function ProductDetailPage() {
  const { slug } = useParams();
  const { add } = useCart();
  const p = getProduct(slug);
  if (!p) return (<div className="page-head"><div className="container"><h1>Product not found</h1><p><Link to="/products">Back to all products</Link></p></div></div>);
  const cat = categories.find((c) => c.slug === p.category);
  const related = demoProducts.filter((x) => x.slug !== p.slug && x.category === p.category).concat(demoProducts.filter((x) => x.slug !== p.slug && x.category !== p.category)).slice(0, 3);
  return (
    <section className="section" style={{ paddingTop: 32 }}><div className="container">
      <Breadcrumbs items={[['Shop', '/products'], [cat.name, `/products?category=${p.category}`], [p.model]]} />
      <div className="detail">
        <ImageSlot src={p.image} alt={`${p.manufacturer} ${p.model}`} label={p.model} ratio="4 / 3" fit="contain" />
        <div>
          <span className="pcard__mfr">{p.manufacturer} · {p.model}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,3.6vw,2.6rem)' }}>{p.name}</h1>
          <p className="tags">{[applications[p.application], phases[p.phase]].filter(Boolean).map((t) => <span className="badge" key={t}>{t}</span>)}<AvailabilityBadge status={p.availability} /></p>
          <p className="price" style={{ fontSize: '1.4rem' }}>{formatCurrency(p.price)}</p>
          <ul className="specs" style={{ margin: '16px 0 24px' }}>{p.specs.map((s) => <li key={s}>{s}</li>)}</ul>
          <div className="pcard__actions">
            <button type="button" className="btn btn--primary" onClick={() => add(p.slug)}>Add to cart</button>
            <Button to={`/request-quote?product=${p.slug}`} variant="line">Request a quote</Button>
            {p.datasheet ? <a className="btn btn--line" href={p.datasheet} download>Download datasheet</a> : <button type="button" className="btn btn--line" disabled>Datasheet coming soon</button>}
          </div>
          <p style={{ marginTop: 14 }}><CompareToggle slug={p.slug} /></p>
          <p className="note">Prices are demonstration values. VAT and delivery terms will be shown once the commercial policy is confirmed.</p>
        </div>
      </div>
      {p.highlights.length > 0 && (<><h2 style={{ marginTop: 56 }}>Highlights</h2><ul className="specs" style={{ fontSize: '1.02rem' }}>{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul></>)}
      <h2 style={{ marginTop: 48 }}>Specifications</h2>
      <SpecificationTable rows={p.table} />
      <p className="note">Source: Hanchu ESS brochure 2026. Confirm against the current manufacturer datasheet before ordering.</p>
      <h2 style={{ marginTop: 56 }}>You may also like</h2>
      <div className="grid">{related.map((r) => <ProductCard key={r.slug} p={r} />)}</div>
    </div></section>
  );
}
