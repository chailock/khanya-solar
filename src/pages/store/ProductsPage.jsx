import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/products/ProductCard';
import ProductFilters from '../../components/products/ProductFilters';
import { demoProducts } from '../../data/demoProducts';
import { filterProducts, sortProducts } from '../../features/products/productUtils';
const blank = { q: '', application: '', phase: '', availability: '' };
export default function ProductsPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || '';
  const [f, setF] = useState(blank);
  const [sort, setSort] = useState('featured');
  const [open, setOpen] = useState(false);
  const set = (k, v) => (k === 'category' ? setParams(v ? { category: v } : {}) : setF((p) => ({ ...p, [k]: v })));
  const list = useMemo(() => sortProducts(filterProducts(demoProducts, { ...f, category }), sort), [f, category, sort]);
  return (
    <>
      <div className="page-head"><div className="container"><h1>Solar and storage equipment</h1><p>Hanchu inverters, batteries and storage. Specifications come from Hanchu documentation; prices are confirmed on request.</p></div></div>
      <section className="section" style={{ paddingTop: 40 }}><div className="container shop">
        <ProductFilters f={f} category={category} set={set} open={open} reset={() => { setF(blank); setParams({}); }} />
        <div>
          <div className="toolbar">
            <input type="search" placeholder="Search by name or model" aria-label="Search products" value={f.q} onChange={(e) => set('q', e.target.value)} />
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value)}><option value="featured">Featured</option><option value="name">Name A to Z</option><option value="availability">Availability</option></select>
            <button type="button" className="btn btn--line btn--sm filters__btn" onClick={() => setOpen(!open)}>{open ? 'Hide filters' : 'Filters'}</button>
          </div>
          <p className="count">{list.length} {list.length === 1 ? 'product' : 'products'}</p>
          {list.length ? <div className="grid">{list.map((p) => <ProductCard key={p.slug} p={p} />)}</div> : (
            <div className="empty"><h3>{category === 'pv-modules' ? 'PV modules are coming soon' : 'No products match these filters'}</h3>
              <p>{category === 'pv-modules' ? 'They will be listed once Hanchu confirms the range.' : 'Try removing a filter or searching a different term.'}</p></div>)}
        </div>
      </div></section>
    </>
  );
}
