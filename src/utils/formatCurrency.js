export const formatCurrency = (v) => v == null ? 'Price on request'
  : new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 }).format(v);
