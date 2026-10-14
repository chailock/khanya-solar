import { useEffect, useRef, useState } from 'react';
// Counts up once when scrolled into view. Shows the final value straight away if motion is reduced.
export default function CountUp({ to, decimals = 0, suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return undefined; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => { const p = Math.min((t - t0) / duration, 1); setV(to * (1 - (1 - p) ** 3)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <bdi ref={ref}>{v.toFixed(decimals)}{suffix}</bdi>;
}
