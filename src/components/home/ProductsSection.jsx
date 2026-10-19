import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import Button from '../common/Button';
import { demoProducts } from '../../data/demoProducts';
import { categories } from '../../data/categories';
export default function ProductsSection() {
  return (
    <section className="section" id="products"><div className="container">
      <div className="section__head"><h2>Hanchu solar and storage equipment</h2>
        <p className="lead">Inverters, batteries and storage systems with manufacturer specifications. Prices and stock are confirmed when you request a quote.</p></div>
      <div className="chips" aria-label="Categories">{categories.map((c) => (
        <Link key={c.slug} to={`/products?category=${c.slug}`}>{c.name}{!demoProducts.some((p) => p.category === c.slug) && <em className="soontag">Coming soon</em>}</Link>))}</div>
      <div className="grid">{demoProducts.slice(0, 3).map((p) => <ProductCard key={p.slug} p={p} />)}</div>
      <p style={{ marginTop: 28 }}><Button to="/products" variant="line">View all products</Button></p>
    </div></section>
  );
}
