// Pairs photos with cards without needing exact file names. Order of precedence:
// 1) an explicit image set on the item, 2) a file whose name contains one of the item's keywords, 3) any unused file in alphabetical order.
const name = (f) => f.split('/').pop().toLowerCase();
export function matchImages(items, files) {
  const used = new Set(items.map((i) => i.image).filter(Boolean));
  const out = items.map((it) => it.image || null);
  items.forEach((it, i) => {
    if (out[i]) return;
    const hit = files.find((f) => !used.has(f) && (it.keywords || []).some((k) => name(f).includes(k)));
    if (hit) { used.add(hit); out[i] = hit; }
  });
  const left = files.filter((f) => !used.has(f)).sort();
  return out.map((p) => p || left.shift() || null);
}
