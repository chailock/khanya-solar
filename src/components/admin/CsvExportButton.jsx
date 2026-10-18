import { downloadCsv } from '../../utils/csv';
export default function CsvExportButton({ filename, rows, columns, label = 'Export CSV' }) {
  return <button type="button" className="btn btn--line btn--sm" disabled={!rows.length} onClick={() => downloadCsv(filename, rows, columns)}>{label}</button>;
}
