// Quotes values, flattens line breaks and defuses spreadsheet formulas (values starting with = + - @).
const esc = (v) => {
  let s = String(v ?? '').replace(/\r?\n/g, '; ');
  if (/^[=+\-@\t]/.test(s)) s = `'${s}`;
  return /[",]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
export const toCsv = (rows, columns) => [columns.map((c) => esc(c[0])).join(','), ...rows.map((r) => columns.map((c) => esc(c[1](r))).join(','))].join('\r\n');
export function downloadCsv(filename, rows, columns) {
  const blob = new Blob([`\uFEFF${toCsv(rows, columns)}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
