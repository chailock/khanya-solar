import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// Cards and headings ease in once as they scroll into view, then the effect is removed so hover styles work normally.
const SELECTOR = '.pcard,.proj,.svc,.enq__card,.steps li,.stat,.section__head,.cta';
export default function useScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      el.classList.add('is-in');
      setTimeout(() => { el.classList.remove('reveal', 'is-in'); el.style.transitionDelay = ''; }, 1500);
    }), { threshold: 0.12 });
    document.querySelectorAll(SELECTOR).forEach((el) => {
      const i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.transitionDelay = `${Math.min(i, 5) * 90}ms`;
      el.classList.add('reveal');
      io.observe(el);
    });
    // Safety net: if anything has not revealed after 6 s, show it so content can never stay hidden.
    const safety = setTimeout(() => document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => { el.classList.remove('reveal'); el.style.transitionDelay = ''; }), 6000);
    return () => { clearTimeout(safety); io.disconnect(); };
  }, [pathname]);
}
