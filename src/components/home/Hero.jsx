import { useEffect, useState } from 'react';
import Button from '../common/Button';
import { siteConfig } from '../../data/siteConfig';
const panels = [0, 1, 2].flatMap((r) => Array.from({ length: 11 }, (_, c) => ({ x: 560 + c * 76 + r * 26, y: 428 + r * 30, c })));
const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
const clouds = [[70, '90s', '-20s'], [135, '130s', '-85s'], [40, '110s', '-60s']];
const glints = Array.from({ length: 10 }, (_, i) => ({ '--x': `${(i * 9 + 4) % 100}%`, '--s': `${10 + (i % 3) * 8}px`, '--d': `${7 + (i % 4) * 2}s`, '--w': `-${(i * 1.3).toFixed(1)}s` }));
export default function Hero() {
  const [photo, setPhoto] = useState(null);
  // Use the first hero image that actually loads; otherwise fall back to the illustrated scene.
  useEffect(() => {
    let alive = true;
    const urls = siteConfig.heroImages || [];
    const tryAt = (i) => {
      if (!alive || i >= urls.length) return;
      const img = new Image();
      img.onload = () => alive && setPhoto(urls[i]);
      img.onerror = () => tryAt(i + 1);
      img.src = urls[i];
    };
    tryAt(0);
    return () => { alive = false; };
  }, []);
  return (
    <section className={`hero${photo ? ' hero--photo' : ''}`}>
      {photo ? (
        <>
          <div className="hero__photo" style={{ backgroundImage: `url(${photo})` }} />
          <div className="hero__sweep" aria-hidden="true">{glints.map((g, i) => <span key={i} className="glint" style={g} />)}</div>
        </>
      ) : (
        <svg className="hero__scene" viewBox="0 0 1440 520" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#FFD27A" stopOpacity=".95" /><stop offset="1" stopColor="#FFD27A" stopOpacity="0" /></radialGradient></defs>
          <g className="rays">{rays.map((a) => <line key={a} x1="1080" y1="150" x2="1080" y2="-170" stroke="#FFC857" strokeOpacity=".4" strokeWidth="3" strokeLinecap="round" transform={`rotate(${a} 1080 150)`} />)}</g>
          <g className="sun"><circle cx="1080" cy="150" r="250" fill="url(#g)" /><circle cx="1080" cy="150" r="46" fill="#FFB020" /></g>
          {clouds.map(([y, d, delay]) => (
            <g key={y} className="cloud" style={{ animationDuration: d, animationDelay: delay }} fill="#fff" fillOpacity=".85">
              <ellipse cx="0" cy={y} rx="60" ry="16" /><ellipse cx="34" cy={y - 12} rx="34" ry="16" /><ellipse cx="-30" cy={y - 8} rx="28" ry="12" />
            </g>))}
          <path d="M0 380C240 320 420 340 640 360S1100 310 1440 350V520H0Z" fill="#CDEBD9" />
          <path d="M0 440C300 390 560 430 820 420S1260 380 1440 410V520H0Z" fill="#A8DDBF" />
          {panels.map((p, i) => <polygon key={i} className="panel" style={{ animationDelay: `${p.c * 0.22}s` }} points={`${p.x},${p.y} ${p.x + 62},${p.y} ${p.x + 72},${p.y + 24} ${p.x + 10},${p.y + 24}`} fill="#0B5BD3" stroke="#CFE4FF" strokeWidth="1.5" />)}
        </svg>
      )}
      <div className="container">
        <div className="hero__inner">
          <h1>Solar equipment and engineering, from one South African source.</h1>
          <p>Browse inverters, batteries and storage from Hanchu, then take it further with a system designed and installed by qualified engineers.</p>
          <div className="hero__actions"><Button to="/products">Shop products</Button><Button to="/design-my-system" variant="line">Design my system</Button></div>
        </div>
        <div className="hero__chips" aria-hidden="true">
          <div className="chip"><b>5.7 GWh</b><span>Hanchu storage delivered in 2025</span></div>
          <div className="chip"><b>Engineer-led</b><span>Projects assessed by SFSC</span></div>
        </div>
      </div>
    </section>
  );
}
