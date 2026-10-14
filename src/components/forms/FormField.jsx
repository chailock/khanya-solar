export default function FormField({ id, label, error, hint, optional, children }) {
  return (
    <div className={`field${error ? ' field--err' : ''}`}>
      <label htmlFor={id}>{label}{optional && <span> (optional)</span>}</label>
      {children}
      {hint && !error && <small>{hint}</small>}
      {error && <small className="err" role="alert">{error}</small>}
    </div>
  );
}
