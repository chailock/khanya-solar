export default function FormProgress({ steps, step }) {
  return (
    <ol className="progress" aria-label="Progress">
      {steps.map((l, i) => (<li key={l} className={i < step ? 'done' : i === step ? 'cur' : ''} aria-current={i === step ? 'step' : undefined}><span>{i < step ? '✓' : i + 1}</span><em>{l}</em></li>))}
    </ol>
  );
}
